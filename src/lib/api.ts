/**
 * API Client cho UNC-VDB Backend
 * Tự động detect: nếu chạy local với backend thì gọi API,
 * nếu chạy trên Lovable preview thì dùng localStorage.
 */

const API_BASE = import.meta.env.VITE_API_URL || "";

function getToken(): string | null {
  return localStorage.getItem("unc_token");
}

function setToken(token: string) {
  localStorage.setItem("unc_token", token);
}

export function clearToken() {
  localStorage.removeItem("unc_token");
  localStorage.removeItem("unc_user");
}

function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

export function getSavedUser() {
  try {
    return JSON.parse(localStorage.getItem("unc_user") || "null");
  } catch {
    return null;
  }
}

export async function login(username: string, password: string) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Đăng nhập thất bại");
  setToken(data.token);
  localStorage.setItem("unc_user", JSON.stringify(data.user));
  return data.user;
}

export async function fetchUNCList(template?: string) {
  const params = template ? `?template=${template}` : "";
  const res = await fetch(`${API_BASE}/api/unc${params}`, { headers: getHeaders() });
  if (!res.ok) throw new Error("Lỗi tải dữ liệu");
  return res.json();
}

export async function saveUNC(data: Record<string, string>) {
  const res = await fetch(`${API_BASE}/api/unc`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Lỗi lưu UNC");
  return res.json();
}

export async function deleteUNC(id: number) {
  const res = await fetch(`${API_BASE}/api/unc/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Lỗi xóa");
  return res.json();
}

export async function fetchBeneficiaries() {
  const res = await fetch(`${API_BASE}/api/beneficiaries`, { headers: getHeaders() });
  if (!res.ok) throw new Error("Lỗi tải dữ liệu");
  return res.json();
}

export async function saveBeneficiaryAPI(data: Record<string, string>) {
  const res = await fetch(`${API_BASE}/api/beneficiaries`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Lỗi lưu");
  return res.json();
}

export async function deleteBeneficiaryAPI(id: number) {
  const res = await fetch(`${API_BASE}/api/beneficiaries/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Lỗi xóa");
  return res.json();
}

export async function changePassword(oldPassword: string, newPassword: string) {
  const res = await fetch(`${API_BASE}/api/auth/change-password`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ oldPassword, newPassword }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Lỗi đổi mật khẩu");
  return data;
}
