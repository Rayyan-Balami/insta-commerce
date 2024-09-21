import * as React from "react";
import { Editor } from "@tiptap/core";
import { Baseline, ChevronDown } from "lucide-react";
import { ToolbarButton } from "../toolbar-button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SectionThree: React.FC<{ editor: Editor }> = ({ editor }) => {
  // Get the color from the editor or use 'inherit' for inherited styles
  const color = editor.getAttributes("textStyle")?.color || ""; // Use empty string to inherit
  const [selectedColor, setSelectedColor] = React.useState(color);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setSelectedColor(newColor);
    editor.chain().setColor(newColor).run();
  };

  // Sync the selected color with editor attributes
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
          <Baseline className="size-4" style={{ color: selectedColor || 'inherit' }} />
          <ChevronDown className="size-3.5" />
        </ToolbarButton>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-full p-2 flex items-center gap-2"
        onCloseAutoFocus={(event) => event.preventDefault()}
      >
        {/* Button to reset color to inherited */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSelectedColor(""); // Set to empty to inherit
            editor.chain().unsetColor().run(); // Clear the color formatting
          }}
          className="text-primary"
        >
          Default
        </Button>
        {/* The Input will display #000000 or any selected color, but not 'inherit' */}
        <Input
          type="color"
          value={selectedColor || "#000000"} // Default to black if no color selected
          onChange={handleColorChange}
          className="w-20 h-9 p-0"
        />
      </PopoverContent>
    </Popover>
  );
};

SectionThree.displayName = "SectionThree";

export default SectionThree;
