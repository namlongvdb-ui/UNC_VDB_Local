import { useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Form42a from "@/components/Form42a";
import Form42b from "@/components/Form42b";
import { Printer } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("42a");
  const formRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-muted py-6 print:bg-background print:py-0">
      {/* Controls - hidden when printing */}
      <div className="max-w-[220mm] mx-auto mb-4 flex items-center justify-between print:hidden px-4">
        <h2 className="text-lg font-bold text-foreground">
          Ủy nhiệm chi - Ngân hàng Phát triển Việt Nam (VDB)
        </h2>
        <Button onClick={handlePrint} variant="default" size="sm" className="gap-2">
          <Printer className="w-4 h-4" />
          In biểu mẫu
        </Button>
      </div>

      <div className="print:hidden max-w-[220mm] mx-auto mb-4 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="42a">Mẫu 42a - Doanh nghiệp</TabsTrigger>
            <TabsTrigger value="42b">Mẫu 42b - Nội bộ đơn vị</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Forms */}
      <div className={activeTab === "42a" ? "block" : "hidden"}>
        <Form42a ref={formRef} />
      </div>
      <div className={activeTab === "42b" ? "block" : "hidden"}>
        <Form42b />
      </div>
    </div>
  );
};

export default Index;
