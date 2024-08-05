import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FileUploadDropzone from "@/components/FileUploadDropzone";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

export default function ProductImages() {
  const form = useFormContext(); // Use form context to get control

  return (
    <Card className="bg-muted/40">
      <CardHeader>
        <CardTitle>Product Images</CardTitle>
        <CardDescription>
          Upload images for the product here.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                  accept={{ "image/*": [".jpg", ".jpeg", ".png"] }}
                  maxFiles={8}
                  maxSize={1 * 1024 * 1024} // 1MB
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
