import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Combobox = React.forwardRef(({ list, value, onChange, placeholder = "Select Item", className, multiple = false }, ref) => {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef(null);
  const [triggerWidth, setTriggerWidth] = React.useState(0);

  React.useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [open]);

  const handleSelect = (selectedValue) => {
    if (multiple) {
      if (value.includes(selectedValue)) {
        onChange(value.filter((v) => v !== selectedValue));
      } else {
        onChange([...value, selectedValue]);
      }
    } else {
      onChange(selectedValue === value ? "" : selectedValue);
    }
    if (!multiple) setOpen(false);
  };

  const displayValue = () => {
    if (multiple) {
      return value.length > 0
        ? `${value.length} selected`
        : placeholder;
    }
    return value
      ? list.find((item) => item.value === value)?.label
      : placeholder;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between flex font-normal hover:bg-popover",
            className
          )}
          onClick={() => setOpen(!open)}
        >
          {displayValue()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" style={{ minWidth: triggerWidth}}>
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {list.map((item) => (
                <CommandItem
                  value={item.label}
                  key={item.value}
                  onSelect={() => handleSelect(item.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      multiple ? (value.includes(item.value) ? "opacity-100" : "opacity-0") : (item.value === value ? "opacity-100" : "opacity-0")
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

export { Combobox };