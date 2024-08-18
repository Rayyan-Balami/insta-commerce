import Search from "./Search";
import { ModeToggle } from "./mode-toggle";
import UserMenu from "./UserMenu";
import MobileNav from "../nav/MobileNav";
import Logo from "../nav/Logo";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
      <div className=" md:hidden">
      <Logo />
      </div>
      <div className="ml-auto">
        <Search />
        <Button variant="ghost" size="icon" className="rounded-full" asChild>
          <Link to="/cart">
            <ShoppingCart className="size-5" />
          </Link>
        </Button>
        <ModeToggle />
        <UserMenu />
        <MobileNav />
      </div>
    </header>
  );
}

export default Header;
