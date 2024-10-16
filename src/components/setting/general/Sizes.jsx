import React from "react";
import { useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Combobox } from "@/components/ui/combobox";
import { sizes } from "@/schemas/general";

function Sizes() {
  const form = useFormContext();
  return (
    <Card className="bg-muted/40">
      <CardHeader>
        <CardTitle>Sizes</CardTitle>
        <CardDescription>Choose the sizes of your products.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {/* product sizes */}
        <FormField
          control={form.control}
          name="sizes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sizes</FormLabel>
              <FormControl>
                <Combobox
                  {...field}
                  list={sizes}
                  placeholder="Select Sizes"
                  multiple
                />
              </FormControl>
              <FormMessage className="font-light" />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}

export default Sizes;
