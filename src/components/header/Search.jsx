import * as React from "react";
import { Command, Search as SearchIcon } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

export default function Search() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const form = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative rounded-full md:border md:border-input md:py-2  md:bg-secondary md:text-secondary-foreground md:hover:bg-secondary/80 md:px-3 md:pr-20  md:w-fit md:justify-start md:gap-2"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="w-5 h-5" />
        <span className="max-md:sr-only">Search Store</span>
        <kbd
          className="hidden md:flex items-center gap-1 pointer-events-none absolute right-2.5 top-1/2 transform -translate-y-1/2 h-5 select-none rounded border bg-muted px-1.5 font-medium text-xs"
        >
          <Command className="size-2.5" />
          <span>K</span>
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen} className="m-4">
        <CommandInput placeholder="Search Store"/>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
