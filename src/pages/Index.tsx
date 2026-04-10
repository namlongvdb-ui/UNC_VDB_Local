import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import InputPanel, { type UNCFormData } from "@/components/InputPanel";
import UNCPreview42a from "@/components/UNCPreview42a";
import UNCPreview42b from "@/components/UNCPreview42b";
import { Printer } from "lucide-react";

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

const Index = () => {
  const [activeTab, setActiveTab] = useState("42a");
  const [data, setData] = useState<UNCFormData>(initialData);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-muted print:bg-white print:p-0">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-6 py-3 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold">Ủy nhiệm chi - VDB</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-primary-foreground/10">
              <TabsTrigger value="42a" className="text-primary-foreground/70 data-[state=active]:text-primary data-[state=active]:bg-primary-foreground">
                Mẫu 42a - Doanh nghiệp
              </TabsTrigger>
              <TabsTrigger value="42b" className="text-primary-foreground/70 data-[state=active]:text-primary data-[state=active]:bg-primary-foreground">
                Mẫu 42b - Nội bộ
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Button onClick={handlePrint} variant="secondary" size="sm" className="gap-2">
          <Printer className="w-4 h-4" />
          In biểu mẫu
        </Button>
      </header>

      {/* Split layout */}
      <div className="flex print:block">
        {/* Left: Input */}
        <div className="w-[380px] min-w-[380px] h-[calc(100vh-52px)] overflow-y-auto border-r border-border bg-background p-5 print:hidden">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Nhập thông tin
          </h2>
          <InputPanel data={data} onChange={setData} />
        </div>

        {/* Right: Preview */}
        <div className="flex-1 h-[calc(100vh-52px)] overflow-auto bg-muted/50 print:p-0 print:h-auto print:overflow-visible print:bg-white">
          <div className="print:hidden text-center py-3">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Xem trước biểu mẫu — {activeTab === "42a" ? "C42a-NHPT (Doanh nghiệp)" : "C42b-NHPT (Nội bộ đơn vị)"}
            </span>
          </div>
          <div className="flex justify-center pb-8 print:pb-0">
            <div className="origin-top" style={{ transform: "scale(0.75)" }}>
              {activeTab === "42a" ? (
                <UNCPreview42a data={data} />
              ) : (
                <UNCPreview42b data={data} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
