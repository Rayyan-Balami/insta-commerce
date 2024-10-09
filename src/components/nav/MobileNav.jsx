import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { navMenus } from "./navMenus";
import NavAnchor from "./NavAnchor";
import Logo from "./Logo";
import Categories from "./Categories";
import SizeToggles from "./SizeToggles";
import PriceRange from "./PriceRange";
import { useSelector } from "react-redux";
import PromoCardAndMenu from "./PromoCardAndMenu";

function MobileNav() {
  const user = useSelector((state) => state.auth.user);

  const filteredNavMenus = navMenus.filter((menu) => {
    if (menu.auth && !user) return false;
    return true;
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col gap-4 p-0"
        aria-describedby={undefined}
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <div className="flex-shrink-0 flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Logo />
        </div>
        <div className=" px-2 lg:px-4 flex-1 overflow-y-scroll space-y-4 divide-y text-base font-medium">
          <nav className="space-y-2">
            {filteredNavMenus.map((menu) => (
              <NavAnchor key={menu.name} menu={menu} />
            ))}
          </nav>
          <Categories className="pt-4 space-y-2" />
          <SizeToggles className="pt-4 space-y-2" />
          <PriceRange className="pt-4 space-y-2" />
        </div>
        <PromoCardAndMenu />
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
