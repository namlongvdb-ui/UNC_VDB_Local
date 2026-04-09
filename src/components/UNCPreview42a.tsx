import vdbLogo from "@/assets/vdb-logo.jpg";
import type { UNCFormData } from "./InputPanel";

interface UNCPreview42aProps {
  data: UNCFormData;
}

const UNCPreview42a = ({ data }: UNCPreview42aProps) => {
  const val = (v: string, fallbackLen = 30) =>
    v ? <span className="font-medium">{v}</span> : <span className="text-gray-400">{"·".repeat(fallbackLen)}</span>;

  return (
    <div
      className="w-[210mm] h-[297mm] bg-white text-black mx-auto shadow-lg print:shadow-none relative overflow-hidden"
      style={{ fontFamily: "'Times New Roman', serif", fontSize: "13px" }}
    >
      <div className="px-[18mm] py-[12mm] h-full flex flex-col">
        {/* Mẫu số top-right */}
        <div className="text-right text-[11px] italic mb-0">
          Mẫu số: C42a-NHPT
        </div>

        {/* Title row */}
        <div className="flex items-start">
          {/* Left spacer for logo */}
          <div className="w-[80px]" />
          {/* Center title */}
          <div className="flex-1 text-center -mt-1">
            <h1 className="text-[17px] font-bold tracking-[3px] mb-0.5">ỦY NHIỆM CHI</h1>
          </div>
          {/* Số UNC */}
          <div className="text-[13px] pt-1 whitespace-nowrap">
            Số UNC: <span className="inline-block min-w-[80px] border-b border-black text-center">{data.soUNC}</span>
          </div>
        </div>

        {/* Subtitle + date row with logo */}
        <div className="flex items-start mt-0">
          {/* Logo */}
          <div className="w-[80px] flex flex-col items-center">
            <img src={vdbLogo} alt="VDB" className="w-[60px] h-[60px] object-contain" />
          </div>
          {/* Center subtitle + date */}
          <div className="flex-1 text-center">
            <p className="text-[13px]">Chuyển khoản, chuyển tiền thư, điện</p>
            <p className="text-[13px] mt-1">
              Lập ngày:{" "}
              <span className="inline-block w-[30px] border-b border-black text-center">{data.ngay}</span>
              {" "}tháng{" "}
              <span className="inline-block w-[30px] border-b border-black text-center">{data.thang}</span>
              {" "}năm{" "}
              <span className="inline-block w-[40px] border-b border-black text-center">{data.nam}</span>
            </p>
          </div>
          {/* Right spacer */}
          <div className="w-[100px]" />
        </div>

        {/* Main body: left fields + right boxes */}
        <div className="flex mt-3 flex-1">
          {/* Left fields */}
          <div className="flex-1 pr-3">
            {/* Đơn vị trả tiền block */}
            <div className="border-t border-l border-r border-black">
              <div className="border-b border-black px-2 py-[5px] text-[13px]">
                Đơn vị trả tiền: {val(data.donViTraTien, 50)}
              </div>
              <div className="border-b border-black px-2 py-[5px] text-[13px]">
                Số tài khoản: {val(data.soTaiKhoanTra, 54)}
              </div>
              <div className="border-b border-black px-2 py-[5px] text-[13px]">
                Tại NHPT tỉnh, TP: {val(data.taiNHPT, 46)}
              </div>
            </div>

            {/* Đơn vị nhận tiền block */}
            <div className="border-l border-r border-black mt-[-1px]">
              <div className="border-b border-black px-2 py-[5px] text-[13px]">
                Đơn vị nhận tiền: {val(data.donViNhanTien, 48)}
              </div>
              <div className="border-b border-black px-2 py-[5px] text-[13px]">
                Số tài khoản: {val(data.soTaiKhoanNhan, 54)}
              </div>
              <div className="border-b border-black px-2 py-[5px] text-[13px]">
                Tại NH, KB: {val(data.taiNHKB, 22)}{" "}, tỉnh, TP: {val(data.tinhTP, 20)}
              </div>
            </div>

            {/* Số tiền & Nội dung block */}
            <div className="border-l border-r border-b border-black mt-[-1px]">
              <div className="border-b border-black px-2 py-[5px] text-[13px]">
                Số tiền bằng chữ: {val(data.soTienBangChu, 48)}
              </div>
              <div className="px-2 py-[5px] text-[13px]">
                Nội dung thanh toán: {val(data.noiDungThanhToan, 44)}
              </div>
            </div>

            {/* Signatures: Đơn vị trả tiền + Ngân hàng Phát triển */}
            <div className="flex mt-4">
              {/* Đơn vị trả tiền */}
              <div className="flex-1 pr-3">
                <p className="font-bold text-[12px] text-center">Đơn vị trả tiền</p>
                <div className="flex justify-around mt-1">
                  <div className="text-center">
                    <p className="font-bold text-[11px]">Kế toán trưởng</p>
                    <p className="text-[9px] italic text-gray-500">(Ký tên)</p>
                    <div className="h-[55px]" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-[11px]">Chủ tài khoản</p>
                    <p className="text-[9px] italic text-gray-500">(Ký, đóng dấu)</p>
                    <div className="h-[55px]" />
                  </div>
                </div>
              </div>
              {/* Ngân hàng Phát triển */}
              <div className="flex-1 pl-3">
                <p className="font-bold text-[12px] text-center">Ngân hàng Phát triển</p>
                <p className="text-[10px] text-center mt-0.5">Đề nghị NH (KBNN) thanh toán UNC này</p>
                <p className="text-[10px] text-center">
                  từ tài khoản số {"·".repeat(30)}
                </p>
                <p className="text-[10px] text-center">
                  Ngày{"·".repeat(5)}tháng{"·".repeat(5)}năm{"·".repeat(7)}
                </p>
                <div className="flex justify-around mt-1">
                  <div className="text-center">
                    <p className="font-bold text-[11px]">Kế toán</p>
                    <p className="text-[9px] italic text-gray-500">(Ký tên)</p>
                    <div className="h-[40px]" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-[11px]">Kế toán trưởng</p>
                    <p className="text-[9px] italic text-gray-500">(Ký, đóng dấu)</p>
                    <div className="h-[40px]" />
                  </div>
                </div>
              </div>
            </div>

            {/* NH KBNN A + B */}
            <div className="flex mt-6">
              <div className="flex-1 pr-2">
                <p className="font-bold text-[11px] text-center">NH, (KBNN) A ghi sổ ngày {"·".repeat(8)}</p>
                <div className="flex justify-around mt-1">
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
              <div className="flex-1 pl-2">
                <p className="font-bold text-[11px] text-center">NH, (KBNN) B ghi sổ ngày {"·".repeat(8)}</p>
                <div className="flex justify-around mt-1">
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

          {/* Right boxes */}
          <div className="w-[150px] space-y-0">
            {/* NHPT GHI */}
            <div className="border border-black p-2">
              <p className="font-bold text-center text-[12px]">NHPT GHI</p>
              <p className="text-center text-[11px] mt-1 mb-1">
                {"·".repeat(5)}/{" "}{"·".repeat(5)}/{" "}{"·".repeat(5)}
              </p>
              <p className="text-[11px] mt-1">Nợ: {"·".repeat(18)}</p>
              <p className="text-[11px] mt-1.5">Có: {"·".repeat(18)}</p>
            </div>

            {/* NH (KBNN) GHI */}
            <div className="border border-black border-t-0 p-2">
              <p className="font-bold text-center text-[12px]">NH (KBNN) GHI:</p>
              <p className="text-[11px] mt-1.5">Nợ: {"·".repeat(18)}</p>
              <p className="text-[11px] mt-1.5">Có: {"·".repeat(18)}</p>
            </div>

            {/* SỐ TIỀN BẰNG SỐ */}
            <div className="border border-black border-t-0 p-2">
              <p className="font-bold text-center text-[12px]">SỐ TIỀN BẰNG SỐ</p>
              <div className="mt-1 min-h-[28px] flex items-center justify-center">
                <span className="text-[14px] font-bold">
                  {data.soTienBangSo || <span className="text-gray-400">*{"·".repeat(16)}*</span>}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UNCPreview42a;
