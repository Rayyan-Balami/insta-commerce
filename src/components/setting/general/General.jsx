import React from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generalSchema } from "@/schemas/general";
import { Form } from "@/components/ui/form";
import StoreDetails from "./StoreDetails";
import Locations from "./Locations";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import PurchaseLimit from "./PurchaseLimit";
import Currency from "./Currency";
import PaymentAndDelivery from "./PaymentAndDelivery";

function General() {
  const form = useForm({
    resolver: zodResolver(generalSchema),
    defaultValues: {
      storeName: "",
      storeDescription: "",
      pickupLocations: [],
      deliveryLocations: [],
      storePromises: [],
      minimumOrder: 1,
      maximumOrder: 5,
      currencySymbol: "Rs",
      paymentMethod: [],
      deliveryMethod: [],
    },
  });

  const onSubmit = async (data) => {
    // Simulate asynchronous submission (e.g., API call)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data); // Handle form submission logic here
    //reset the form
    // form.reset();
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 lg:space-y-6"
        >
          <div className="grid gap-4 xl:grid-cols-3 xl:gap-8">
            <div className="grid auto-rows-max gap-4 xl:col-span-2 xl:gap-8">
              <StoreDetails />
              <PaymentAndDelivery />
              <Locations />
            </div>
            <div className="grid auto-rows-max gap-4 xl:gap-8">
              <PurchaseLimit />
              <Currency />
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="size-4 mr-2 animate-spin" />
                )}
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
}

export default General;
