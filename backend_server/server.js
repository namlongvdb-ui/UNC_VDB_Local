/**
 * UNC-VDB Backend Server
 * Node.js + Express + PostgreSQL
 * Chạy trên: 10.24.16.77:3003
 */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3003;
const HOST = process.env.HOST || "0.0.0.0";
const JWT_SECRET = process.env.JWT_SECRET || "unc_vdb_secret";

// ============ DATABASE ============
const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
});

// ============ MIDDLEWARE ============
const allowedSubnets = (process.env.ALLOWED_SUBNETS || "").split(",").map(s => s.trim());

function ipInSubnet(ip, cidr) {
  const [subnet, bits] = cidr.split("/");
  const mask = ~(2 ** (32 - parseInt(bits)) - 1);
  const ipNum = ip.split(".").reduce((acc, octet) => (acc << 8) + parseInt(octet), 0);
  const subnetNum = subnet.split(".").reduce((acc, octet) => (acc << 8) + parseInt(octet), 0);
  return (ipNum & mask) === (subnetNum & mask);
}

function getClientIP(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.connection.remoteAddress?.replace("::ffff:", "") || req.ip;
}

// Kiểm tra IP được phép
function ipFilter(req, res, next) {
  const clientIP = getClientIP(req);
  // Cho phép localhost khi dev
  if (clientIP === "127.0.0.1" || clientIP === "::1") return next();
  
  const allowed = allowedSubnets.some(cidr => {
    try { return ipInSubnet(clientIP, cidr); } catch { return false; }
  });
  
  if (!allowed) {
    console.log(`⛔ Từ chối truy cập từ IP: ${clientIP}`);
    return res.status(403).json({ error: "Địa chỉ IP không được phép truy cập" });
  }
  next();
}

// Xác thực JWT
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Chưa đăng nhập" });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Phiên đăng nhập hết hạn" });
  }
}

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(ipFilter);

// Phục vụ frontend (build React)
app.use(express.static(path.join(__dirname, "public")));

// ============ AUTH ROUTES ============

// Tự động chuyển username thành email
function usernameToEmail(username) {
  if (username.includes("@")) return username;
  return `${username}@vdb.local`;
}

// Đăng nhập
app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Vui lòng nhập tên đăng nhập và mật khẩu" });
    }

    const email = usernameToEmail(username);
    const result = await pool.query(
      "SELECT * FROM users WHERE (username = $1 OR email = $2) AND is_active = TRUE",
      [username, email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Tên đăng nhập hoặc mật khẩu không đúng" });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: "Tên đăng nhập hoặc mật khẩu không đúng" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email, branch_id: user.branch_id },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    // Lấy thông tin chi nhánh
    let branch = null;
    if (user.branch_id) {
      const brRes = await pool.query("SELECT * FROM branches WHERE id = $1", [user.branch_id]);
      branch = brRes.rows[0] || null;
    }

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.full_name,
        branch,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
});

// Đăng ký (chỉ admin)
app.post("/api/auth/register", authMiddleware, async (req, res) => {
  try {
    const { username, password, fullName, branchCode } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Thiếu thông tin bắt buộc" });
    }

    const email = usernameToEmail(username);
    const hash = await bcrypt.hash(password, 10);

    let branchId = null;
    if (branchCode) {
      const br = await pool.query("SELECT id FROM branches WHERE code = $1", [branchCode]);
      branchId = br.rows[0]?.id || null;
    }

    await pool.query(
      `INSERT INTO users (username, email, password_hash, full_name, branch_id)
       VALUES ($1, $2, $3, $4, $5)`,
      [username, email, hash, fullName || username, branchId]
    );

    res.json({ message: "Tạo tài khoản thành công" });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "Tên đăng nhập đã tồn tại" });
    }
    console.error("Register error:", err);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
});

