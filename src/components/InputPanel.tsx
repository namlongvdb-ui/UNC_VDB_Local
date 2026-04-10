import { useState } from "react";
import { numberToVietnameseWords } from "@/lib/numberToWords";

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
}

export const useUNCForm = () => {
  const [data, setData] = useState<UNCFormData>(initialData);
  const update = (field: keyof UNCFormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };
  return { data, update, setData };
};

const InputPanel = ({ data, onChange }: InputPanelProps) => {
  const update = (field: keyof UNCFormData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const inputClass =
    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  const labelClass = "text-sm font-medium text-foreground mb-1 block";

  return (
    <div className="space-y-5">
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
        <h3 className="text-sm font-semibold text-primary uppercase tracking-wide">
          Đơn vị nhận tiền
        </h3>
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
          <input className={`${inputClass} text-lg font-bold`} placeholder="0" value={data.soTienBangSo} onChange={(e) => {
            const val = e.target.value;
            update("soTienBangSo", val);
            onChange({ ...data, soTienBangSo: val, soTienBangChu: numberToVietnameseWords(val) });
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
