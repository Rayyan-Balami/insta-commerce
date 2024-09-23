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
import { Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import promotionService from "@/appwrite/promotion";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { getENV } from "@/getENV";
import { addDiscount, updateDiscount } from "@/store/promotionSlice";
import { discountSchema, types, usagePeriods } from "@/schemas/discount";
import { Combobox } from "@/components/ui/Combobox";

const categories = [
  { $id: "1", name: "Electronics" },
  { $id: "2", name: "Clothing" },
  { $id: "3", name: "Home & Furniture" },
];

export default function DiscountForm({ isEdit, setIsEdit, editDataID, setEditDataID }) {
  const dispatch = useDispatch();
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
    defaultValues: {
      name: editingData?.name || "",
      type: editingData?.type || "all",
      products: editingData?.products || [],
      categories: editingData?.categories || [],
      usagePeriod: editingData?.usagePeriod || "noLimit",
      limitedUsage: editingData?.limitedUsage || 0,
      discountRate: editingData?.discountRate || "",
      minimumPurchaseAmount: editingData?.minimumPurchaseAmount || "",
      maximumDiscountAmount: editingData?.maximumDiscountAmount || "",
    },
  });

  const type = form.watch("type");
  const usagePeriod = form.watch("usagePeriod");

  useEffect(() => {
    if (editingData) form.reset(editingData);
  }, [editingData, form]);

  const onSubmit = async (data) => {
    data = {
      ...data,
      products: data.type !== "products" ? [] : data.products,
      categories: data.type !== "categories" ? [] : data.categories,
      limitedUsage: data.usagePeriod !== "limitedDay" ? 0 : data.limitedUsage,
    };

    try {
      const {success,result, message} = isEdit
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
      // form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save discount.");
    }
  };

  return (
    <Card className="bg-muted/40">
      <CardHeader>
        <CardTitle>Discount Details</CardTitle>
        <CardDescription>
          Preapply discount rates to your products
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
            {type === "products" && (
              <FormField
                control={form.control}
                name="products"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Combobox
                        {...field}
                        list={products.map((item) => ({
                          value: item.$id,
                          label: item.name,
                        }))}
                        placeholder="Select Products"
                        multiple
                      />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />
            )}
            {type === "categories" && (
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Combobox
                        {...field}
                        list={categories.map((item) => ({
                          value: item.$id,
                          label: item.name,
                        }))}
                        placeholder="Select Categories"
                        multiple
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
                          DAYS
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
                  onClick={() => setIsEdit(false)}
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
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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