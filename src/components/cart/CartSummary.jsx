import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TicketPercent} from "lucide-react";

function CartSummary() {
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
          <div className="grid gap-3">
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>$299.00</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Discount</span>
                <span>- $25.00</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>$5.00</span>
              </li>
              <li className="flex items-center justify-between font-semibold">
                <span>Total</span>
                <span>$329.00</span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/40 px-6 py-3">
          <Button className="w-full" asChild>
            <Link to="/checkout/cart" className="flex items-center gap-1">
              Checkout
            </Link>
          </Button>
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
