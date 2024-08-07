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

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import { codeSchema } from "@/schemas/code";

const products = ["product1", "product2", "product3"]; // Define your products here
const categories = ["clothing", "electronics", "accessories"]; // Define your categories here
export default function Code() {
  const form = useForm({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: "",
      type: "all",
      products: [],
      usagePeriod: "noLimit",
      limitedUsage: "",
      discountRate: "percentage",
      discountRateValue: "",
      minimumPurchaseAmount: "",
      maximumPurchaseAmount: "",
      maximumDiscountAmount: "",
    },
  });

  const types = [
    { value: "all", label: "All" },
    { value: "specific", label: "Specific" },
    { value: "category", label: "Category" },
  ]

  const usagePeriods = [
    { value: "noLimit", label: "No Limit" },
    { value: "limitedCount", label: "Limited Count" },
    { value: "limitedDay", label: "Limited Day" },
  ]

  const discountRates = [
    { value: "percentage", label: "Percentage" },
    { value: "amount", label: "Amount" },
  ]


  const type = form.watch("type");
  const usagePeriod = form.watch("usagePeriod");
  const discountRate = form.watch("discountRate");

  const onSubmit = async (data) => {
    // Simulate asynchronous submission (e.g., API call)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data); // Handle form submission logic here
    //reset the form
    // form.reset();
  };

  return (
    <Card className="bg-muted/40 max-w-2xl">
      <CardHeader>
        <CardTitle>Promo Code Details</CardTitle>
        <CardDescription>
          Fill in the details for the Promo Code here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="BALAMI20"
                      {...field}
                      className="uppercase"
                    />
                  </FormControl>
                  <FormMessage className="font-light" />
                </FormItem>
              )}
            />
            {/* //radio groups for promo type (all, specific, category) */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {types.map(({value, label}) => (
                      <FormItem 
                      key={value}
                      className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {label}
                        </FormLabel>
                      </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {type !== "all" && (
              <FormField
                control={form.control}
                name="products"
                render={({ field }) => (
                  <FormItem>
                  <FormControl>
                    <MultiSelector
                      values={field.value || []}
                      onValuesChange={(products) => field.onChange(products)}
                    >
                      <MultiSelectorTrigger className={`uppercase`}>
                        <MultiSelectorInput placeholder={`Select ${type}s`} />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                        <MultiSelectorList>
                          {(type === "category"
                            ? categories
                            : type === "specific"
                            ? products
                            : []
                          ).map((item) => (
                            <MultiSelectorItem key={item} value={item}>
                              {item}
                            </MultiSelectorItem>
                          ))}
                        </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
                  </FormControl>
                  <FormMessage className="font-light" />
                </FormItem>
                )}
              />
            )}
            {/* //for usage period (no limit, limited times, limited Days) */}
            <FormField
              control={form.control}
              name="usagePeriod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Usage Period</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {usagePeriods.map(({value, label}) => (
                      <FormItem 
                      key={value}
                      className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {label}
                        </FormLabel>
                      </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {usagePeriod !== "noLimit" && (
              <FormField
                control={form.control}
                name="limitedUsage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-3">
                        <Input type="number" {...field} />
                        <p className="text-sm text-gray-500 w-1/6 text-center">
                          {usagePeriod === "limitedCount" ? "COUNTS" : "DAYS"}
                        </p>
                      </div>
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />
            )}

            {/* //rate of discount (percentage, fixed amount) with minimum purchase amount and maximum discount amount  */}

            <FormField
              control={form.control}
              name="discountRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Rate</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                       {discountRates.map(({value, label}) => (
                      <FormItem 
                      key={value}
                      className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {label}
                        </FormLabel>
                      </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discountRateValue"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-3">
                      <Input type="number" {...field} />
                      <p className="text-sm text-gray-500 w-1/6 text-center">
                        {discountRate === "percentage" ? "%" : "AMOUNT"}
                      </p>
                    </div>
                  </FormControl>
                  <FormMessage className="font-light" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="minimumPurchaseAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Purchase Amount (Optional)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage className="font-light" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maximumPurchaseAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Purchase Amount (Optional)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage className="font-light" />
                </FormItem>
              )}
            />

            {discountRate !== "amount" && (
              <FormField
                control={form.control}
                name="maximumDiscountAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Discount Amount (Optional)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />
            )}
            
            <Button
              type="submit"
              // disabled={form.formState.isSubmitting}
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
  );
}
