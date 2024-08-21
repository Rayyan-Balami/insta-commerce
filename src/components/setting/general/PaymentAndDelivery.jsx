import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem,
} from "@/components/ui/multi-select";
import { useFormContext } from "react-hook-form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

function PaymentAndDelivery() {
  const form = useFormContext();
  const paymentMethods = [
    "Bank Transfer",
    "Cash on Delivery",
    "Credit Card",
    "Debit Card",
    "e-Sewa",
    "Khalti",
    "connectIPS",
    "IME Pay",
    "Prabhu Pay",
  ];
  const deliveryMethods = [
    { value: "pickup", label: "Pickup" },
    { value: "delivery", label: "Delivery" },
  ];
  return (
    <Card className="bg-muted/40">
      {/* //Payment Information (logos of payment methods) */}
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
        <CardDescription>Choose your preferred payment method</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <FormControl>
                  <MultiSelector
                    values={field.value}
                    onValuesChange={field.onChange}
                    loop={false}
                  >
                    <MultiSelectorTrigger>
                      <MultiSelectorInput placeholder="Select Payment Method" />
                    </MultiSelectorTrigger>
                    <MultiSelectorContent>
                      <MultiSelectorList>
                        {paymentMethods.map((option) => (
                          <MultiSelectorItem key={option} value={option}>
                            {option}
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
          <FormField
            control={form.control}
            name="deliveryMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Method </FormLabel>
                <FormControl>
                  <ToggleGroup
                    type="multiple"
                    variant="outline"
                    className="justify-start flex-wrap gap-2"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    {deliveryMethods.map(({ value, label }) => (
                      <ToggleGroupItem
                        key={value}
                        value={value}
                        aria-label={value}
                        className={`px-3 py-1 transition-colors duration-300 cursor-pointer ${
                          form.watch("deliveryMethod").includes(value)
                            ? "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                            : " text-muted-foreground"
                        }`}
                      >
                        {label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </FormControl>
                <FormMessage className="font-light" />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default PaymentAndDelivery;
