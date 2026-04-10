import vdbLogo from "@/assets/vdb-logo.jpg";
import type { UNCFormData } from "./InputPanel";

interface UNCPreview42aProps {
  data: UNCFormData;
}

const Row = ({ label, value, noBorder }: { label: string; value: string; noBorder?: boolean }) => (
  <div className={`${noBorder ? '' : 'border-b border-black'} px-2 py-[6px] flex items-baseline`}>
    <span className="whitespace-nowrap">{label}</span>
    <span className="flex-1 overflow-hidden" style={{ 
      borderBottom: value ? 'none' : '1px dotted black',
      marginLeft: '2px',
      minHeight: '14px',
      lineHeight: '14px'
    }}>
      {value && <span className="font-medium">{value}</span>}
    </span>
  </div>
);

const UNCPreview42a = ({ data }: UNCPreview42aProps) => {
  const dots = (len: number) => ".".repeat(len);

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
          <div className="w-[80px] flex items-center justify-center">
            <img src={vdbLogo} alt="VDB" className="w-[65px] h-[65px] object-contain" />
          </div>
          <div className="flex-1 text-center pt-0.5">
            <h1 className="text-[18px] font-bold tracking-[3px]">ỦY NHIỆM CHI</h1>
            <p className="text-[13px] mt-0.5">Chuyển khoản, chuyển tiền thư, điện</p>
            <p className="text-[13px] mt-1">
              Lập ngày: <span className="inline-block w-[40px] border-b border-dotted border-black text-center">{data.ngay}</span> tháng <span className="inline-block w-[40px] border-b border-dotted border-black text-center">{data.thang}</span> năm <span className="inline-block w-[50px] border-b border-dotted border-black text-center">{data.nam}</span>
            </p>
          </div>
          <div className="text-[13px] pt-1 w-[130px] text-right">
            Số UNC: <span className="inline-block w-[70px] border-b border-dotted border-black text-center">{data.soUNC}</span>
          </div>
        </div>

        {/* Main body */}
        <div className="flex mt-2">
          {/* Left fields block */}
          <div className="flex-1">
            <Row label="Đơn vị trả tiền:" value={data.donViTraTien} noBorder />
            <Row label="Số tài khoản:" value={data.soTaiKhoanTra} noBorder />
            <Row label="Tại NHPT tỉnh, TP:" value={data.taiNHPT} />
            <Row label="Đơn vị nhận tiền:" value={data.donViNhanTien} noBorder />
            <Row label="Số tài khoản:" value={data.soTaiKhoanNhan} noBorder />
            {/* Special row with 2 fields */}
            <div className="border-b border-black px-2 py-[6px] flex items-baseline">
              <span className="whitespace-nowrap">Tại NH, KB:</span>
              <span className="flex-1 overflow-hidden" style={{ 
                borderBottom: data.taiNHKB ? 'none' : '1px dotted black',
                marginLeft: '2px', minHeight: '14px'
              }}>
                {data.taiNHKB && <span className="font-medium">{data.taiNHKB}</span>}
              </span>
              <span className="whitespace-nowrap mx-1">,tỉnh, TP:</span>
              <span className="flex-1 overflow-hidden" style={{ 
                borderBottom: data.tinhTP ? 'none' : '1px dotted black',
                marginLeft: '2px', minHeight: '14px'
              }}>
                {data.tinhTP && <span className="font-medium">{data.tinhTP}</span>}
              </span>
            </div>
            <Row label="Số tiền bằng chữ:" value={data.soTienBangChu} />
            {/* Last row */}
            <div className="px-2 py-[6px] flex items-baseline">
              <span className="whitespace-nowrap">Nội dung thanh toán:</span>
              <span className="flex-1 overflow-hidden" style={{ 
                borderBottom: data.noiDungThanhToan ? 'none' : '1px dotted black',
                marginLeft: '2px', minHeight: '14px'
              }}>
                {data.noiDungThanhToan && <span className="font-medium">{data.noiDungThanhToan}</span>}
              </span>
            </div>
          </div>

          {/* Right panel */}
          <div className="w-[155px] border border-black">
            <div className="border-b border-black px-2 py-[6px]">
              <p className="font-bold text-center text-[12px]">NHPT GHI</p>
              <p className="text-center text-[11px] mt-1">
                {dots(5)}/{dots(5)}/{dots(7)}
              </p>
              <p className="text-[11px] mt-1.5">Nợ:{dots(20)}</p>
              <p className="text-[11px] mt-1">Có:{dots(20)}</p>
            </div>
            <div className="border-b border-black px-2 py-[6px]">
              <p className="font-bold text-center text-[12px]">NH (KBNN) GHI:</p>
              <p className="text-[11px] mt-1.5">Nợ:{dots(20)}</p>
              <p className="text-[11px] mt-1">Có:{dots(20)}</p>
            </div>
            <div className="px-2 py-[6px]">
              <p className="font-bold text-center text-[12px]">SỐ TIỀN BẰNG SỐ</p>
              <p className="text-center text-[14px] font-bold mt-1 min-h-[22px]">
                {data.soTienBangSo || <span>{dots(18)}</span>}
              </p>
            </div>
          </div>
        </div>

        {/* Signature row 1 */}
        <div className="flex border-t border-black">
          <div className="flex-1 border-r border-black py-2 px-2">
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
          <div className="flex-1 py-2 px-2">
            <p className="font-bold text-[12px] text-center">Ngân hàng Phát triển</p>
            <p className="text-[10px] text-center">Đề nghị NH (KBNN) thanh toán UNC này</p>
            <p className="text-[10px] text-center">từ tài khoản số {dots(28)}</p>
            <p className="text-[10px] text-center">
              Ngày{dots(6)}tháng{dots(5)} năm {dots(8)}
            </p>
            <div className="flex justify-around mt-1">
              <div className="text-center">
                <p className="font-bold text-[11px]">Kế toán trưởng</p>
                <p className="text-[9px] italic text-gray-500">(Ký tên)</p>
                <div className="h-[40px]" />
              </div>
              <div className="text-center">
                <p className="font-bold text-[11px]">Chủ tài khoản</p>
                <p className="text-[9px] italic text-gray-500">(Ký, đóng dấu)</p>
                <div className="h-[40px]" />
              </div>
            </div>
          </div>
        </div>

        {/* NH KBNN A + B */}
        <div className="flex mt-8">
          <div className="flex-1">
            <p className="font-bold text-[11px] text-center">NH, (KBNN) A ghi sổ ngày {dots(8)}</p>
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
          <div className="flex-1">
            <p className="font-bold text-[11px] text-center">NH, (KBNN) B ghi sổ ngày {dots(8)}</p>
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
    </div>
  );
};

export default UNCPreview42a;
