import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import FileUploadDropzone from "@/components/FileUploadDropzone";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bannerSchema } from "@/schemas/banner";

export default function Banner() {
  const form = useForm({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      images: [],
    },
  });

  const onSubmit = async (data) => {
    // Simulate asynchronous submission (e.g., API call)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data); // Handle form submission logic here
    //reset the form
    form.reset();
  }

  return (
    <Card className="bg-muted/40 max-w-2xl">
      <CardHeader>
        <CardTitle>Banner Images</CardTitle>
        <CardDescription>Upload images for the Banner here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
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
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2 className="size-4 mr-2 animate-spin" />
              )}
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
