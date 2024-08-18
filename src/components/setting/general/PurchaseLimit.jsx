import React from 'react'
import { useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

function PurchaseLimit() {
  const form = useFormContext();
  return (
    <Card className="bg-muted/40">
    <CardHeader>
      <CardTitle>Purchase Limit</CardTitle>
      <CardDescription>
        Set the minimum and maximum order limits.
      </CardDescription>
    </CardHeader>
    <CardContent className="grid gap-6">
     <FormField
      control={form.control}
      name="minimumOrder"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Minimum Order</FormLabel>
          <FormControl>
            <Input type="number" {...field} />
          </FormControl>
          <FormMessage className="font-light" />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="maximumOrder"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Maximum Order</FormLabel>
          <FormControl>
            <Input type="number" {...field} />
          </FormControl>
          <FormMessage className="font-light" />
        </FormItem>
      )}
    />
    </CardContent>
  </Card>
  )
}

export default PurchaseLimit