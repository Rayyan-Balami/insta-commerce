import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs";
import Banner from "./Banner";
import PromoCard from "./PromoCard";
import Code from "./Code";

function PromoTabs() {
  const PromoTabs = [
    { label: "banner", Component: Banner },
    { label: "card", Component: PromoCard },
    { label: "discount", Component: PromoCard },
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
        <TabsContent key={label} value={label}>
          <Component />
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default PromoTabs;
