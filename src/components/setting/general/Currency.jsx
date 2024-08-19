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

function Currency() {
  const form = useFormContext();
  return (
    <Card className="bg-muted/40">
    <CardHeader>
      <CardTitle>Currency</CardTitle>
      <CardDescription>
        Set the currency symbol.
      </CardDescription>
    </CardHeader>
    <CardContent className="grid gap-6">
     <FormField
      control={form.control}
      name="currencySymbol"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Currency Symbol</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage className="font-light" />
        </FormItem>
      )}
    />
    </CardContent>
  </Card>
  )
}

export default Currency