import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const InputTags = React.forwardRef(
  ({ className, value, onChange, ...props }, ref) => {
    const [pendingDataPoint, setPendingDataPoint] = React.useState("");
    const [activeIndex, setActiveIndex] = React.useState(-1);

    React.useEffect(() => {
      if (pendingDataPoint.includes(",")) {
        const newDataPoints = new Set([
          ...value,
          ...pendingDataPoint.split(",").map((chunk) => chunk.trim()),
        ]);
        onChange(Array.from(newDataPoints));
        setPendingDataPoint("");
      }
    }, [pendingDataPoint, onChange, value]);

    const addPendingDataPoint = () => {
      if (pendingDataPoint) {
        const newDataPoints = new Set([...value, pendingDataPoint]);
        onChange(Array.from(newDataPoints));
        setPendingDataPoint("");
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addPendingDataPoint();
      } else if (
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

    const handleInputFocus = () => {
      setActiveIndex(-1);
    };

    const handleInputChange = (e) => {
      setPendingDataPoint(e.target.value);
      setActiveIndex(-1);
    };

    return (
      <div
        className={cn(
          "has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-neutral-950 has-[:focus-visible]:ring-offset-2 dark:has-[:focus-visible]:ring-neutral-300 min-h-10 flex w-full flex-wrap gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white  disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950",
          className
        )}
      >
        {value.map((item, index) => (
          <Badge
            key={item}
            variant="secondary"
            className={cn(
              activeIndex === index && "ring-2 ring-muted-foreground"
            )}
          >
            {item}
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 h-3 w-3"
              onClick={() => {
                onChange(value.filter((i) => i !== item));
                setActiveIndex((prevIndex) =>
                  prevIndex > 0 ? prevIndex - 1 : 0
                );
              }}
            >
              <XIcon className="w-3" />
            </Button>
          </Badge>
        ))}
        <input
          className="flex-1 outline-none placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
          value={pendingDataPoint}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          {...props}
          ref={ref}
        />
      </div>
    );
  }
);

InputTags.displayName = "InputTags";

export { InputTags };