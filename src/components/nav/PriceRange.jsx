import { Wallet, Loader2, UndoDot } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { priceRangeSchema } from "@/schemas/priceRange";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

function PriceRange({ className }) {
  const form = useForm({
    resolver: zodResolver(priceRangeSchema),
    defaultValues: {
      min: "",
      max: "",
    },
  });

  const onSubmit = async (data) => {
    // Simulate asynchronous submission (e.g., API call)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data); // Handle form submission logic here
  };

  return (
    <div className={className}>
      <p className="flex items-center gap-3 px-3 py-2 text-muted-foreground">
        <Wallet className="h-[1.15rem] w-[1.15rem]" />
        <span>Price</span>
      </p>
      <Form {...form}>
        <form
          className="px-3 py-2 grid grid-cols-4 gap-2 text-muted-foreground"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="min"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="text-xs">Min</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="max"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="text-xs">Max</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Apply Button */}
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            variant="outline"
            className="col-span-3"
          >
            {form.formState.isSubmitting && (
              <Loader2 className="size-4 mr-2 animate-spin" />
            )}
            Apply
          </Button>

          {/* clear button  */}
          <Button
            type="button"
            onClick={form.reset}
            variant="ghost"
            disabled={form.formState.isSubmitting}
          >
            <UndoDot />
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default PriceRange;
