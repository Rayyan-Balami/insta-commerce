import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TicketPercent } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function CheckoutSummary() {
  const form = useFormContext();
  const { type } = useParams();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const getCheckoutItems = () => {
    if (type === "cart") {
      return cartItems.filter((item) => item.isChecked && item.isAvailable);
    } else if (type === "buy-now") {
      return [JSON.parse(localStorage.getItem("buyNow"))] || [];
    }
    return [];
  };

  const checkoutItems = getCheckoutItems();
  console.log("Checkout Items", checkoutItems);

  useEffect(() => {
    if (!["buy-now", "cart"].includes(type) || checkoutItems.length === 0) {
      navigate(-1);
    }
  }, [type, navigate, checkoutItems]);

  const subtotal = checkoutItems.reduce(
    (acc, { sku, quantity }) => acc + (sku.price || 0) * (quantity || 0),
    0
  );

  const discount = 25;
  const total = subtotal - discount;

  console.log("Checkout Items", checkoutItems);

  return (
    <>
      <Card x-chunk="dashboard-05-chunk-4">
        <CardHeader className="flex flex-row items-start bg-muted/40 border-b">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              Checkout Summary
            </CardTitle>
            <CardDescription className="text-xs">
              Orders are processed within 24 hours
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
          <div className="grid gap-3">
            <ul className="grid gap-3">
              {checkoutItems.map((item) => (
                <div key={item.id}>
                  <li className="flex items-center justify-between gap-2">
                    <img
                      src={item.imagePreview}
                      alt="image preview"
                      className="self-start border rounded-md size-20 aspect-square object-cover object-center"
                    />
                    <div className="space-y-1 text-right">
                      <p>{item.name}</p>
                      <p className="text-muted-foreground text-xs italic">
                        Varient: {item.sku.color} ({item.sku.size})
                      </p>
                      <p className="text-muted-foreground text-xs italic">
                        Rs {item.sku.price.toFixed(2)} x {item.quantity}
                      </p>
                      <p className="mt-4">
                        {(item.sku.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </li>
                  <Separator className="my-2" />
                </div>
              ))}
            </ul>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>RS {subtotal.toFixed(2)}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>RS 0.00</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Discount</span>
                <span>- RS {discount.toFixed(2)}</span>
              </li>
              <li className="flex items-center justify-between font-semibold">
                <span>Total</span>
                <span>RS {total.toFixed(2)}</span>
              </li>
              <Separator className="my-2" />
              {/* //Input to add promocode */}
              <li>
                <FormField
                  control={form.control}
                  name="promocode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Promocode </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Promocode" {...field} />
                      </FormControl>
                      <FormMessage className="font-light" />
                    </FormItem>
                  )}
                />
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/40 px-6 py-3">
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="size-4 mr-2 animate-spin" />
            )}
            Place Order
          </Button>
        </CardFooter>
      </Card>
      <Alert>
        <TicketPercent className="h-4 w-4" />
        <AlertTitle className="mb-2"> Single Promocode Limit</AlertTitle>
        <AlertDescription>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="gap-2 w-full"
          >
            Use code <strong>HUKUT500</strong> for Rs. 500 off
          </Button>
        </AlertDescription>
        <AlertDescription>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="gap-2 w-full"
          >
            Use code <strong>HUKUT500</strong> for Rs. 500 off
          </Button>
        </AlertDescription>
      </Alert>
    </>
  );
}

export default CheckoutSummary;
