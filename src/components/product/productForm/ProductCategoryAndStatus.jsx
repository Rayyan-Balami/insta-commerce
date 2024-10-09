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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "react-router-dom";

export default function ProductCategoryAndStatus() {
  const { id } = useParams() || null;
  console.log("id", id);
  const form = useFormContext();
  
  const items = [
    { value: "clothing", label: "Clothing" },
    { value: "electronics", label: "Electronics" },
    { value: "accessories", label: "Accessories" },
  ];

  return (
    <Card className="bg-muted/40">
      <CardHeader>
        <CardTitle>Category & Status</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Combobox list={items} value={field.value} onChange={field.onChange} placeholder="Select Category"/>
              </FormControl>
              <FormMessage className="font-light"/>
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  {/* if new product, show draft , if editing show archived */}
                  {id ? <SelectItem value="archived">Archived</SelectItem> : <SelectItem value="draft">Draft</SelectItem>}
                </SelectContent>
              </Select>
              <FormMessage className="font-light" />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
