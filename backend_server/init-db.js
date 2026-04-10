/**
 * Khởi tạo database unc_vdb
 * Chạy: node init-db.js
 */
require("dotenv").config();
const { Client } = require("pg");

const SCHEMA_SQL = `
-- Bảng chi nhánh
CREATE TABLE IF NOT EXISTS branches (
  id SERIAL PRIMARY KEY,
  code VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  ip_range VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Bảng người dùng
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  password_hash VARCHAR(200) NOT NULL,
  full_name VARCHAR(200),
  branch_id INTEGER REFERENCES branches(id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Bảng ủy nhiệm chi
CREATE TABLE IF NOT EXISTS unc_records (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  template_type VARCHAR(10) NOT NULL DEFAULT '42b',
  so_unc VARCHAR(50),
  ngay VARCHAR(2),
  thang VARCHAR(2),
  nam VARCHAR(4),
  don_vi_tra_tien TEXT,
  so_tai_khoan_tra VARCHAR(100),
  tai_nhpt TEXT,
  don_vi_nhan_tien TEXT,
  so_tai_khoan_nhan VARCHAR(100),
  tai_nhkb TEXT,
  tinh_tp VARCHAR(100),
  so_tien_bang_chu TEXT,
  noi_dung_thanh_toan TEXT,
  so_tien_bang_so VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Bảng đơn vị hưởng đã lưu
CREATE TABLE IF NOT EXISTS beneficiaries (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(200),
  don_vi_nhan_tien TEXT,
  so_tai_khoan_nhan VARCHAR(100),
  tai_nhkb TEXT,
  tinh_tp VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_unc_user ON unc_records(user_id);
CREATE INDEX IF NOT EXISTS idx_unc_created ON unc_records(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_beneficiaries_user ON beneficiaries(user_id);

-- Dữ liệu mặc định: chi nhánh
INSERT INTO branches (code, name, ip_range) VALUES
  ('CB', 'PGD Cao Bằng', '10.24.0.0/16'),
  ('BG', 'PGD Bắc Giang', '10.42.0.0/16'),
  ('LS', 'PGD Lạng Sơn', '10.30.0.0/16'),
  ('BN', 'PGD Bắc Ninh', '10.44.0.0/16')
ON CONFLICT (code) DO NOTHING;

-- Tài khoản admin mặc định (password: admin123)
-- Hash sẽ được tạo bởi script
`;

async function initDB() {
  // Kết nối tới postgres mặc định để tạo database
  const adminClient = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "postgres",
  });

  try {
    await adminClient.connect();
    // Kiểm tra database tồn tại chưa
    const res = await adminClient.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [process.env.DB_NAME]
    );
    if (res.rowCount === 0) {
      await adminClient.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log(`✅ Đã tạo database: ${process.env.DB_NAME}`);
    } else {
      console.log(`ℹ️  Database ${process.env.DB_NAME} đã tồn tại`);
    }
    await adminClient.end();
  } catch (err) {
    console.error("❌ Lỗi tạo database:", err.message);
    await adminClient.end();
    process.exit(1);
  }

  // Kết nối tới database mới để tạo bảng
  const dbClient = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    await dbClient.connect();
    await dbClient.query(SCHEMA_SQL);
    console.log("✅ Đã tạo các bảng thành công");

    // Tạo tài khoản admin
    const bcrypt = require("bcryptjs");
    const hash = await bcrypt.hash("admin123", 10);
    await dbClient.query(
      `INSERT INTO users (username, email, password_hash, full_name, branch_id)
       VALUES ('admin', 'admin@vdb.local', $1, 'Quản trị viên', 1)
       ON CONFLICT (username) DO NOTHING`,
      [hash]
    );
    console.log("✅ Tài khoản admin đã sẵn sàng (admin / admin123)");

    await dbClient.end();
    console.log("\n🚀 Khởi tạo database hoàn tất!");
  } catch (err) {
    console.error("❌ Lỗi tạo bảng:", err.message);
    await dbClient.end();
    process.exit(1);
  }
}

initDB();
