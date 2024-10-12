import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
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
import promotionService from "@/appwrite/promotion";
import { toast } from "sonner";
import BucketService from "@/appwrite/bucket";
import { getENV } from "@/getENV";
import { useSelector } from "react-redux";
import { Fullscreen } from "lucide-react";
import { useDispatch } from "react-redux";
import { addBanner,} from "@/store/promotionSlice";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function BannerForm() {
  const dispatch = useDispatch();

  const banners =
    useSelector((state) => state.promotion.promotions.banners) || [];

  const form = useForm({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      images: [],
    },
  });
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const { success, result, message } = await promotionService.addBanners(
        data
      );

      if (success) {
        console.log(result, success, message);

        // Set promotions_time in local storage to force a re-fetch of promotions
        localStorage.setItem(
          "promotions_timestamp",
          (Date.now() - parseInt(getENV("CACHE_LIMIT"), 10)).toString()
        );

        const previewResponse = await BucketService.getFilePreviews(
          getENV("BANNERS_BUCKET_ID"),
          result.map((banner) => banner.$id)
        );

        if (previewResponse.success) {
          const bannerPreviews = result.map((banner, index) => ({
            ...banner,
            preview: previewResponse.previews[index],
          }));

          dispatch(addBanner(bannerPreviews));
          toast.success("Banners added successfully");
          form.reset();
        } else {
          console.log(previewResponse);
          toast.error(previewResponse.message);
        }
      } else {
        console.log(result, success, message);
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add banners");
    }
  };

  return (
    <>
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
                disabled={form.formState.isSubmitting || banners.length >= 8}
              >
                {form.formState.isSubmitting && (
                  <Loader className="size-4 mr-2 animate-spin" />
                )}
                {banners.length >= 8 ? "Max images reached" : "Upload Images"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Alert>
        <Fullscreen className="h-4 w-4" />
        <AlertTitle>Banner Images</AlertTitle>
        <AlertDescription className="mt-2">
          Aspect Ratio: 2.76:1 (1920x695)
        </AlertDescription>
        <AlertDescription className="mt-2">
          Max: 8 images (1MB each)
        </AlertDescription>
        <AlertDescription className="mt-2">
          Current: {banners.length} images
        </AlertDescription>
      </Alert>
    </>
  );
}
