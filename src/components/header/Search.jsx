import * as React from "react";
import { Search as SearchIcon } from "lucide-react";

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
  }
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="w-5 h-5" />
        <span className="sr-only">Toggle user menu</span>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen} className="m-4">
        <CommandInput placeholder="Search products..." />
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
