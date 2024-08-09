import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  MoreVertical,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

function CheckoutSummary() {
  const form = useFormContext();
  return (
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
            <li className="grid grid-cols-2 gap-2">
              <p>Shoes with Laces</p>
              <p className="text-muted-foreground text-right">
                Rs 250.00 x <span>2</span>
              </p>
              <img
                src="https://i.pinimg.com/564x/4c/01/56/4c01564b2bb728c2d34873b3cf317f48.jpg"
                alt=""
                className="border rounded-md size-20 aspect-square object-cover object-center"
              />
              <span className="text-right">$250.00</span>
            </li>
            <Separator className="my-2" />
            <li className="grid grid-cols-2 gap-2">
              <p>Shoes with Laces</p>
              <p className="text-muted-foreground text-right">
                Rs 250.00 x <span>2</span>
              </p>
              <img
                src="https://i.pinimg.com/564x/4c/01/56/4c01564b2bb728c2d34873b3cf317f48.jpg"
                alt=""
                className="border rounded-md size-20 aspect-square object-cover object-center"
              />
              <span className="text-right">$250.00</span>
            </li>
            <Separator className="my-2" />
          </ul>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>$299.00</span>
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
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && (
            <Loader2 className="size-4 mr-2 animate-spin" />
          )}
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CheckoutSummary;
