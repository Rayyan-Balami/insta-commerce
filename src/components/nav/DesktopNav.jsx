import React from "react";

import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";

import { navMenus } from "./navMenus";
import NavAnchor from "./NavAnchor";
import Logo from "./Logo";
import PromoCard from "./PromoCard";
import Categories from "./Categories";
import SizeToggles from "./SizeToggles";
import PriceRange from "./PriceRange";

function DesktopNav() {
  return (
    <div className="fixed inset-y-0 left-0 z-10 md:w-64 lg:w-72 hidden border-r bg-muted/40 md:block">
      <div className="flex max-h-screen flex-col gap-4">
        <div className="flex-shrink-0 flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Logo />
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1 overflow-y-scroll space-y-4 divide-y text-base font-medium">
          <nav className="space-y-2 px-2 lg:px-4">
            {navMenus.map((menu) => (
              <NavAnchor key={menu.name} menu={menu} />
            ))}
          </nav>
          <Categories className="pt-4 space-y-2 px-2 lg:px-4"/>
          <SizeToggles className="pt-4 space-y-2 px-2 lg:px-4"/>
          <PriceRange className="pt-4 space-y-2 px-2 lg:px-4"/>
        </div>
       <PromoCard />
      </div>
    </div>
  );
}

export default DesktopNav;
