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
import { FormField, FormItem, FormLabel, FormMessage, FormControl, FormDescription } from '@/components/ui/form';
import { InputTags } from '@/components/ui/input-tags';

function Categories() {
  const form = useFormContext();
  return (
    <Card className="bg-muted/40">
    <CardHeader>
      <CardTitle>Categories</CardTitle>
      <CardDescription>
        Set different categories for your store.
      </CardDescription>
    </CardHeader>
    <CardContent className="grid gap-6">
     {/* categories */}
     <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories (optional)</FormLabel>
              <FormControl>
                {/* //InputTags is a custom component that takes in a value and onChange function */}
                <InputTags
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Hit ↵ Enter or (,) comma to separate"
                />
              </FormControl>
              <FormMessage className="font-light" />
            </FormItem>
          )}
        />
        <FormDescription className="text-xs">
          eg: T-shirts, Jeans, Trouser, shoes etc.
        </FormDescription>
    </CardContent>
  </Card>
  )
}

export default Categories