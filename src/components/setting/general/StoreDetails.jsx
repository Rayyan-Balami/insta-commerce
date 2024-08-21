import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputTags } from "@/components/ui/input-tags";
import { useFormContext } from "react-hook-form";

export default function StoreDetails() {
  const form = useFormContext();

  return (
    <Card className="bg-muted/40">
      <CardHeader>
        <CardTitle>Store Details</CardTitle>
        <CardDescription>
          What's your store name and description?
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {/* store name */}
        <FormField
          control={form.control}
          name="storeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Insta Business" {...field} />
              </FormControl>
              <FormMessage className="font-light" />
            </FormItem>
          )}
        />
        {/* store description */}
        <FormField
          control={form.control}
          name="storeDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <MinimalTiptapEditor
                  value={field.value}
                  onChange={(value) => form.setValue("storeDescription", value)}
                  output="html"
                  placeholder="A short description of your store"
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
        {/* store promises */}
        <FormField
          control={form.control}
          name="storePromises"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Promises (optional)</FormLabel>
              <FormControl>
                {/* //InputTags is a custom component that takes in a value and onChange function */}
                <InputTags
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter values, comma separated..."
                />
              </FormControl>
              <FormMessage className="font-light" />
            </FormItem>
          )}
        />
        <FormDescription className="text-xs">
          eg: 1 year Warranty, 100% Genuine, Easy Returns, Express Delivery
        </FormDescription>
      </CardContent>
    </Card>
  );
}
