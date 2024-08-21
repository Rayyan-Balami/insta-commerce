import { PlusCircle, Trash } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const sizes = ["s", "m", "l", "xl", "xxl"]; // Define your sizes here

export default function ProductSkus() {
  const form = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "skus",
  });

  const handleAddSKU = (e) => {
    e.preventDefault();
    append({ color: "", price: "", stock: "", size: [] });
  };

  return (
    <Card className="bg-muted/40 overflow-auto">
      <CardHeader>
        <CardTitle>Stock</CardTitle>
        <CardDescription>
          Manage the product's SKUs and their respective details.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Color</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((item, index) => {
              // Access the errors for the current index
              const { color, stock, price, size } =
                form.formState.errors.skus?.[index] || {};

              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`skus.${index}.color`}
                      render={({ field }) => (
                        <FormControl>
                          <Input
                            placeholder="color"
                            {...field}
                            className={`min-w-20 ${color ? "border-red-500" : ""}`}
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
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                className={`font-normal ${
                                  size ? "border-red-500" : ""
                                }`}
                              >
                                {field.value?.length ? `${field.value.length} Selected` : "Size"}
                                <ChevronDown className="ml-2 size-3.5 text-muted-foreground" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {sizes.map((size) => (
                                <DropdownMenuCheckboxItem
                                  key={size}
                                  className="uppercase"
                                  checked={field.value?.includes(size)}
                                  onCheckedChange={(value) => {
                                    if (value) {
                                      field.onChange([...field.value, size]);
                                    } else {
                                      field.onChange(
                                        field.value.filter((v) => v !== size)
                                      );
                                    }
                                  }}
                                >
                                  {size}
                                </DropdownMenuCheckboxItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
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
                            className={`min-w-20 ${stock ? "border-red-500" : ""}`}
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
                            className={`min-w-20 ${price ? "border-red-500" : ""}`}
                          />
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
        <Button
          size="sm"
          variant="ghost"
          className="gap-1"
          onClick={(e) => handleAddSKU(e)}
        >
          <PlusCircle className="h-3.5 w-3.5" />
          Add Variant
        </Button>
      </CardFooter>
    </Card>
  );
}