// Thông tin user hiện tại
app.get("/api/auth/me", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT u.id, u.username, u.email, u.full_name, u.branch_id, b.code as branch_code, b.name as branch_name
       FROM users u LEFT JOIN branches b ON u.branch_id = b.id
       WHERE u.id = $1`,
      [req.user.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Không tìm thấy" });
    
    const u = result.rows[0];
    res.json({
      id: u.id,
      username: u.username,
      email: u.email,
      fullName: u.full_name,
      branch: u.branch_id ? { id: u.branch_id, code: u.branch_code, name: u.branch_name } : null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
});

// Đổi mật khẩu
app.post("/api/auth/change-password", authMiddleware, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const result = await pool.query("SELECT password_hash FROM users WHERE id = $1", [req.user.id]);
    const valid = await bcrypt.compare(oldPassword, result.rows[0].password_hash);
    if (!valid) return res.status(400).json({ error: "Mật khẩu cũ không đúng" });

    const hash = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2", [hash, req.user.id]);
    res.json({ message: "Đổi mật khẩu thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
});

// ============ UNC ROUTES ============

// Lấy danh sách UNC
app.get("/api/unc", authMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 50, template = "" } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    
    let query = "SELECT * FROM unc_records WHERE user_id = $1";
    const params = [req.user.id];
    
    if (template) {
      query += " AND template_type = $2";
      params.push(template);
    }
    
    query += " ORDER BY created_at DESC LIMIT $" + (params.length + 1) + " OFFSET $" + (params.length + 2);
    params.push(parseInt(limit), offset);
    
    const result = await pool.query(query, params);
    
    // Đếm tổng
    let countQuery = "SELECT COUNT(*) FROM unc_records WHERE user_id = $1";
    const countParams = [req.user.id];
    if (template) {
      countQuery += " AND template_type = $2";
      countParams.push(template);
    }
    const countRes = await pool.query(countQuery, countParams);
    
    res.json({
      data: result.rows.map(rowToUNCData),
      total: parseInt(countRes.rows[0].count),
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
});

// Lưu UNC
app.post("/api/unc", authMiddleware, async (req, res) => {
  try {
    const d = req.body;
    const result = await pool.query(
      `INSERT INTO unc_records 
       (user_id, template_type, so_unc, ngay, thang, nam, don_vi_tra_tien, so_tai_khoan_tra, 
        tai_nhpt, don_vi_nhan_tien, so_tai_khoan_nhan, tai_nhkb, tinh_tp, 
        so_tien_bang_chu, noi_dung_thanh_toan, so_tien_bang_so)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
       RETURNING *`,
      [
        req.user.id, d.templateType || "42b",
        d.soUNC, d.ngay, d.thang, d.nam,
        d.donViTraTien, d.soTaiKhoanTra, d.taiNHPT,
        d.donViNhanTien, d.soTaiKhoanNhan, d.taiNHKB, d.tinhTP,
        d.soTienBangChu, d.noiDungThanhToan, d.soTienBangSo,
      ]
    );
    res.json(rowToUNCData(result.rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
});

// Xóa UNC
app.delete("/api/unc/:id", authMiddleware, async (req, res) => {
  try {
    await pool.query("DELETE FROM unc_records WHERE id = $1 AND user_id = $2", [req.params.id, req.user.id]);
    res.json({ message: "Đã xóa" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
});

// ============ BENEFICIARY ROUTES ============

app.get("/api/beneficiaries", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM beneficiaries WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user.id]
    );
    res.json(result.rows.map(r => ({
      id: r.id,
      name: r.name,
      donViNhanTien: r.don_vi_nhan_tien,
      soTaiKhoanNhan: r.so_tai_khoan_nhan,
      taiNHKB: r.tai_nhkb,
      tinhTP: r.tinh_tp,
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
});

app.post("/api/beneficiaries", authMiddleware, async (req, res) => {
  try {
    const { name, donViNhanTien, soTaiKhoanNhan, taiNHKB, tinhTP } = req.body;
    const result = await pool.query(
      `INSERT INTO beneficiaries (user_id, name, don_vi_nhan_tien, so_tai_khoan_nhan, tai_nhkb, tinh_tp)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [req.user.id, name, donViNhanTien, soTaiKhoanNhan, taiNHKB, tinhTP]
    );
    const r = result.rows[0];
    res.json({ id: r.id, name: r.name, donViNhanTien: r.don_vi_nhan_tien, soTaiKhoanNhan: r.so_tai_khoan_nhan, taiNHKB: r.tai_nhkb, tinhTP: r.tinh_tp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
});

app.delete("/api/beneficiaries/:id", authMiddleware, async (req, res) => {
  try {
    await pool.query("DELETE FROM beneficiaries WHERE id = $1 AND user_id = $2", [req.params.id, req.user.id]);
    res.json({ message: "Đã xóa" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
});

// ============ BRANCH ROUTES ============

app.get("/api/branches", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM branches ORDER BY name");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
});

// ============ HELPER ============

function rowToUNCData(row) {
  return {
    id: row.id,
    templateType: row.template_type,
    soUNC: row.so_unc || "",
    ngay: row.ngay || "",
    thang: row.thang || "",
    nam: row.nam || "",
    donViTraTien: row.don_vi_tra_tien || "",
    soTaiKhoanTra: row.so_tai_khoan_tra || "",
    taiNHPT: row.tai_nhpt || "",
    donViNhanTien: row.don_vi_nhan_tien || "",
    soTaiKhoanNhan: row.so_tai_khoan_nhan || "",
    taiNHKB: row.tai_nhkb || "",
    tinhTP: row.tinh_tp || "",
    soTienBangChu: row.so_tien_bang_chu || "",
    noiDungThanhToan: row.noi_dung_thanh_toan || "",
    soTienBangSo: row.so_tien_bang_so || "",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// ============ SPA FALLBACK ============
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "API không tồn tại" });
  }
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ============ START ============
app.listen(PORT, HOST, () => {
  console.log(`
╔══════════════════════════════════════════════╗
║     UNC-VDB Server đã khởi động!            ║
║     Địa chỉ: http://${HOST}:${PORT}         ║
║     Database: ${process.env.DB_NAME}                    ║
╠══════════════════════════════════════════════╣
║  Chi nhánh được phép:                        ║
║  • Cao Bằng:  10.24.x.x                     ║
║  • Bắc Giang: 10.42.x.x                     ║
║  • Lạng Sơn:  10.30.x.x                     ║
║  • Bắc Ninh:  10.44.x.x                     ║
╚══════════════════════════════════════════════╝
  `);
});
