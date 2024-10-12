import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import promotionService from "@/appwrite/promotion";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { getENV } from "@/getENV";
import { addPromoCode, updatePromoCode } from "@/store/promotionSlice";
import {
  promoCodeSchema,
  types,
  usagePeriods,
  discountTypes,
} from "@/schemas/promoCode";
import { Combobox } from "@/components/ui/Combobox";

const categories = [
  {
    $id: "1",
    name: "Electronics Electronics Electronics Electronics Electronics Electronics Electronics",
  },
  { $id: "2", name: "Clothing" },
  { $id: "3", name: "Home & Furniture" },
];

const initialFormValues = {
  code: "",
  type: "all",
  product: "",
  category: "",
  usagePeriod: "noLimit",
  limitedUsage: 0,
  discountType: "amount",
  discountValue: "",
  minimumPurchaseAmount: "",
  maximumDiscountAmount: "",
};

export default function PromoCodeForm({
  isEdit,
  setIsEdit,
  editDataID,
  setEditDataID,
}) {
  const dispatch = useDispatch();
  const promoCodes =
    useSelector((state) => state.promotion.promotions.promoCodes) || [];
  const products = useSelector((state) => state.product.products);
  const editingData = useSelector((state) =>
    isEdit
      ? state.promotion.promotions.promoCodes.find(
          (promoCode) => promoCode.$id === editDataID
        )
      : null
  );

  const form = useForm({
    resolver: zodResolver(promoCodeSchema),
    defaultValues: initialFormValues,
  });

  const type = form.watch("type");
  const usagePeriod = form.watch("usagePeriod");
  const discountType = form.watch("discountType");

  useEffect(() => {
    if (isEdit && editingData) {
      form.reset(editingData);
    } else {
      form.reset(initialFormValues);
    }
  }, [isEdit, editingData]);

  const onSubmit = async (data) => {
    console.log(data);
    // Exclude the current promo code being edited from the validation checks
    const otherPromoCodes = promoCodes.filter(
      (promoCode) => promoCode.$id !== editDataID
    );

    //if there is already a promo code with the same code, then return
    if (
      otherPromoCodes.some((promoCode) => promoCode.code === data.code)
    ) {
      toast.error("Promo code with the same code already exists.");
      return;
    }

    //if there is already all type promo code, then return
    if (
      data.type === "all" &&
      otherPromoCodes.some((promoCode) => promoCode.type === "all")
    ) {
      toast.error("All type promo code already exists.");
      return;
    }

    //if there is already a promo code for the selected product, then return
    if (
      data.type === "product" &&
      otherPromoCodes.some(
        (promoCode) =>
          promoCode.type === "product" && promoCode.product === data.product
      )
    ) {
      toast.error("This product already has a promo code.");
      return;
    }

    //if there is already a promo code for the selected category, then return
    if (
      data.type === "category" &&
      otherPromoCodes.some(
        (promoCode) =>
          promoCode.type === "category" && promoCode.category === data.category
      )
    ) {
      toast.error("This category already has a promo code.");
      return;
    }

    data = {
      ...data,
      product: data.type !== "product" ? "" : data.product,
      category: data.type !== "category" ? "" : data.category,
      limitedUsage: data.usagePeriod === "noLimit" ? 0 : data.limitedUsage,
      minimumPurchaseAmount:
        data.type === "product" ? 0 : data.minimumPurchaseAmount,
      maximumDiscountAmount:
        data.discountType === "percentage" ? data.maximumDiscountAmount : 0,
    };

    try {
      const { success, result, message } = isEdit
        ? await promotionService.updatePromoCode(editDataID, data)
        : await promotionService.addPromoCode(data);

      if (!success) {
        throw new Error(message);
      }

      dispatch(isEdit ? updatePromoCode(result) : addPromoCode(result));
      toast.success(`PromoCode ${isEdit ? "updated" : "added"} successfully.`);
      localStorage.setItem(
        "promotions_timestamp",
        (Date.now() - parseInt(getENV("CACHE_LIMIT"), 10)).toString()
      );
      setIsEdit(false);
      setEditDataID(null);
      form.reset(initialFormValues); // Reset form after successful submission
    } catch (error) {
      console.error(error);
      toast.error("Failed to save promo code.");
    }

    console.log("form fields after submit", form.getValues());
  };

  const handleCancel = () => {
    setIsEdit(false);
    setEditDataID(null);
    form.reset(initialFormValues); // Reset form on cancel
  };

  return (
    <Card className="bg-muted/40">
      <CardHeader>
        <CardTitle>Promo Code Details</CardTitle>
        <CardDescription>
          Fill in the details for the Promo Code here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input placeholder="RYNB40" className="uppercase" {...field} />
                  </FormControl>
                  <FormMessage className="font-light" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-col space-y-1"
                    >
                      {types.map(({ value, label }) => (
                        <FormItem
                          key={value}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={value} />
                          </FormControl>
                          <FormLabel className="font-normal">{label}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {type === "product" && (
              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Combobox
                        {...field}
                        list={products.map((item) => ({
                          value: item.$id,
                          label: item.name,
                        }))}
                        placeholder="Select Product"
                      />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />
            )}
            {type === "category" && (
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Combobox
                        {...field}
                        list={categories.map((item) => ({
                          value: item.$id,
                          label: item.name,
                        }))}
                        placeholder="Select Category"
                      />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="usagePeriod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Usage Period</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-col space-y-1"
                    >
                      {usagePeriods.map(({ value, label }) => (
                        <FormItem
                          key={value}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={value} />
                          </FormControl>
                          <FormLabel className="font-normal">{label}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {usagePeriod !== "noLimit" && (
              <FormField
                control={form.control}
                name="limitedUsage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-3">
                        <Input type="number" {...field} />
                        <p className="text-sm text-gray-500 w-1/6 text-center">
                          {usagePeriod === "limitedDay" ? "Days" : "Counts"}
                        </p>
                      </div>
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="discountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {discountTypes.map(({ value, label }) => (
                        <FormItem
                          key={value}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={value} />
                          </FormControl>
                          <FormLabel className="font-normal">{label}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discountValue"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-3">
                      <Input type="number" {...field} />
                      <p className="text-sm text-gray-500 w-1/6 text-center">
                        {discountType === "percentage" ? "%" : "Amount"}
                      </p>
                    </div>
                  </FormControl>
                  <FormMessage className="font-light" />
                </FormItem>
              )}
            />

            {/* if type is not product then show minimum purchase amount */}
            {type !== "product" && (
              <FormField
                control={form.control}
                name="minimumPurchaseAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Purchase Amount (Optional)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />
            )}

            {discountType === "percentage" && (
              <FormField
                control={form.control}
                name="maximumDiscountAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Discount Amount (Optional)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />
            )}

            <div className="flex gap-4">
              {isEdit && (
                <Button
                  type="button"
                  variant="outline"
                  disabled={form.formState.isSubmitting}
                  onClick={handleCancel}
                  className="w-full"
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full"
              >
                {form.formState.isSubmitting && (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isEdit ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}