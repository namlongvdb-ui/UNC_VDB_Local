import { useState, useEffect } from "react";
import { formatNumber } from "@/lib/numberToWords";
import { numberToVietnameseWords } from "@/lib/numberToWords";
import {
  getSavedBeneficiaries,
  saveBeneficiary,
  deleteBeneficiary,
  getUNCHistory,
  saveUNCHistory,
  deleteUNCHistory,
  type SavedBeneficiary,
  type UNCHistoryEntry,
} from "@/lib/storage";
import { Save, Trash2, Clock, UserPlus, ChevronDown, ChevronUp, RotateCcw, BookUser, Building2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export interface UNCFormData {
  soUNC: string;
  ngay: string;
  thang: string;
  nam: string;
  donViTraTien: string;
  soTaiKhoanTra: string;
  taiNHPT: string;
  donViNhanTien: string;
  soTaiKhoanNhan: string;
  taiNHKB: string;
  tinhTP: string;
  soTienBangChu: string;
  noiDungThanhToan: string;
  soTienBangSo: string;
}

const initialData: UNCFormData = {
  soUNC: "",
  ngay: "",
  thang: "",
  nam: "",
  donViTraTien: "",
  soTaiKhoanTra: "",
  taiNHPT: "",
  donViNhanTien: "",
  soTaiKhoanNhan: "",
  taiNHKB: "",
  tinhTP: "",
  soTienBangChu: "",
  noiDungThanhToan: "",
  soTienBangSo: "",
};

interface InputPanelProps {
  data: UNCFormData;
  onChange: (data: UNCFormData) => void;
  activeTab?: string;
}

export const useUNCForm = () => {
  const [data, setData] = useState<UNCFormData>(initialData);
  const update = (field: keyof UNCFormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };
  return { data, update, setData };
};

const InputPanel = ({ data, onChange, activeTab }: InputPanelProps) => {
  const [beneficiaries, setBeneficiaries] = useState<SavedBeneficiary[]>([]);
  const [history, setHistory] = useState<UNCHistoryEntry[]>([]);
  const [showBeneficiaries, setShowBeneficiaries] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historySheetOpen, setHistorySheetOpen] = useState(false);

  useEffect(() => {
    if (activeTab === "42b") {
      setBeneficiaries(getSavedBeneficiaries());
      setHistory(getUNCHistory());
    }
  }, [activeTab]);

  const update = (field: keyof UNCFormData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const inputClass =
    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  const labelClass = "text-sm font-medium text-foreground mb-1 block";

  const handleResetForm = () => {
    onChange(initialData);
  };

  const applyDefault42b = () => {
    onChange({
      ...data,
      donViTraTien: "VDB-Chi nhánh KV Bắc Đông Bắc, PGD Cao Bằng",
      soTaiKhoanTra: "203.519199.001.001",
      taiNHPT: "VDB-Chi nhánh KV Bắc Đông Bắc, PGD Cao Bằng",
    });
  };

  const handleSaveBeneficiary = () => {
    if (!data.donViNhanTien) return;
    saveBeneficiary({
      name: data.donViNhanTien,
      donViNhanTien: data.donViNhanTien,
      soTaiKhoanNhan: data.soTaiKhoanNhan,
      taiNHKB: data.taiNHKB,
      tinhTP: data.tinhTP,
    });
    setBeneficiaries(getSavedBeneficiaries());
  };

  const handleSelectBeneficiary = (b: SavedBeneficiary) => {
    onChange({
      ...data,
      donViNhanTien: b.donViNhanTien,
      soTaiKhoanNhan: b.soTaiKhoanNhan,
      taiNHKB: b.taiNHKB,
      tinhTP: b.tinhTP,
    });
    setSheetOpen(false);
  };

  const handleDeleteBeneficiary = (id: string) => {
    deleteBeneficiary(id);
    setBeneficiaries(getSavedBeneficiaries());
  };

  const handleSaveHistory = () => {
    saveUNCHistory(data);
    setHistory(getUNCHistory());
  };

  const handleLoadHistory = (entry: UNCHistoryEntry) => {
    onChange(entry.data);
    setHistorySheetOpen(false);
  };

  const handleDeleteHistory = (id: string) => {
    deleteUNCHistory(id);
    setHistory(getUNCHistory());
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()} ${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-5">
      {activeTab === "42b" && (
        <>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={applyDefault42b}
              className="rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Mặc định (PGD Cao Bằng)
            </button>
            <button
              type="button"
              onClick={handleResetForm}
              className="rounded-md bg-destructive text-destructive-foreground px-3 py-2 text-sm font-medium hover:bg-destructive/90 transition-colors"
              title="Làm mới form (Ctrl+N)"
            >
              New
            </button>
            <button
              type="button"
              onClick={handleSaveHistory}
              className="rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-1"
              title="Lưu lịch sử"
            >
              <Save className="w-4 h-4" />
            </button>
            <Sheet open={historySheetOpen} onOpenChange={setHistorySheetOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="rounded-md bg-accent text-accent-foreground px-3 py-2 text-sm font-medium hover:bg-accent/80 transition-colors flex items-center gap-1"
                  title="Lịch sử UNC"
                >
                  <Clock className="w-4 h-4" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[360px] sm:w-[420px] flex flex-col overflow-hidden">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Lịch sử UNC ({history.length})
                  </SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto mt-4 -mx-2">
                  {history.length === 0 ? (
                    <p className="text-sm text-muted-foreground italic text-center py-8">Chưa có lịch sử UNC.</p>
                  ) : (
                    <div className="space-y-2 px-2">
                      {history.map((entry) => (
                        <div
                          key={entry.id}
                          className="group rounded-lg border border-border bg-card p-3 hover:border-primary/40 hover:shadow-sm transition-all cursor-pointer"
                          onClick={() => handleLoadHistory(entry)}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">UNC #{entry.soUNC || "---"}</span>
                                <span className="text-xs text-muted-foreground">{formatDate(entry.createdAt)}</span>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                                <div>{entry.donViNhanTien || "—"}</div>
                                <div className="font-medium text-foreground">{formatNumber(entry.soTienBangSo)}đ</div>
                                {entry.noiDungThanhToan && (
                                  <div className="italic truncate">{entry.noiDungThanhToan}</div>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDeleteHistory(entry.id); }}
                              className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive/80 transition-opacity p-1 rounded hover:bg-destructive/10"
                              title="Xóa"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </>
      )}

      {activeTab === "42a" && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleResetForm}
            className="rounded-md bg-destructive text-destructive-foreground px-3 py-2 text-sm font-medium hover:bg-destructive/90 transition-colors"
            title="Làm mới form (Ctrl+N)"
          >
            New
          </button>
        </div>
      )}

      {/* Thông tin chung */}
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <h3 className="text-sm font-semibold text-primary uppercase tracking-wide">
          Thông tin chung
        </h3>
        <div>
          <label className={labelClass}>Số UNC</label>
          <input className={inputClass} placeholder="Nhập số UNC..." value={data.soUNC} onChange={(e) => update("soUNC", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Ngày lập (dd/mm/yyyy)</label>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <input className={inputClass} placeholder="Ngày" maxLength={2} value={data.ngay} onChange={(e) => {
                const v = e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
                onChange({ ...data, ngay: v });
              }} />
            </div>
            <div>
              <input className={inputClass} placeholder="Tháng" maxLength={2} value={data.thang} onChange={(e) => {
                const v = e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
                onChange({ ...data, thang: v });
              }} />
            </div>
            <div>
              <input className={inputClass} placeholder="Năm" maxLength={4} value={data.nam} onChange={(e) => {
                const v = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
                onChange({ ...data, nam: v });
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Đơn vị trả tiền */}
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <h3 className="text-sm font-semibold text-primary uppercase tracking-wide">
          Đơn vị trả tiền
        </h3>
        <div>
          <label className={labelClass}>Tên đơn vị</label>
          <input className={inputClass} placeholder="Nhập tên đơn vị trả tiền..." value={data.donViTraTien} onChange={(e) => update("donViTraTien", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Số tài khoản</label>
          <input className={inputClass} placeholder="Nhập số tài khoản..." value={data.soTaiKhoanTra} onChange={(e) => update("soTaiKhoanTra", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Tại NHPT tỉnh, TP</label>
          <input className={inputClass} placeholder="Nhập tên chi nhánh NHPT..." value={data.taiNHPT} onChange={(e) => update("taiNHPT", e.target.value)} />
        </div>
      </div>

      {/* Đơn vị nhận tiền */}
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wide">
            Đơn vị nhận tiền
          </h3>
          {activeTab === "42b" && (
            <div className="flex gap-1">
              <button
                type="button"
                onClick={handleSaveBeneficiary}
                className="text-xs px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center gap-1"
                title="Lưu đơn vị hưởng"
              >
                <UserPlus className="w-3 h-3" /> Lưu
              </button>
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className="text-xs px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center gap-1"
                  >
                    <BookUser className="w-3 h-3" /> DS đã lưu
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[360px] sm:w-[400px] flex flex-col overflow-hidden">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-primary" />
                      Đơn vị hưởng đã lưu
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex-1 overflow-y-auto mt-4 -mx-2">
                    {beneficiaries.length === 0 ? (
                      <p className="text-sm text-muted-foreground italic text-center py-8">Chưa có đơn vị hưởng nào được lưu.</p>
                    ) : (
                      <div className="space-y-2 px-2">
                        {beneficiaries.map((b) => (
                          <div
                            key={b.id}
                            className="group rounded-lg border border-border bg-card p-3 hover:border-primary/40 hover:shadow-sm transition-all cursor-pointer"
                            onClick={() => handleSelectBeneficiary(b)}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0 flex-1">
                                <div className="font-medium text-sm text-foreground truncate">{b.donViNhanTien}</div>
                                <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                                  <div>TK: {b.soTaiKhoanNhan || "—"}</div>
                                  <div>NH: {b.taiNHKB || "—"}</div>
                                  {b.tinhTP && <div>Tỉnh/TP: {b.tinhTP}</div>}
                                </div>
                              </div>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleDeleteBeneficiary(b.id); }}
                                className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive/80 transition-opacity p-1 rounded hover:bg-destructive/10"
                                title="Xóa"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>

        <div>
          <label className={labelClass}>Tên đơn vị</label>
          <input className={inputClass} placeholder="Nhập tên đơn vị nhận tiền..." value={data.donViNhanTien} onChange={(e) => update("donViNhanTien", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Số tài khoản</label>
          <input className={inputClass} placeholder="Nhập số tài khoản..." value={data.soTaiKhoanNhan} onChange={(e) => update("soTaiKhoanNhan", e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Tại NH, KB</label>
            <input className={inputClass} placeholder="Tên ngân hàng..." value={data.taiNHKB} onChange={(e) => update("taiNHKB", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Tỉnh, TP</label>
            <input className={inputClass} placeholder="Tỉnh/TP..." value={data.tinhTP} onChange={(e) => update("tinhTP", e.target.value)} />
          </div>
        </div>
      </div>

      {/* Số tiền & Nội dung */}
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <h3 className="text-sm font-semibold text-primary uppercase tracking-wide">
          Số tiền & Nội dung
        </h3>
        <div>
          <label className={labelClass}>Số tiền bằng số</label>
          <input className={`${inputClass} text-lg font-bold`} placeholder="0" value={formatNumber(data.soTienBangSo)} onChange={(e) => {
            const raw = e.target.value.replace(/\./g, '');
            onChange({ ...data, soTienBangSo: raw, soTienBangChu: numberToVietnameseWords(raw) });
          }} />
        </div>
        <div>
          <label className={labelClass}>Số tiền bằng chữ</label>
          <input className={inputClass} placeholder="Nhập số tiền bằng chữ..." value={data.soTienBangChu} onChange={(e) => update("soTienBangChu", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Nội dung thanh toán</label>
          <textarea
            className={`${inputClass} min-h-[60px] resize-none`}
            placeholder="Nhập nội dung thanh toán..."
            value={data.noiDungThanhToan}
            onChange={(e) => update("noiDungThanhToan", e.target.value)}
          />
        </div>
      </div>

    </div>
  );
};

export default InputPanel;
