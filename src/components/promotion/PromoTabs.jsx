import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs";
import Banner from "./Banner";
import PromoCard from "./PromoCard";
import Code from "./Code";
import Discount from "./Discount";

function PromoTabs() {
  const PromoTabs = [
    { label: "banner", Component: Banner },
    { label: "card", Component: PromoCard },
    { label: "discount", Component: Discount },
    { label: "code", Component: Code },
  ];

  return (
    <Tabs defaultValue="banner" className="space-y-4 lg:space-y-6">
      <TabsList>
        {PromoTabs.map(({ label }) => (
          <TabsTrigger key={label} value={label} className="capitalize">
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {PromoTabs.map(({ label, Component }) => (
        <TabsContent key={label} value={label} className="space-y-4 lg:space-y-6">
          <Component />
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default PromoTabs;
