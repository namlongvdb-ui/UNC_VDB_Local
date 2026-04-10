# HƯỚNG DẪN CÀI ĐẶT UNC-VDB TRÊN WINDOWS

## Yêu cầu hệ thống
- Windows 10/11 hoặc Windows Server 2019+
- Node.js 18+ (tải tại https://nodejs.org)
- PostgreSQL 16 (tải tại https://www.postgresql.org/download/windows/)

---

## Bước 1: Cài đặt PostgreSQL 16

1. Tải và cài đặt PostgreSQL 16 cho Windows
2. Trong quá trình cài đặt:
   - **Port**: 5432
   - **Username**: postgres
   - **Password**: longvdb
3. Đảm bảo PostgreSQL service đã chạy

### Cấu hình PostgreSQL cho phép kết nối từ xa

Sửa file `C:\Program Files\PostgreSQL\16\data\postgresql.conf`:
```
listen_addresses = '*'
```

Sửa file `C:\Program Files\PostgreSQL\16\data\pg_hba.conf`, thêm các dòng:
```
# Chi nhánh Cao Bằng
host    unc_vdb    postgres    10.24.0.0/16    md5
# Chi nhánh Bắc Giang
host    unc_vdb    postgres    10.42.0.0/16    md5
# Chi nhánh Lạng Sơn
host    unc_vdb    postgres    10.30.0.0/16    md5
# Chi nhánh Bắc Ninh
host    unc_vdb    postgres    10.44.0.0/16    md5
```

Khởi động lại PostgreSQL service sau khi sửa.

---

## Bước 2: Cài đặt Node.js

1. Tải Node.js LTS tại: https://nodejs.org
2. Cài đặt với tùy chọn mặc định
3. Mở Command Prompt, kiểm tra:
```cmd
node --version
npm --version
```

---

## Bước 3: Cài đặt ứng dụng

### 3.1 Copy thư mục `backend_server` vào máy chủ

Ví dụ: `D:\UNC-VDB\backend_server`

### 3.2 Cài đặt dependencies

```cmd
cd D:\UNC-VDB\backend_server
npm install
```

### 3.3 Khởi tạo database

```cmd
npm run init-db
```

Kết quả mong đợi:
```
✅ Đã tạo database: unc_vdb
✅ Đã tạo các bảng thành công
✅ Tài khoản admin đã sẵn sàng (admin / admin123)
🚀 Khởi tạo database hoàn tất!
```

### 3.4 Build frontend

Từ thư mục gốc dự án (chứa package.json của React):
```cmd
npm install
npm run build
```

Copy toàn bộ nội dung thư mục `dist/` vào `backend_server/public/`

### 3.5 Khởi động server

```cmd
cd D:\UNC-VDB\backend_server
npm start
```

Server sẽ chạy tại: **http://10.24.16.77:3003**

---

## Bước 4: Cấu hình Windows Firewall

Mở PowerShell (Administrator):
```powershell
New-NetFirewallRule -DisplayName "UNC-VDB Server" -Direction Inbound -Port 3003 -Protocol TCP -Action Allow
```

---

## Bước 5: Chạy như Windows Service (tùy chọn)

Cài đặt `pm2` để chạy server tự động khi khởi động Windows:

```cmd
npm install -g pm2 pm2-windows-startup

pm2 start D:\UNC-VDB\backend_server\server.js --name unc-vdb
pm2 save
pm2-startup install
```

---

## Tài khoản mặc định

| Username | Password  | Ghi chú          |
|----------|-----------|------------------|
| admin    | admin123  | Quản trị viên    |

**⚠️ Hãy đổi mật khẩu admin ngay sau khi cài đặt!**

---

## Truy cập từ các chi nhánh

| Chi nhánh  | Dải IP       | URL truy cập                    |
|------------|--------------|----------------------------------|
| Cao Bằng   | 10.24.x.x   | http://10.24.16.77:3003          |
| Bắc Giang  | 10.42.x.x   | http://10.24.16.77:3003          |
| Lạng Sơn   | 10.30.x.x   | http://10.24.16.77:3003          |
| Bắc Ninh   | 10.44.x.x   | http://10.24.16.77:3003          |

### Cấu hình Proxy (nếu cần)

Nếu chi nhánh truy cập qua proxy:
- **Proxy**: hn.proxy.vdb
- **Port**: 8080

Trong trình duyệt, cấu hình proxy exception cho `10.24.16.77` (không qua proxy cho mạng nội bộ).

---

## Đăng nhập

- Nhập **tên đăng nhập** (ví dụ: `longtn`), hệ thống tự chuyển thành email `longtn@vdb.local`
- Hoặc nhập trực tiếp email đầy đủ

---

## API Endpoints

| Method | URL                       | Mô tả                    |
|--------|---------------------------|---------------------------|
| POST   | /api/auth/login           | Đăng nhập                |
| POST   | /api/auth/register        | Tạo tài khoản (cần auth) |
| GET    | /api/auth/me              | Thông tin user hiện tại  |
| POST   | /api/auth/change-password | Đổi mật khẩu            |
| GET    | /api/unc                  | Danh sách UNC            |
| POST   | /api/unc                  | Lưu UNC mới              |
| DELETE | /api/unc/:id              | Xóa UNC                  |
| GET    | /api/beneficiaries        | DS đơn vị hưởng          |
| POST   | /api/beneficiaries        | Lưu đơn vị hưởng         |
| DELETE | /api/beneficiaries/:id    | Xóa đơn vị hưởng        |
| GET    | /api/branches             | DS chi nhánh             |
