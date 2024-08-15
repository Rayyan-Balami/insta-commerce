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
import { Textarea } from "../../ui/textarea";
import { useFormContext } from "react-hook-form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

function PaymentAndDeliveryInfo() {
  const form = useFormContext();
  const paymentMethods = [
    { value: "credit_card", label: "Credit Card" },
    { value: "paypal", label: "PayPal" },
    { value: "bank_transfer", label: "Bank Transfer" },
    { value: "cash_on_delivery", label: "Cash on Delivery" },
  ];
  const deliveryMethods = [
    { value: "standard", label: "Standard" },
    { value: "express", label: "Express" },
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
                <FormLabel>Payment Method </FormLabel>
                <FormControl>
                <ToggleGroup
                  type="single"
                  variant="outline"
                  className="justify-start flex-wrap gap-2"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  {paymentMethods.map(({ value, label }) => (
                    <ToggleGroupItem
                      key={value}
                      value={value}
                      aria-label={value}
                      className={`px-3 py-1 transition-colors duration-300 cursor-pointer ${
                        form.watch("paymentMethod") === value
                          ? "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                          : " text-muted-foreground"
                      }`}
                    >
                      {label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
                </FormControl>
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
                  type="single"
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
                        form.watch("deliveryMethod") === value
                          ? "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                          : " text-muted-foreground"
                      }`}
                    >
                      {label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default PaymentAndDeliveryInfo;
