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
function GeneralInfo() {
  const form = useFormContext();
  return (
    <Card className="bg-muted/40">
      {/* //General Information (name,phone,email) about the buyer */}
      <CardHeader>
        <CardTitle>General Information</CardTitle>
        <CardDescription>
          Buyer's basic identification details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name </FormLabel>
                <FormControl>
                  <Input placeholder="Rayyan Balami" {...field} />
                </FormControl>
                <FormMessage className="font-light" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email </FormLabel>
                <FormControl>
                  <Input placeholder="myemail@gmail.com" {...field} />
                </FormControl>
                <FormMessage className="font-light" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone </FormLabel>
                <FormControl>
                  <Input placeholder="98017XXXXX" {...field} />
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

export default GeneralInfo;
