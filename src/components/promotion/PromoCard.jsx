import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { promoSchema } from "@/schemas/promoCard";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import NavPromoCard from "@/components/nav/PromoCard";
import { useSelector } from "react-redux";
import { updatePromoCard } from "@/store/promotionSlice";
import promotionService from "@/appwrite/promotion";
import parse from "html-react-parser";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { getENV } from "@/getENV";

export default function PromoCard() {
  const dispatch = useDispatch();
  const card =
  useSelector((state) => state.promotion.promotions.promoCard) || {};

  const form = useForm({
    resolver: zodResolver(promoSchema),
    defaultValues: {
      title: card.title || "",
      description: card.description || "",
      CTA: card.CTA || "",
      URL: card.URL || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const { success, result, message } = await promotionService.updatePromoCard(
        card.$id,
        data,
      );

      if (success) {
        console.log(result, success, message);
        dispatch(updatePromoCard(result));
        localStorage.setItem(
          "promotions_timestamp",
          (Date.now() - parseInt(getENV("CACHE_LIMIT"), 10)).toString()
        );
        toast.success("Promo Card details updated successfully.");
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update Promo Card details.");
    }
  };

  return (
    <div className="grid gap-4 xl:grid-cols-3 xl:gap-8">
      <div className="grid auto-rows-max gap-4 xl:col-span-2 xl:gap-8">
    <Card className="bg-muted/40">
      <CardHeader>
        <CardTitle>Promo Card Details</CardTitle>
        <CardDescription>
          Fill in the details for the Promo Card here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Christmas Sale" {...field} />
                  </FormControl>
                  <FormMessage className="font-light" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <MinimalTiptapEditor
                  value={field.value}
                  onChange={field.onChange}
                  output="html"
                  placeholder="Get 50% off on all items"
                  immediatelyRender={true}
                  editable={true}
                  injectCSS={true}
                  shouldRerenderOnTransaction={false}
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-light" />
            </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="CTA"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CTA</FormLabel>
                  <FormControl>
                    <Input placeholder="Shop Now" {...field} />
                  </FormControl>
                  <FormMessage className="font-light" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="URL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.example.com" {...field} />
                  </FormControl>
                  <FormMessage className="font-light" />
                </FormItem>
              )}
            />
            {/* //a small note to the user  */}
            <FormDescription className="text-xs">
              Note: Both CTA and URL are required together.
            </FormDescription>
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
      </div>
      <div className="grid auto-rows-max gap-4 xl:gap-8">
        <div>
          <div className="pt-4 pb-10 px-6 -mb-2 border border-b-0 h-10 rounded-t-md bg-muted/40 text-center text-sm font-medium">
            Promo Card Preview
          </div>
        <NavPromoCard title={form.watch("title")} description={form.watch("description")} CTA={form.watch("CTA")} URL={form.watch("URL")} />
        </div>
      </div>
    </div>
  );
}
