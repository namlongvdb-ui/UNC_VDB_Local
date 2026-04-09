import vdbLogo from "@/assets/vdb-logo.jpg";
import type { UNCFormData } from "./InputPanel";

interface UNCPreview42aProps {
  data: UNCFormData;
}

const UNCPreview42a = ({ data }: UNCPreview42aProps) => {
  const dots = (len: number) => ".".repeat(len);
  const field = (v: string, len = 30) => v || dots(len);

  return (
    <div
      className="w-[210mm] h-[297mm] bg-white text-black mx-auto shadow-lg print:shadow-none"
      style={{ fontFamily: "'Times New Roman', serif", fontSize: "13px" }}
    >
      <div className="px-[15mm] py-[10mm] h-full flex flex-col">
        {/* Mẫu số */}
        <div className="text-right text-[11px] italic">Mẫu số: C42a-NHPT</div>

        {/* Title row: Logo + Title + Số UNC */}
        <div className="flex items-start -mt-1">
          {/* Logo - aligned with title */}
          <div className="w-[80px] flex items-center justify-center">
            <img src={vdbLogo} alt="VDB" className="w-[65px] h-[65px] object-contain" />
          </div>
          {/* Center: title + subtitle + date */}
          <div className="flex-1 text-center pt-0.5">
            <h1 className="text-[18px] font-bold tracking-[3px]">ỦY NHIỆM CHI</h1>
            <p className="text-[13px] mt-0.5">Chuyển khoản, chuyển tiền thư, điện</p>
            <p className="text-[13px] mt-1">
              Lập ngày: {field(data.ngay, 8)} tháng {field(data.thang, 8)} năm {field(data.nam, 8)}
            </p>
          </div>
          {/* Số UNC */}
          <div className="text-[13px] pt-1 w-[120px] text-right">
            Số UNC: {field(data.soUNC, 12)}
          </div>
        </div>

        {/* Main body */}
        <div className="flex mt-2">
          {/* Left fields block - one continuous bordered block */}
          <div className="flex-1 border border-black">
            {/* Đơn vị trả tiền group */}
            <div className="border-b border-black px-2 py-[3px]">
              Đơn vị trả tiền:{field(data.donViTraTien, 58)}
            </div>
            <div className="border-b border-black px-2 py-[3px]">
              Số tài khoản:{field(data.soTaiKhoanTra, 62)}
            </div>
            <div className="border-b border-black px-2 py-[3px]">
              Tại NHPT tỉnh, TP:{field(data.taiNHPT, 54)}
            </div>

            {/* Separator - thicker or double */}
            {/* Đơn vị nhận tiền group */}
            <div className="border-b border-black px-2 py-[3px]">
              Đơn vị nhận tiền:{field(data.donViNhanTien, 56)}
            </div>
            <div className="border-b border-black px-2 py-[3px]">
              Số tài khoản:{field(data.soTaiKhoanNhan, 62)}
            </div>
            <div className="border-b border-black px-2 py-[3px]">
              Tại NH, KB:{field(data.taiNHKB, 28)},tỉnh, TP:{field(data.tinhTP, 22)}
            </div>

            {/* Số tiền & Nội dung */}
            <div className="border-b border-black px-2 py-[3px]">
              Số tiền bằng chữ:{field(data.soTienBangChu, 56)}
            </div>
            <div className="px-2 py-[3px]">
              Nội dung thanh toán:{field(data.noiDungThanhToan, 52)}
            </div>
          </div>

          {/* Right panel - stacked boxes sharing border with left */}
          <div className="w-[155px] border-t border-r border-b border-black ml-[-1px]">
            {/* NHPT GHI */}
            <div className="border-b border-black px-2 py-1.5">
              <p className="font-bold text-center text-[12px]">NHPT GHI</p>
              <p className="text-center text-[11px] mt-0.5">
                {dots(5)}/{dots(5)}/{dots(7)}
              </p>
              <p className="text-[11px] mt-1">Nợ:{dots(20)}</p>
              <p className="text-[11px] mt-0.5">Có:{dots(20)}</p>
            </div>
            {/* NH (KBNN) GHI */}
            <div className="border-b border-black px-2 py-1.5">
              <p className="font-bold text-center text-[12px]">NH (KBNN) GHI:</p>
              <p className="text-[11px] mt-1">Nợ:{dots(20)}</p>
              <p className="text-[11px] mt-0.5">Có:{dots(20)}</p>
            </div>
            {/* SỐ TIỀN BẰNG SỐ */}
            <div className="px-2 py-1.5">
              <p className="font-bold text-center text-[12px]">SỐ TIỀN BẰNG SỐ</p>
              <p className="text-center text-[14px] font-bold mt-1 min-h-[22px]">
                {data.soTienBangSo || <span>*{dots(16)}*</span>}
              </p>
            </div>
          </div>
        </div>

        {/* Signature row 1: Đơn vị trả tiền + Ngân hàng Phát triển */}
        <div className="flex border-t border-black">
          {/* Đơn vị trả tiền */}
          <div className="flex-1 border-r border-black py-1.5 px-2">
            <p className="font-bold text-[12px] text-center">Đơn vị trả tiền</p>
            <div className="flex justify-around mt-0.5">
              <div className="text-center">
                <p className="font-bold text-[11px]">Kế toán trưởng</p>
                <p className="text-[9px] italic text-gray-500">(Ký tên)</p>
                <div className="h-[50px]" />
              </div>
              <div className="text-center">
                <p className="font-bold text-[11px]">Chủ tài khoản</p>
                <p className="text-[9px] italic text-gray-500">(Ký, đóng dấu)</p>
                <div className="h-[50px]" />
              </div>
            </div>
          </div>
          {/* Ngân hàng Phát triển */}
          <div className="flex-1 py-1.5 px-2">
            <p className="font-bold text-[12px] text-center">Ngân hàng Phát triển</p>
            <p className="text-[10px] text-center">Đề nghị NH (KBNN) thanh toán UNC này</p>
            <p className="text-[10px] text-center">từ tài khoản số {dots(28)}</p>
            <p className="text-[10px] text-center">
              Ngày{dots(6)}tháng{dots(5)} năm {dots(8)}
            </p>
            <div className="flex justify-around mt-0.5">
              <div className="text-center">
                <p className="font-bold text-[11px]">Kế toán trưởng</p>
                <p className="text-[9px] italic text-gray-500">(Ký tên)</p>
                <div className="h-[35px]" />
              </div>
              <div className="text-center">
                <p className="font-bold text-[11px]">Chủ tài khoản</p>
                <p className="text-[9px] italic text-gray-500">(Ký, đóng dấu)</p>
                <div className="h-[35px]" />
              </div>
            </div>
          </div>
        </div>

        {/* NH KBNN A + B */}
        <div className="flex mt-8">
          <div className="flex-1">
            <p className="font-bold text-[11px] text-center">NH, (KBNN) A ghi sổ ngày {dots(8)}</p>
            <div className="flex justify-around mt-0.5">
              <div className="text-center">
                <p className="font-bold text-[11px]">Kế toán</p>
                <p className="text-[9px] italic text-gray-500">(Ký tên)</p>
                <div className="h-[50px]" />
              </div>
              <div className="text-center">
                <p className="font-bold text-[11px]">Kế toán trưởng</p>
                <p className="text-[9px] italic text-gray-500">(Ký, đóng dấu)</p>
                <div className="h-[50px]" />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <p className="font-bold text-[11px] text-center">NH, (KBNN) B ghi sổ ngày {dots(8)}</p>
            <div className="flex justify-around mt-0.5">
              <div className="text-center">
                <p className="font-bold text-[11px]">Kế toán</p>
                <p className="text-[9px] italic text-gray-500">(Ký tên)</p>
                <div className="h-[50px]" />
              </div>
              <div className="text-center">
                <p className="font-bold text-[11px]">Kế toán trưởng</p>
                <p className="text-[9px] italic text-gray-500">(Ký, đóng dấu)</p>
                <div className="h-[50px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UNCPreview42a;
