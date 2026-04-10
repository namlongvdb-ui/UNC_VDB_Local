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
import { Save, Trash2, Clock, UserPlus, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";

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
  const [showHistory, setShowHistory] = useState(false);

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
              className="flex-1 rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Mặc định (PGD Cao Bằng)
            </button>
            <button
              type="button"
              onClick={handleSaveHistory}
              className="rounded-md bg-accent text-accent-foreground px-3 py-2 text-sm font-medium hover:bg-accent/80 transition-colors flex items-center gap-1"
              title="Lưu lịch sử"
            >
              <Save className="w-4 h-4" />
            </button>
          </div>
        </>
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
          <input
            className={inputClass}
            placeholder="dd/mm/yyyy"
            value={`${data.ngay}/${data.thang}/${data.nam}`}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^0-9/]/g, '');
              const parts = raw.split('/');
              onChange({
                ...data,
                ngay: parts[0]?.slice(0, 2) || '',
                thang: parts[1]?.slice(0, 2) || '',
                nam: parts[2]?.slice(0, 4) || '',
              });
            }}
          />
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
              <button
                type="button"
                onClick={() => setShowBeneficiaries(!showBeneficiaries)}
                className="text-xs px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center gap-1"
              >
                DS đã lưu {showBeneficiaries ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>
          )}
        </div>

        {/* Saved beneficiaries list */}
        {activeTab === "42b" && showBeneficiaries && beneficiaries.length > 0 && (
          <div className="rounded-md border border-border bg-muted/50 max-h-[200px] overflow-y-auto">
            {beneficiaries.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between px-3 py-2 hover:bg-muted cursor-pointer border-b border-border last:border-b-0 text-xs"
              >
                <div className="flex-1 min-w-0" onClick={() => handleSelectBeneficiary(b)}>
                  <div className="font-medium truncate">{b.donViNhanTien}</div>
                  <div className="text-muted-foreground truncate">TK: {b.soTaiKhoanNhan} | {b.taiNHKB}</div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDeleteBeneficiary(b.id); }}
                  className="ml-2 text-destructive hover:text-destructive/80 flex-shrink-0"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
        {activeTab === "42b" && showBeneficiaries && beneficiaries.length === 0 && (
          <p className="text-xs text-muted-foreground italic">Chưa có đơn vị hưởng nào được lưu.</p>
        )}

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

      {/* Lịch sử UNC - only 42b */}
      {activeTab === "42b" && (
        <div className="rounded-lg border border-border bg-card p-4 space-y-3">
          <button
            type="button"
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wide flex items-center gap-2">
              <Clock className="w-4 h-4" /> Lịch sử UNC ({history.length})
            </h3>
            {showHistory ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>

          {showHistory && (
            <div className="max-h-[300px] overflow-y-auto space-y-0 rounded-md border border-border">
              {history.length === 0 ? (
                <p className="text-xs text-muted-foreground italic p-3">Chưa có lịch sử UNC.</p>
              ) : (
                history.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between px-3 py-2 hover:bg-muted border-b border-border last:border-b-0 text-xs"
                  >
                    <div className="flex-1 min-w-0 cursor-pointer" onClick={() => handleLoadHistory(entry)}>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">UNC #{entry.soUNC || "---"}</span>
                        <span className="text-muted-foreground">{formatDate(entry.createdAt)}</span>
                      </div>
                      <div className="text-muted-foreground truncate">
                        {entry.donViNhanTien} — {formatNumber(entry.soTienBangSo)}đ
                      </div>
                      {entry.noiDungThanhToan && (
                        <div className="text-muted-foreground truncate italic">{entry.noiDungThanhToan}</div>
                      )}
                    </div>
                    <div className="flex gap-1 ml-2 flex-shrink-0">
                      <button
                        onClick={() => handleLoadHistory(entry)}
                        className="text-primary hover:text-primary/80"
                        title="Tải lại"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteHistory(entry.id)}
                        className="text-destructive hover:text-destructive/80"
                        title="Xóa"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InputPanel;
