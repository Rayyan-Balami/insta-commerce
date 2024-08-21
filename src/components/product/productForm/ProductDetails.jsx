import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form"

export default function ProductDetails() {

  const form = useFormContext()

  return (
    <Card className="bg-muted/40">
      <CardHeader>
        <CardTitle>Details</CardTitle>
        <CardDescription>
          Basic information about the product
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name </FormLabel>
                  <FormControl>
                    <Input placeholder="Wollen T-shirt" {...field} />
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
      </CardContent>
    </Card>
  )
}
