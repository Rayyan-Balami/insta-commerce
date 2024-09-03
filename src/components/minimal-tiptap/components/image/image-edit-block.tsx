import type { Editor } from "@tiptap/core";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ImageEditBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  editor: Editor;
  close: () => void;
}

const ImageEditBlock = ({
  editor,
  className,
  close,
  ...props
}: ImageEditBlockProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [link, setLink] = useState<string>("");

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleLink = () => {
    editor.chain().focus().setImage({ src: link }).run();
    close();
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      editor.chain().setImage({ src }).focus().run();
    };

    reader.readAsDataURL(files[0]);

    close();
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    handleLink();
  };

  return (
    <div className={cn("grid grid-cols-3 gap-4", className)} {...props}>
      <div className="space-y-2 col-span-2">
        <Label>Attach an image link</Label>
        <Input
          type="url"
          required
          placeholder="https://example.com"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <Button onClick={handleSubmit} className="mt-auto">Add</Button>
      <Button onClick={handleClick} className="col-span-3">
        Upload From Device
      </Button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        multiple
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
};

export { ImageEditBlock };