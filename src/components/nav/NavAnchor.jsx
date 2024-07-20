import React from "react";
import { Badge } from "@/components/ui/badge";
import { navMenuStyle } from "./navMenus";
import { NavLink } from "react-router-dom";

function NavAnchor({ menu }) {
  return (
    <NavLink
      key={menu.name}
      to={menu.to}
      className={({ isActive, isPending }) =>
        `max-md:mx-[-0.65rem] flex items-center gap-3 rounded-lg px-3 py-2 ${isActive ? navMenuStyle.active : navMenuStyle.nonActive} transition-all hover:text-primary`
      }
    >
      {React.createElement(menu.icon, { className: "h-[1.15rem] w-[1.15rem]" })}
      {menu.name}
      {menu.badge && (
        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          X
        </Badge>
      )}
    </NavLink>
  );
}

export default NavAnchor;
