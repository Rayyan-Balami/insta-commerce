import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs";
import General from "./General";
import Contact from "./Contact";
import Social from "./Social";

function SettingTabs() {
  const settingsTabs = [
    { label: "general", Component: General },
    { label: "contact", Component: Contact },
    { label: "socials", Component: Social },
    { label: "security", Component: General },
  ];

  return (
    <Tabs defaultValue="general" className="space-y-4 lg:space-y-6">
      <TabsList>
        {settingsTabs.map(({ label }) => (
          <TabsTrigger key={label} value={label} className="capitalize">
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {settingsTabs.map(({ label, Component }) => (
        <TabsContent key={label} value={label}>
          <Component />
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default SettingTabs;
