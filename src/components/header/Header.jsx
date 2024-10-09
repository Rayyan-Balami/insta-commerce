import Search from "./Search";
import MobileNav from "../nav/MobileNav";
import Logo from "../nav/Logo";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";
import LoginAndMenu from "./LoginAndMenu";

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
      <div className=" md:hidden">
        <Logo />
      </div>
      <div className="ml-auto flex items-center gap-1 sm:gap-2 md:gap-4">
        <Search />
        <Button variant="ghost" size="icon" className="rounded-full md:bg-secondary md:text-secondary-foreground md:hover:bg-secondary/80 md:px-3  md:justify-start md:w-fit md:gap-2" asChild>
          <Link to="/cart">
            <ShoppingBag className="size-5 shrink-0" />
            <span className="max-md:sr-only">Cart</span>
          </Link>
        </Button>
        <LoginAndMenu />
        <MobileNav />
      </div>
    </header>
  );
}

export default Header;
