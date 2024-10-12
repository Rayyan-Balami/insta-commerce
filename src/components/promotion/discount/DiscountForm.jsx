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
import { addDiscount, updateDiscount } from "@/store/promotionSlice";
import { discountSchema, types, usagePeriods } from "@/schemas/discount";
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
  name: "",
  type: "all",
  product: "",
  category: "",
  usagePeriod: "noLimit",
  limitedUsage: 0,
  discountRate: "",
  minimumPurchaseAmount: "",
  maximumDiscountAmount: "",
};

export default function DiscountForm({
  isEdit,
  setIsEdit,
  editDataID,
  setEditDataID,
}) {
  const dispatch = useDispatch();
  const discounts =
    useSelector((state) => state.promotion.promotions.discounts) || [];
  const products = useSelector((state) => state.product.products);
  const editingData = useSelector((state) =>
    isEdit
      ? state.promotion.promotions.discounts.find(
          (discount) => discount.$id === editDataID
        )
      : null
  );

  const form = useForm({
    resolver: zodResolver(discountSchema),
    defaultValues: initialFormValues,
  });

  const type = form.watch("type");
  const usagePeriod = form.watch("usagePeriod");

  useEffect(() => {
    if (isEdit && editingData) {
      form.reset(editingData);
    } else {
      form.reset(initialFormValues);
    }
  }, [isEdit, editingData]);

  const onSubmit = async (data) => {
    const otherDiscounts = discounts.filter(
      (discount) => discount.$id !== editDataID
    );

    //if discount with the same name already exists, then return
    if (otherDiscounts.some((discount) => discount.name === data.name)) {
      toast.error("Discount with the same name already exists.");
      return;
    }

    //if there is already all type discount, then return
    if (
      data.type === "all" &&
      otherDiscounts.some((discount) => discount.type === "all")
    ) {
      toast.error("All type discount already exists.");
      return;
    }

    //if there is already a discount for the selected product, then return
    if (
      data.type === "product" &&
      otherDiscounts.some(
        (discount) =>
          discount.type === "product" && discount.product === data.product
      )
    ) {
      toast.error("This product already has a discount.");
      return;
    }

    //if there is already a discount for the selected category, then return
    if (
      data.type === "category" &&
      otherDiscounts.some(
        (discount) =>
          discount.type === "category" && discount.category === data.category
      )
    ) {
      toast.error("This category already has a discount.");
      return;
    }

    data = {
      ...data,
      product: data.type !== "product" ? "" : data.product,
      category: data.type !== "category" ? "" : data.category,
      limitedUsage: data.usagePeriod !== "limitedDay" ? 0 : data.limitedUsage,
      minimumPurchaseAmount:
        data.type === "product" ? 0 : data.minimumPurchaseAmount,
    };

    try {
      const { success, result, message } = isEdit
        ? await promotionService.updateDiscount(editDataID, data)
        : await promotionService.addDiscount(data);

      if (!success) {
        throw new Error(message);
      }

      dispatch(isEdit ? updateDiscount(result) : addDiscount(result));
      toast.success(`Discount ${isEdit ? "updated" : "added"} successfully.`);
      localStorage.setItem(
        "promotions_timestamp",
        (Date.now() - parseInt(getENV("CACHE_LIMIT"), 10)).toString()
      );
      setIsEdit(false);
      setEditDataID(null);
      form.reset(initialFormValues);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save discount.");
    }
  };

  const handleCancel = () => {
    setIsEdit(false);
    setEditDataID(null);
    form.reset(initialFormValues); // Reset form on cancel
  };

  return (
    <Card className="bg-muted/40">
      <CardHeader>
        <CardTitle>Discount Details</CardTitle>
        <CardDescription>
          Preapply discount rates to your product
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="New Year Sale" {...field} />
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
                          Days
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
              name="discountRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Rate</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-3">
                      <Input type="number" {...field} />
                      <p className="text-sm text-gray-500 w-1/6 text-center">
                        %
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
