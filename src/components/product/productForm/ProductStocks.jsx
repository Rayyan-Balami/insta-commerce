import {PlusCircle, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";

const sizes = ["s", "m", "l", "xl", "xxl"]; // Define your sizes here

export default function ProductStocks() {
  const form = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "skus",
  });

  const handleAddSKU = (e) => {
    e.preventDefault();
    append({ sku: "", price: "", stock: "", size: [] }); // Initialize size as an empty array
  };

  return (
    <Card className="bg-muted/40 overflow-auto">
      <CardHeader>
        <CardTitle>Stock</CardTitle>
        <CardDescription>
          Manage the product's SKUs and their respective details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">SKU</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Size</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((item, index) => {
              // Access the errors for the current index
              const { sku, stock, price, size } = form.formState.errors.skus?.[index] || {};

              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`skus.${index}.sku`}
                      render={({ field }) => (
                          <FormControl>
                            <Input
                              placeholder="SKU"
                              {...field}
                              className={sku ? "border-red-500" : ""}
                            />
                          </FormControl>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`skus.${index}.stock`}
                      render={({ field }) => (
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Stock"
                            {...field}
                            className={stock ? "border-red-500" : ""}
                          />
                        </FormControl>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`skus.${index}.price`}
                      render={({ field }) => (
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Price"
                            {...field}
                            className={price ? "border-red-500" : ""}
                          />
                        </FormControl>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`skus.${index}.size`}
                      render={({ field }) => (
                        <FormControl>
                          <MultiSelector
                            values={field.value || []}
                            onValuesChange={(sizes) => field.onChange(sizes)}
                          >
                            <MultiSelectorTrigger className={`uppercase ${size ? "border-red-500" : ""}`}>
                              <MultiSelectorInput placeholder="Select sizes" />
                            </MultiSelectorTrigger>
                            <MultiSelectorContent>
                              <MultiSelectorList>
                                {sizes.map((size) => (
                                  <MultiSelectorItem key={size} value={size} className="uppercase">
                                    {size}
                                  </MultiSelectorItem>
                                ))}
                              </MultiSelectorList>
                            </MultiSelectorContent>
                          </MultiSelector>
                        </FormControl>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" onClick={() => remove(index)}>
                      <Trash className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="border-t pt-6 grid place-items-center">
        <Button size="sm" variant="ghost" className="gap-1" onClick={(e) => handleAddSKU(e)}>
          <PlusCircle className="h-3.5 w-3.5" />
          Add Variant
        </Button>
      </CardFooter>
    </Card>
  );
}


