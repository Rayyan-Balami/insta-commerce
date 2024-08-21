"use client";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandItem,
  CommandEmpty,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Command as CommandPrimitive } from "cmdk";
import { XIcon, Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, {
  useCallback,
  useContext,
  useState,
  createContext,
  forwardRef,
} from "react";

const MultiSelectContext = createContext(null);

const useMultiSelect = () => {
  const context = useContext(MultiSelectContext);
  if (!context) {
    throw new Error("useMultiSelect must be used within MultiSelectProvider");
  }
  return context;
};

const MultiSelector = ({
  values: value,
  onValuesChange: onValueChange,
  loop = false,
  className,
  children,
  dir,
  ...props
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const onValueChangeHandler = useCallback(
    (val) => {
      if (value.includes(val)) {
        onValueChange(value.filter((item) => item !== val));
      } else {
        onValueChange([...value, val]);
      }
    },
    [value]
  );

  const handleKeyDown = (e) => {
   if (
      e.key === "Backspace" &&
      pendingDataPoint.length === 0 &&
      value.length > 0
    ) {
      e.preventDefault();
      if (activeIndex !== -1) {
        onChange(value.filter((_, index) => index !== activeIndex));
        setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
      } else {
        onChange(value.slice(0, -1));
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : (prevIndex === 0 ? -1 : value.length - 1)
      );
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveIndex((prevIndex) =>
        prevIndex < value.length - 1 ? prevIndex + 1 : -1
      );
    }
  };

  return (
    <MultiSelectContext.Provider
      value={{
        value,
        onValueChange: onValueChangeHandler,
        open,
        setOpen,
        inputValue,
        setInputValue,
        activeIndex,
        setActiveIndex,
      }}
    >
      <Command
        onKeyDown={handleKeyDown}
        className={cn(
          "overflow-visible bg-transparent flex flex-col h-fit",
          className
        )}
        dir={dir}
        {...props}
      >
        {children}
      </Command>
    </MultiSelectContext.Provider>
  );
};

const MultiSelectorTrigger = forwardRef(
  ({ className, children, ...props }, ref) => {
    const { value, onValueChange, activeIndex } = useMultiSelect();

    const mousePreventDefault = useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    return (
      <div
        ref={ref}
        className={cn(
          "has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-neutral-950 has-[:focus-visible]:ring-offset-2 dark:has-[:focus-visible]:ring-neutral-300 min-h-10 flex items-center w-full flex-wrap gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white  disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950",
          className
        )}
        {...props}
      >
        {value.map((item, index) => (
          <Badge
            key={item}
            className={cn(
              "",
              activeIndex === index && "ring-2 ring-muted-foreground "
            )}
            variant={"secondary"}
          >
            <span className="text-xs">{item}</span>
            <Button
            variant="ghost"
            size="icon"
            className="ml-2 h-3 w-3"
            type="button"
            onMouseDown={mousePreventDefault}
            onClick={() => onValueChange(item)}
          >
            <XIcon className="w-3" />
            <span className="sr-only">Remove {item} option</span>
          </Button>
          </Badge>
        ))}
        {children}
        <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground" />
      </div>
    );
  }
);

MultiSelectorTrigger.displayName = "MultiSelectorTrigger";

const MultiSelectorInput = forwardRef(
  ({ className, ...props }, ref) => {
    const { setOpen, inputValue, setInputValue, activeIndex, setActiveIndex } =
      useMultiSelect();
    return (
      <CommandPrimitive.Input
        {...props}
        ref={ref}
        value={inputValue}
        onValueChange={activeIndex === -1 ? setInputValue : undefined}
        onBlur={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onClick={() => setActiveIndex(-1)}
        className={cn(
          "bg-transparent outline-none placeholder:text-muted-foreground flex-1",
          className,
          activeIndex !== -1 && "caret-transparent"
        )}
      />
    );
  }
);

MultiSelectorInput.displayName = "MultiSelectorInput";

const MultiSelectorContent = forwardRef(
  ({ children }, ref) => {
    const { open } = useMultiSelect();
    return (
      <div ref={ref} className="relative">
        {open && children}
      </div>
    );
  }
);

MultiSelectorContent.displayName = "MultiSelectorContent";

const MultiSelectorList = forwardRef(
  ({ className, children }, ref) => {
    return (
      <CommandList
        ref={ref}
        className={cn(
          "mt-2 p-2 flex flex-col gap-2 rounded-md scrollbar-thin scrollbar-track-transparent transition-colors scrollbar-thumb-muted-foreground dark:scrollbar-thumb-muted scrollbar-thumb-rounded-lg w-full absolute bg-background shadow-md z-10 border border-muted top-0",
          className
        )}
      >
        {children}
        <CommandEmpty>
          <span className="text-muted-foreground">No results found</span>
        </CommandEmpty>
      </CommandList>
    );
  }
);

MultiSelectorList.displayName = "MultiSelectorList";

const MultiSelectorItem = forwardRef(
  ({ className, value, children, ...props }, ref) => {
    const { value: Options, onValueChange, setInputValue } = useMultiSelect();

    const mousePreventDefault = useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    const isIncluded = Options.includes(value);
    return (
      <CommandItem
        ref={ref}
        {...props}
        onSelect={() => {
          onValueChange(value);
          setInputValue("");
        }}
        className={cn(
          "rounded-md cursor-pointer px-2 py-1 transition-colors flex justify-between ",
          className,
          isIncluded && "opacity-50 cursor-default",
          props.disabled && "opacity-50 cursor-not-allowed"
        )}
        onMouseDown={mousePreventDefault}
      >
        {children}
        {isIncluded && <Check className="h-4 w-4" />}
      </CommandItem>
    );
  }
);

MultiSelectorItem.displayName = "MultiSelectorItem";

export {
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem,
};

