import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TicketPercent } from "lucide-react";
import { useSelector } from "react-redux";

function CartSummary() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const checkedItems = cartItems.filter(
    (item) => item.isChecked && item.isAvailable
  );

  const subtotal = checkedItems.reduce(
    (acc, { sku, quantity }) => acc + sku.price * quantity,
    0
  );
  const discount = 25;
  const total = subtotal - discount;

  const handleCheckout = () => {
    navigate("/checkout/cart");
  }

  return (
    <>
      <Card x-chunk="dashboard-05-chunk-4">
        <CardHeader className="flex flex-row items-start bg-muted/40 border-b">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              Cart Summary
            </CardTitle>
            <CardDescription className="text-xs">
              Checked items added up to your order
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
          {checkedItems.length > 0 ? (
            <div className="grid gap-3">
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{subtotal.toFixed(2)}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <span>- {discount.toFixed(2)}</span>
                </li>
                <li className="flex items-center justify-between font-semibold">
                  <span>Total</span>
                  <span>{total.toFixed(2)}</span>
                </li>
              </ul>
            </div>
          ) : (
            <CardDescription className="text-sm text-center">
              Select items that you want to checkout
            </CardDescription>
          )}
        </CardContent>
        <CardFooter className="border-t bg-muted/40 px-6 py-3 flex-col gap-3">
            <Button className="w-full" disabled={checkedItems.length ==0} onClick={handleCheckout}>
              Checkout
            </Button>
          <CardDescription className="text-xs">
            *Shipping Charges calculated at checkout
          </CardDescription>
        </CardFooter>
      </Card>
      <Alert>
        <TicketPercent className="h-4 w-4" />
        <AlertTitle>Apply Promocode During Checkout</AlertTitle>
        <AlertDescription className="mt-2">
          Use code <strong>HUKUT500</strong> for Rs. 500 off
        </AlertDescription>
      </Alert>
    </>
  );
}

export default CartSummary;
