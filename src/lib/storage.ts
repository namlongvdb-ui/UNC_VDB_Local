import type { UNCFormData } from "@/components/InputPanel";

export interface SavedBeneficiary {
  id: string;
  name: string;
  donViNhanTien: string;
  soTaiKhoanNhan: string;
  taiNHKB: string;
  tinhTP: string;
}

export interface UNCHistoryEntry {
  id: string;
  createdAt: string;
  soUNC: string;
  donViNhanTien: string;
  soTienBangSo: string;
  noiDungThanhToan: string;
  data: UNCFormData;
}

const BENEFICIARIES_KEY = "unc_42b_beneficiaries";
const HISTORY_KEY = "unc_42b_history";

export function getSavedBeneficiaries(): SavedBeneficiary[] {
  try {
    return JSON.parse(localStorage.getItem(BENEFICIARIES_KEY) || "[]");
  } catch { return []; }
}

export function saveBeneficiary(b: Omit<SavedBeneficiary, "id">): SavedBeneficiary {
  const list = getSavedBeneficiaries();
  const entry: SavedBeneficiary = { ...b, id: crypto.randomUUID() };
  list.push(entry);
  localStorage.setItem(BENEFICIARIES_KEY, JSON.stringify(list));
  return entry;
}

export function deleteBeneficiary(id: string) {
  const list = getSavedBeneficiaries().filter((b) => b.id !== id);
  localStorage.setItem(BENEFICIARIES_KEY, JSON.stringify(list));
}

export function getUNCHistory(): UNCHistoryEntry[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch { return []; }
}

export function saveUNCHistory(data: UNCFormData): UNCHistoryEntry {
  const list = getUNCHistory();
  const entry: UNCHistoryEntry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    soUNC: data.soUNC,
    donViNhanTien: data.donViNhanTien,
    soTienBangSo: data.soTienBangSo,
    noiDungThanhToan: data.noiDungThanhToan,
    data,
  };
  list.unshift(entry);
  // Keep max 50
  if (list.length > 50) list.length = 50;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list));
  return entry;
}

export function deleteUNCHistory(id: string) {
  const list = getUNCHistory().filter((h) => h.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list));
}
