import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FileUploadDropzone from "@/components/FileUploadDropzone";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";

export default function ProductMedia({ editingProduct, setEditingProduct }) {
  const form = useFormContext(); // Use form context to get control

  console.log(editingProduct);

  const handleRemoveImage = (index) => {
    setEditingProduct((prev) => {
      const updatedImages = prev.images.filter((_, i) => i !== index);
      const updatedImagePreviews = prev.imagePreviews.filter((_, i) => i !== index);
      console.log("Updated Images:", updatedImages);
      console.log("Updated Image Previews:", updatedImagePreviews);
      return {
        ...prev,
        images: updatedImages,
        imagePreviews: updatedImagePreviews,
      };
    });
  };

  return (
    <Card className="bg-muted/40">
      <CardHeader>
        <CardTitle>Media</CardTitle>
        <CardDescription>Upload product images and video link </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <FileUploadDropzone
                  value={field.value}
                  onValueChange={field.onChange}
                  accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp"] }}
                  maxFiles={8}
                  maxSize={1 * 1024 * 1024} // 1MB
                />
              </FormControl>
              <FormMessage className="font-light" />
            </FormItem>
          )}
          />

        {/* //existing image previews will be displayed here */}
        {editingProduct && editingProduct.imagePreviews && editingProduct.imagePreviews.length > 0 && (
          <>
          <FormLabel>Existing Images</FormLabel>
          <div className="grid gap-3 grid-cols-3">
            {editingProduct.imagePreviews.map((image, index) => (
              <div key={index} className="relative overflow-hidden rounded-md">
                <img
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  className="object-cover rounded-md aspect-square"
                />
                {/* // Add a button to remove the image */}
                <Button
                  type="button"
                  size="sm"
                  className={`absolute p-1 pb-2.5 pl-2.5 bg-red-500 rounded-bl-full top-0 right-0`}
                  onClick={() => handleRemoveImage(index)}
                >
                  <span className="sr-only">remove item {index}</span>
                  <CircleX className="size-4 stroke-destructive-foreground" />
                </Button>
              </div>
            ))}
          </div>
          </>
        )}

        <FormField
          control={form.control}
          name="video"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="https://www.youtube.com/watch?v=video-id"
                  className="input w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-light" />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}