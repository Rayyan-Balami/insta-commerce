import { MonitorSmartphone, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "../contexts/theme";
import { Badge } from "./ui/badge";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
   <Badge variant="secondary" className="p-0">
        <span className="sr-only">Toggle theme</span>
        <Button
          variant={theme === "light" ? "outline" : "ghost"}
          size="icon"
          className={`rounded-full ${theme === "light" ? "" : "text-muted-foreground"} hover:text-primary`}
          onClick={() => setTheme("light")}
        >
          <Sun className="size-5" />
        </Button>
        <Button
          variant={theme === "dark" ? "outline" : "ghost"}
          size="icon"
          className={`rounded-full ${theme === "dark" ? "" : "text-muted-foreground"} hover:text-primary`}
          onClick={() => setTheme("dark")}
        >
          <Moon className="size-5" />
        </Button>
        <Button
          variant={theme === "system" ? "outline" : "ghost"}
          size="icon"
          className={`rounded-full ${theme === "system" ? "" : "text-muted-foreground"} hover:text-primary`}
          onClick={() => setTheme("system")}
        >
          <MonitorSmartphone className="size-5" />
        </Button>
      </Badge>
  );
}
