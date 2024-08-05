import {
  FileUploader,
  FileInput,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const FileUploadDropzone = ({
  value,
  onValueChange,
  accept,
  maxFiles,
  maxSize,
  multiple = true,
}) => {
  const dropzoneOptions = {
    accept,
    multiple,
    maxFiles,
    maxSize,
  };

  return (
    <FileUploader
      value={value}
      onValueChange={onValueChange}
      dropzoneOptions={dropzoneOptions}
      orientation="horizontal"
    >
      <FileInput>
        <div className="p-4 grid place-items-center gap-3 w-full rounded-md text-sm border-2 border-dashed cursor-pointer transition-colors hover:border-primary text-muted-foreground hover:text-primary">
          <Upload className="size-5" />
          <span className="block">Drag and drop files here</span>
          <span className="block">or</span>
          <Button type="button" variant="ghost" className="text-primary">
            Choose files
          </Button>
        </div>
      </FileInput>
      <FileUploaderContent className="mt-4 grid grid-cols-3 gap-3">
        {value?.map((file, index) => (
          <FileUploaderItem
            key={index}
            index={index}
            className="h-full w-full aspect-square object-cover object-center p-0 rounded-md overflow-hidden"
            aria-roledescription={`file ${index + 1} containing ${file.name}`}
          >
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="w-full h-full object-cover"
            />
          </FileUploaderItem>
        ))}
      </FileUploaderContent>
    </FileUploader>
  );
};

export default FileUploadDropzone;
