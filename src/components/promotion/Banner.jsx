import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import promotionService from "@/appwrite/promotion";
import { toast } from "sonner";
import BucketService from "@/appwrite/bucket";
import { getENV } from "@/getENV";
import { useSelector } from "react-redux";
import { Trash } from "lucide-react";
import { Badge } from "../ui/badge";
import { useDispatch } from "react-redux";
import { addBanner, deleteBanner } from "@/store/promotionSlice";
import AlertDialog from "@/components/ui/alert-dialog";

export default function Banner() {
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
          toast.error(previewResponse.message);
        }
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Failed to add banners");
    }
  };

  const removeBanner = async (id) => {
    try {
      const { success, message } = await promotionService.deleteBanner(id);

      if (!success) {
        throw new Error(message);
      }

      // Set promotions_time in local storage to force a re-fetch of promotions
      localStorage.setItem(
        "promotions_timestamp",
        (Date.now() - parseInt(getENV("CACHE_LIMIT"), 10)).toString()
      );

      dispatch(deleteBanner(id));
      toast.success("Banner deleted successfully");
    } catch (error) {
      toast.error("Failed to delete banner");
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
                  <Loader2 className="size-4 mr-2 animate-spin" />
                )}
                {banners.length >= 8 ? "Max images reached" : "Upload Images"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex items-center flex-wrap gap-2">
          <Badge variant="outline">
            Prefered aspect-ratio: 2.76:1 (1920x695)
          </Badge>
          <Badge variant="outline">Max: 8 images (1MB each)</Badge>
          <Badge variant="outline">Current: {banners.length} images</Badge>
        </CardFooter>
      </Card>
      <div className="grid gap-4 grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4 h-fit">
        {banners.map((banner, index) => (
          <div
            className="relative rounded-md overflow-hidden ounded-lg border bg-muted/40 text-card-foreground shadow-sm"
            key={index}
          >
            <div className="p-1 text-xs font-medium flex items-center gap-2">
              <Badge variant="outline" className="rounded-md shadow-sm">
                {banner.mimeType.split("/")[1]}
              </Badge>
              <Badge variant="outline" className="rounded-md shadow-sm">
                {(banner.sizeOriginal / 1024 / 1024).toFixed(2)} MB
              </Badge>
              <AlertDialog
                title="Remove Banner"
                description="This action will remove the banner. Are you sure you want to proceed?"
                size="sm"
                variant="destructive"
                acceptLabel="Delete"
                className="px-2.5 py-0.5 h-auto shadow-sm ml-auto"
                onAccept={() => removeBanner(banner.$id)}
                triggerLabel={<Trash className="size-4" />}
              />
            </div>
            <div className="aspect-[2.76/1] ">
              <img
                src={banner.preview}
                alt="Banner Image"
                className="object-cover object-center w-full h-full"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
