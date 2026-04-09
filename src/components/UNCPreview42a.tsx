import vdbLogo from "@/assets/vdb-logo.jpg";
import type { UNCFormData } from "./InputPanel";

interface UNCPreview42aProps {
  data: UNCFormData;
}

const dot = (len: number) => ".".repeat(len);

const UNCPreview42a = ({ data }: UNCPreview42aProps) => {
  return (
    <div
      className="w-[210mm] bg-white text-black mx-auto shadow-lg print:shadow-none"
      style={{ fontFamily: "'Times New Roman', serif", fontSize: "13px" }}
    >
      <div className="p-[15mm] pt-[10mm]">
        {/* Top right - Mẫu số */}
        <div className="flex justify-end mb-1">
          <span className="text-xs italic">Mẫu số: C42a-NHPT</span>
        </div>

        {/* Header */}
        <div className="flex items-start mb-1">
          <div className="w-20 flex flex-col items-center pt-1">
            <img src={vdbLogo} alt="VDB" className="w-12 h-12 object-contain" />
            <span className="text-[9px] italic mt-0.5 text-gray-500">Biểu tượng</span>
          </div>
          <div className="flex-1 text-center">
            <h1 className="text-[18px] font-bold tracking-[2px]">ỦY NHIỆM CHI</h1>
            <p className="text-[13px] mt-0.5">Chuyển khoản, chuyển tiền thư, điện</p>
            <p className="text-[13px] mt-1">
              Lập ngày: <span className="inline-block w-8 text-center border-b border-black">{data.ngay || dot(4)}</span> tháng <span className="inline-block w-8 text-center border-b border-black">{data.thang || dot(4)}</span> năm <span className="inline-block w-12 text-center border-b border-black">{data.nam || dot(6)}</span>
            </p>
          </div>
          <div className="w-28 text-right">
            <p className="text-[13px]">
              Số UNC: <span className="inline-block w-16 text-center border-b border-black">{data.soUNC || dot(8)}</span>
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="flex gap-3 mt-3">
          {/* Left */}
          <div className="flex-1">
            {/* Sender */}
            <table className="w-full border-collapse border border-black text-[13px]">
              <tbody>
                <tr>
                  <td className="border border-black px-2 py-1.5" colSpan={2}>
                    Đơn vị trả tiền: <span className="font-medium">{data.donViTraTien || dot(40)}</span>
                  </td>
                </tr>
                <tr>
                  <td className="border border-black px-2 py-1.5" colSpan={2}>
                    Số tài khoản: <span className="font-medium">{data.soTaiKhoanTra || dot(44)}</span>
                  </td>
                </tr>
                <tr>
                  <td className="border border-black px-2 py-1.5" colSpan={2}>
                    Tại NHPT tỉnh, TP: <span className="font-medium">{data.taiNHPT || dot(38)}</span>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Receiver */}
            <table className="w-full border-collapse border border-black text-[13px] mt-2">
              <tbody>
                <tr>
                  <td className="border border-black px-2 py-1.5" colSpan={2}>
                    Đơn vị nhận tiền: <span className="font-medium">{data.donViNhanTien || dot(38)}</span>
                  </td>
                </tr>
                <tr>
                  <td className="border border-black px-2 py-1.5" colSpan={2}>
                    Số tài khoản: <span className="font-medium">{data.soTaiKhoanNhan || dot(44)}</span>
                  </td>
                </tr>
                <tr>
                  <td className="border border-black px-2 py-1.5" colSpan={2}>
                    Tại NH, KB: <span className="font-medium">{data.taiNHKB || dot(20)}</span>
                    , tỉnh, TP: <span className="font-medium">{data.tinhTP || dot(20)}</span>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Amount & Content */}
            <table className="w-full border-collapse border border-black text-[13px] mt-2">
              <tbody>
                <tr>
                  <td className="border border-black px-2 py-1.5">
                    Số tiền bằng chữ: <span className="font-medium">{data.soTienBangChu || dot(38)}</span>
                  </td>
                </tr>
                <tr>
                  <td className="border border-black px-2 py-1.5">
                    Nội dung thanh toán: <span className="font-medium">{data.noiDungThanhToan || dot(36)}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Right panel */}
          <div className="w-[160px] space-y-2">
            {/* NHPT GHI */}
            <div className="border border-black p-2">
              <p className="font-bold text-center text-[13px] mb-1">NHPT GHI</p>
              <p className="text-center text-[11px] mb-1">......./......./.......</p>
              <p className="text-[12px]">Nợ: {dot(16)}</p>
              <p className="text-[12px] mt-1">Có: {dot(16)}</p>
            </div>

            {/* NH KBNN GHI */}
            <div className="border border-black p-2">
              <p className="font-bold text-center text-[13px] mb-1">NH (KBNN) GHI:</p>
              <p className="text-[12px]">Nợ: {dot(16)}</p>
              <p className="text-[12px] mt-1">Có: {dot(16)}</p>
            </div>

            {/* SỐ TIỀN BẰNG SỐ */}
            <div className="border border-black p-2">
              <p className="font-bold text-center text-[13px] mb-1">SỐ TIỀN BẰNG SỐ</p>
              <p className="text-center text-[15px] font-bold min-h-[24px]">
                {data.soTienBangSo || "*" + dot(14) + "*"}
              </p>
            </div>
          </div>
        </div>

        {/* Signatures row 1 */}
        <div className="flex mt-5 border-t border-black">
          <div className="flex-1 border-r border-black pt-2 pr-3">
            <p className="font-bold text-[13px] text-center mb-0.5">Đơn vị trả tiền</p>
            <div className="flex justify-around">
              <div className="text-center">
                <p className="font-bold text-[12px]">Kế toán trưởng</p>
                <p className="text-[10px] italic text-gray-500">(Ký tên)</p>
                <div className="h-16" />
              </div>
              <div className="text-center">
                <p className="font-bold text-[12px]">Chủ tài khoản</p>
                <p className="text-[10px] italic text-gray-500">(Ký, đóng dấu)</p>
                <div className="h-16" />
              </div>
            </div>
          </div>
          <div className="flex-1 pt-2 pl-3">
            <p className="font-bold text-[13px] text-center mb-0.5">Ngân hàng Phát triển</p>
            <p className="text-[11px] text-center">Đề nghị NH (KBNN) thanh toán UNC này</p>
            <p className="text-[11px] text-center">từ tài khoản số {dot(24)}</p>
            <p className="text-[11px] text-center mb-1">Ngày{dot(4)}tháng{dot(4)}năm{dot(6)}</p>
            <div className="flex justify-around">
              <div className="text-center">
                <p className="font-bold text-[12px]">Kế toán</p>
                <p className="text-[10px] italic text-gray-500">(Ký tên)</p>
                <div className="h-14" />
              </div>
              <div className="text-center">
                <p className="font-bold text-[12px]">Kế toán trưởng</p>
                <p className="text-[10px] italic text-gray-500">(Ký, đóng dấu)</p>
                <div className="h-14" />
              </div>
            </div>
          </div>
        </div>

        {/* Signatures row 2 - NH KBNN */}
        <div className="flex mt-6">
          <div className="flex-1">
            <p className="font-bold text-[12px] text-center mb-0.5">NH, (KBNN) A ghi sổ ngày {dot(6)}</p>
            <div className="flex justify-around">
              <div className="text-center">
                <p className="font-bold text-[12px]">Kế toán</p>
                <p className="text-[10px] italic text-gray-500">(Ký tên)</p>
                <div className="h-14" />
              </div>
              <div className="text-center">
                <p className="font-bold text-[12px]">Kế toán trưởng</p>
                <p className="text-[10px] italic text-gray-500">(Ký, đóng dấu)</p>
                <div className="h-14" />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <p className="font-bold text-[12px] text-center mb-0.5">NH, (KBNN) B ghi sổ ngày {dot(6)}</p>
            <div className="flex justify-around">
              <div className="text-center">
                <p className="font-bold text-[12px]">Kế toán</p>
                <p className="text-[10px] italic text-gray-500">(Ký tên)</p>
                <div className="h-14" />
              </div>
              <div className="text-center">
                <p className="font-bold text-[12px]">Kế toán trưởng</p>
                <p className="text-[10px] italic text-gray-500">(Ký, đóng dấu)</p>
                <div className="h-14" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UNCPreview42a;
