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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function ShippingInfo() {
  const form = useFormContext();
  return (
    <Card className="bg-muted/40">
      {/* //Shipping Information (address,city,zip) */}
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
        <CardDescription>Where should we deliver your order?</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address </FormLabel>
                <FormControl>
                  <Input placeholder="Durbarmarg" {...field} />
                </FormControl>
                <FormMessage className="font-light" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City </FormLabel>
                <FormControl>
                  <Input placeholder="Kathmandu" {...field} />
                </FormControl>
                <FormMessage className="font-light" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Landmark"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Landmark </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Infront of `this` and `that`"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="font-light" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Delivery Zone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Zone </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Delivery Zone" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      "KTM, Inside Ringroad",
                      "KTM, Outside Ringroad",
                      "Outside KTM",
                    ].map((zone) => (
                      <SelectItem key={zone} value={zone}>
                        {zone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="font-light" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Notes </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Additional notes about your order"
                    {...field}
                  />
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

export default ShippingInfo;
