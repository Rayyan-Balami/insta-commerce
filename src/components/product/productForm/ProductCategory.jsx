import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox } from "@/components/ui/Combobox";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

export default function ProductCategory() {
  const form = useFormContext();
  
  const items = [
    { value: "clothing", label: "Clothing" },
    { value: "electronics", label: "Electronics" },
    { value: "accessories", label: "Accessories" },
  ];

  return (
    <Card className="bg-muted/40">
      <CardHeader>
        <CardTitle>Product Category</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Combobox list={items} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage className="font-light"/>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
