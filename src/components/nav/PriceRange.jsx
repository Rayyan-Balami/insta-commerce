import { Wallet } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";

function PriceRange({ className }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data); // This will log the form data on submission
    // You can add further logic here to handle form submission
  };

  return (
    <div className={className}>
      <p className="flex items-center gap-3 px-3 py-2 text-muted-foreground">
        <Wallet className="h-[1.15rem] w-[1.15rem]" />
        <span>Price</span>
      </p>
      <form
        className="px-3 py-2 grid grid-cols-2 gap-2 text-muted-foreground"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Label htmlFor="min" className="text-xs inline-block mb-1.5">
            Min
          </Label>
          <Input
            type="number"
            id="min"
            {...register("min", { required: true, min: 0 })}
          />
        </div>
        <div>
          <Label htmlFor="max" className="text-xs inline-block mb-1.5">
            Max
          </Label>
          <Input
            type="number"
            id="max"
            {...register("max", { required: true, min: 0 })}
          />
        </div>
        <Button type="submit" variant="outline" className="col-span-2">
          Apply
        </Button>
      </form>
    </div>
  );
}

export default PriceRange;
