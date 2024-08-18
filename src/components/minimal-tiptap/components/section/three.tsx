import * as React from "react";
import { Editor } from "@tiptap/core";
import { Baseline, ChevronDown } from "lucide-react";
import { ToolbarButton } from "../toolbar-button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SectionThree: React.FC<{ editor: Editor }> = ({ editor }) => {
  const color = editor.getAttributes("textStyle")?.color || "hsl(var(--primary)";
  const [selectedColor, setSelectedColor] = React.useState(color);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setSelectedColor(newColor);
    editor.chain().setColor(newColor).run();
  };

  React.useEffect(() => {
    setSelectedColor(color);
  }, [color]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ToolbarButton
          tooltip="Text color"
          aria-label="Text color"
          className="w-12"
        >
          <Baseline className="size-4" style={{ color: selectedColor }} />
          <ChevronDown className="size-3.5" />
        </ToolbarButton>
      </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-full p-2 flex items-center gap-2"
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          {/* //default color setter */}
          <Button
          variant="outline"
          size="sm"
            onClick={() => {
              setSelectedColor("hsl(var(--foreground))");
              editor.chain().setColor("hsl(var(--primary)").run();
            }}
          className="text-primary"
          >
            Default
          </Button>
          <Input
            type="color"
            value={selectedColor}
            onChange={handleColorChange}
            className="w-20 h-9 p-0 "
          />
          
        </PopoverContent>
    </Popover>
  );
};

SectionThree.displayName = "SectionThree";

export default SectionThree;
