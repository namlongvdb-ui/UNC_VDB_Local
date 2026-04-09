import { useState, forwardRef } from "react";
import vdbLogo from "@/assets/vdb-logo.jpg";

export interface Form42aData {
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
  nhptNgay: string;
  nhptNo: string;
  nhptCo: string;
  nhkbnnNo: string;
  nhkbnnCo: string;
}

const initialData: Form42aData = {
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
  nhptNgay: "",
  nhptNo: "",
  nhptCo: "",
  nhkbnnNo: "",
  nhkbnnCo: "",
};

const Form42a = forwardRef<HTMLDivElement>((_props, ref) => {
  const [data, setData] = useState<Form42aData>(initialData);

  const update = (field: keyof Form42aData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const inputClass =
    "border-b border-foreground/30 bg-transparent outline-none px-1 text-center font-serif print:border-b print:border-foreground/30";
  const labelClass = "font-serif text-sm";

  return (
    <div
      ref={ref}
      className="w-[210mm] min-h-[297mm] bg-background p-8 mx-auto border border-border print:border-none print:shadow-none shadow-lg"
      style={{ fontFamily: "'Times New Roman', serif" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="w-1/6" />
        <div className="flex-1 text-center">
          <h1 className="text-xl font-bold tracking-wide text-foreground">
            ỦY NHIỆM CHI
          </h1>
          <p className="text-sm text-foreground mt-1">
            Chuyển khoản, chuyển tiền thư, điện
          </p>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          <p>Mẫu số: C42a-NHPT</p>
          <div className="mt-1">
            <span className={labelClass}>Số UNC: </span>
            <input
              className={`${inputClass} w-24`}
              value={data.soUNC}
              onChange={(e) => update("soUNC", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Logo + Date */}
      <div className="flex items-center mb-4">
        <div className="w-1/6 flex flex-col items-center">
          <img src={vdbLogo} alt="VDB Logo" className="w-14 h-14 object-contain" />
          <p className="text-[10px] text-muted-foreground italic mt-0.5">
            Biểu tượng
          </p>
        </div>
        <div className="flex-1 text-center">
          <span className={labelClass}>Lập ngày: </span>
          <input className={`${inputClass} w-10`} value={data.ngay} onChange={(e) => update("ngay", e.target.value)} />
          <span className={labelClass}> tháng </span>
          <input className={`${inputClass} w-10`} value={data.thang} onChange={(e) => update("thang", e.target.value)} />
          <span className={labelClass}> năm </span>
          <input className={`${inputClass} w-14`} value={data.nam} onChange={(e) => update("nam", e.target.value)} />
        </div>
        <div className="w-1/4" />
      </div>

      {/* Main content area with right panel */}
      <div className="flex gap-4">
        {/* Left section */}
        <div className="flex-1 space-y-3">
          {/* Đơn vị trả tiền */}
          <div className="border border-foreground/30 p-3 space-y-2">
            <div className="flex items-center gap-1">
              <span className={labelClass}>Đơn vị trả tiền:</span>
              <input className={`${inputClass} flex-1`} value={data.donViTraTien} onChange={(e) => update("donViTraTien", e.target.value)} />
            </div>
            <div className="flex items-center gap-1">
              <span className={labelClass}>Số tài khoản:</span>
              <input className={`${inputClass} flex-1`} value={data.soTaiKhoanTra} onChange={(e) => update("soTaiKhoanTra", e.target.value)} />
            </div>
            <div className="flex items-center gap-1">
              <span className={labelClass}>Tại NHPT tỉnh, TP:</span>
              <input className={`${inputClass} flex-1`} value={data.taiNHPT} onChange={(e) => update("taiNHPT", e.target.value)} />
            </div>
          </div>

          {/* Đơn vị nhận tiền */}
          <div className="border border-foreground/30 p-3 space-y-2">
            <div className="flex items-center gap-1">
              <span className={labelClass}>Đơn vị nhận tiền:</span>
              <input className={`${inputClass} flex-1`} value={data.donViNhanTien} onChange={(e) => update("donViNhanTien", e.target.value)} />
            </div>
            <div className="flex items-center gap-1">
              <span className={labelClass}>Số tài khoản:</span>
              <input className={`${inputClass} flex-1`} value={data.soTaiKhoanNhan} onChange={(e) => update("soTaiKhoanNhan", e.target.value)} />
            </div>
            <div className="flex items-center gap-1">
              <span className={labelClass}>Tại NH, KB:</span>
              <input className={`${inputClass} w-40`} value={data.taiNHKB} onChange={(e) => update("taiNHKB", e.target.value)} />
              <span className={labelClass}>, tỉnh, TP:</span>
              <input className={`${inputClass} flex-1`} value={data.tinhTP} onChange={(e) => update("tinhTP", e.target.value)} />
            </div>
          </div>

          {/* Số tiền bằng chữ */}
          <div className="border border-foreground/30 p-3 space-y-2">
            <div className="flex items-center gap-1">
              <span className={labelClass}>Số tiền bằng chữ:</span>
              <input className={`${inputClass} flex-1`} value={data.soTienBangChu} onChange={(e) => update("soTienBangChu", e.target.value)} />
            </div>
            <div className="flex items-center gap-1">
              <span className={labelClass}>Nội dung thanh toán:</span>
              <input className={`${inputClass} flex-1`} value={data.noiDungThanhToan} onChange={(e) => update("noiDungThanhToan", e.target.value)} />
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-48 space-y-3">
          {/* NHPT GHI */}
          <div className="border border-foreground/30 p-3">
            <p className="font-bold text-sm text-center mb-2">NHPT GHI</p>
            <p className="text-center text-xs mb-2">
              <input className={`${inputClass} w-8`} value={data.nhptNgay} onChange={(e) => update("nhptNgay", e.target.value)} />
              /......./......
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <span className={labelClass}>Nợ:</span>
                <input className={`${inputClass} flex-1`} value={data.nhptNo} onChange={(e) => update("nhptNo", e.target.value)} />
              </div>
              <div className="flex items-center gap-1">
                <span className={labelClass}>Có:</span>
                <input className={`${inputClass} flex-1`} value={data.nhptCo} onChange={(e) => update("nhptCo", e.target.value)} />
              </div>
            </div>
          </div>

          {/* NH (KBNN) GHI */}
          <div className="border border-foreground/30 p-3">
            <p className="font-bold text-sm text-center mb-2">NH (KBNN) GHI:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <span className={labelClass}>Nợ:</span>
                <input className={`${inputClass} flex-1`} value={data.nhkbnnNo} onChange={(e) => update("nhkbnnNo", e.target.value)} />
              </div>
              <div className="flex items-center gap-1">
                <span className={labelClass}>Có:</span>
                <input className={`${inputClass} flex-1`} value={data.nhkbnnCo} onChange={(e) => update("nhkbnnCo", e.target.value)} />
              </div>
            </div>
          </div>

          {/* SỐ TIỀN BẰNG SỐ */}
          <div className="border border-foreground/30 p-3">
            <p className="font-bold text-sm text-center mb-2">SỐ TIỀN BẰNG SỐ</p>
            <input
              className={`${inputClass} w-full text-lg font-bold`}
              value={data.soTienBangSo}
              onChange={(e) => update("soTienBangSo", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Signatures - Đơn vị trả tiền + Ngân hàng Phát triển */}
      <div className="flex mt-6 border-t border-foreground/30 pt-4">
        <div className="flex-1 border-r border-foreground/30 pr-4">
          <p className="font-bold text-sm text-center mb-1">Đơn vị trả tiền</p>
          <div className="flex justify-around">
            <div className="text-center">
              <p className="font-bold text-sm">Kế toán trưởng</p>
              <p className="text-xs italic text-muted-foreground">(Ký tên)</p>
              <div className="h-20" />
            </div>
            <div className="text-center">
              <p className="font-bold text-sm">Chủ tài khoản</p>
              <p className="text-xs italic text-muted-foreground">(Ký, đóng dấu)</p>
              <div className="h-20" />
            </div>
          </div>
        </div>
        <div className="flex-1 pl-4">
          <p className="font-bold text-sm text-center mb-1">Ngân hàng Phát triển</p>
          <p className="text-xs text-center">
            Đề nghị NH (KBNN) thanh toán UNC này
          </p>
          <p className="text-xs text-center mb-1">
            từ tài khoản số ......................................
          </p>
          <p className="text-xs text-center mb-1">
            Ngày.......tháng.......năm.......
          </p>
          <div className="flex justify-around">
            <div className="text-center">
              <p className="font-bold text-sm">Kế toán</p>
              <p className="text-xs italic text-muted-foreground">(Ký tên)</p>
              <div className="h-16" />
            </div>
            <div className="text-center">
              <p className="font-bold text-sm">Kế toán trưởng</p>
              <p className="text-xs italic text-muted-foreground">(Ký, đóng dấu)</p>
              <div className="h-16" />
            </div>
          </div>
        </div>
      </div>

      {/* NH (KBNN) A and B */}
      <div className="flex mt-8 pt-4">
        <div className="flex-1">
          <p className="font-bold text-sm text-center mb-1">
            NH, (KBNN) A ghi sổ ngày ......
          </p>
          <div className="flex justify-around">
            <div className="text-center">
              <p className="font-bold text-sm">Kế toán</p>
              <p className="text-xs italic text-muted-foreground">(Ký tên)</p>
              <div className="h-16" />
            </div>
            <div className="text-center">
              <p className="font-bold text-sm">Kế toán trưởng</p>
              <p className="text-xs italic text-muted-foreground">(Ký, đóng dấu)</p>
              <div className="h-16" />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <p className="font-bold text-sm text-center mb-1">
            NH, (KBNN) B ghi sổ ngày ......
          </p>
          <div className="flex justify-around">
            <div className="text-center">
              <p className="font-bold text-sm">Kế toán</p>
              <p className="text-xs italic text-muted-foreground">(Ký tên)</p>
              <div className="h-16" />
            </div>
            <div className="text-center">
              <p className="font-bold text-sm">Kế toán trưởng</p>
              <p className="text-xs italic text-muted-foreground">(Ký, đóng dấu)</p>
              <div className="h-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Form42a.displayName = "Form42a";
export default Form42a;
