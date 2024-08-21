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

export default function ProductMedia() {
  const form = useFormContext(); // Use form context to get control

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
                  accept={{ "image/*": [".jpg", ".jpeg", ".png"] }}
                  maxFiles={8}
                  maxSize={1 * 1024 * 1024} // 1MB
                />
              </FormControl>
              <FormMessage className="font-light" />
            </FormItem>
          )}
        />
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
