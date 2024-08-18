import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
      <CardContent>
        <div className="grid gap-6">
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
                  <FormLabel>Description </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Wollen T-shirt is made with love" {...field} />
                  </FormControl>
                  <FormMessage className="font-light" />
                </FormItem>
              )}
            />
        </div>
      </CardContent>
    </Card>
  )
}
