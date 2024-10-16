import React from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generalSchema } from "@/schemas/general";
import { Form } from "@/components/ui/form";
import StoreDetails from "./StoreDetails";
import Locations from "./Locations";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import PurchaseLimit from "./PurchaseLimit";
import Currency from "./Currency";
import PaymentAndDelivery from "./PaymentAndDelivery";
import Categories from "@/components/setting/general/Categories";
import Sizes from "./Sizes";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setGeneral, setContact } from "@/store/storeSlice";
import StoreService from "@/appwrite/store";
import { toast } from "sonner";

function General() {
  const storeGeneral = useSelector((state) => state.store.general);
  const dispatch = useDispatch();

  const parsedPickupLocations = Array.isArray(storeGeneral.pickupLocations)
    ? storeGeneral.pickupLocations
    : JSON.parse(storeGeneral.pickupLocations || "[]");

  const parsedDeliveryLocations = Array.isArray(storeGeneral.deliveryLocations)
    ? storeGeneral.deliveryLocations
    : JSON.parse(storeGeneral.deliveryLocations || "[]");

  const defaultValues = {
    storeName: storeGeneral.storeName,
    storeDescription: storeGeneral.storeDescription,
    pickupLocations: parsedPickupLocations,
    deliveryLocations: parsedDeliveryLocations,
    storePromises: storeGeneral.storePromises,
    minimumOrder: storeGeneral.minimumOrder,
    maximumOrder: storeGeneral.maximumOrder,
    currencySymbol: storeGeneral.currencySymbol,
    paymentMethod: storeGeneral.paymentMethod,
    deliveryMethod: storeGeneral.deliveryMethod,
    categories: storeGeneral.categories,
    sizes: storeGeneral.sizes,
  };

  const form = useForm({
    resolver: zodResolver(generalSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      console.log(data);
      const response = await StoreService.updateGeneral(storeGeneral.$id, data);
      if (response.success) {
        dispatch(setGeneral(response.result));
        localStorage.setItem("storeGeneral", JSON.stringify(response.result));
        toast.success("General settings updated successfully.");
      }
    } catch (error) {
      toast.error(error.message);
    }
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
              <Categories />
              <Sizes />
              <PurchaseLimit />
              <Currency />
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
                onClick={() => console.log(form.formState.errors)}
              >
                {form.formState.isSubmitting && (
                  <Loader className="size-4 mr-2 animate-spin" />
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
