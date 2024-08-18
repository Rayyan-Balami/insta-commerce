import {
  ChevronLeft,
  ChevronRight,
  Copy,
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
import { Separator } from "@/components/ui/separator";

function OrderSummary() {
  return (
    <Card x-chunk="dashboard-05-chunk-4">
      <CardHeader className="bg-muted/40 border-b">
        <CardTitle className="group flex items-center gap-2 text-lg">
          Order Oe31b70H
          <Button
            size="icon"
            variant="outline"
            className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Copy className="h-3 w-3" />
            <span className="sr-only">Copy Order ID</span>
          </Button>
        </CardTitle>
        <CardDescription className="text-xs">
          Date: November 23, 2023
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <p className="font-semibold">Order Details</p>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Glimmer Lamps x <span>2</span>
              </span>
              <span>$250.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Aqua Filters x <span>1</span>
              </span>
              <span>$49.00</span>
            </li>
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>$299.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Delivery</span>
              <span>$0.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Discount</span>
              <span>- $25.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Promocode(HuKut500)</span>
              <span>- $25.00</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>$329.00</span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <p className="font-semibold">Customer Information</p>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Customer</dt>
              <dd className="text-right">Liam Johnson</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Email</dt>
              <dd className="text-right">
                <a href="mailto:">liam@acme.com</a>
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Phone</dt>
              <dd className="text-right">
                <a href="tel:">+1 234 567 890</a>
              </dd>
            </div>
          </dl>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <p className="font-semibold">Shipping Information</p>
          <dl className="grid gap-3">
            <div className="flex items-start justify-between gap-2">
              <dt className="text-muted-foreground">Address</dt>
              <dd className="text-right">Nayabazar 16</dd>
            </div>
            <div className="flex items-start justify-between gap-2">
              <dt className="text-muted-foreground">City</dt>
              <dd className="text-right">Kathmandu</dd>
            </div>
            <div className="flex items-start justify-between gap-2">
              <dt className="text-muted-foreground">Landmark</dt>
              <dd className="text-right">Near Bhatbhateni Supermarket</dd>
            </div>
            <div className="flex items-start justify-between gap-2">
              <dt className="text-muted-foreground">Delivery Zone </dt>
              <dd className="text-right">KTM, inside ringroad</dd>
            </div>
          </dl>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <p className="font-semibold">Delivery Note</p>
          <CardDescription>
            Please deliver the package before 6 PM.
          </CardDescription>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <p className="font-semibold">Payment & Delivery</p>
          <dl className="grid gap-3">
            <div className="flex items-start justify-between gap-2">
              <dt className="text-muted-foreground">Payment Method</dt>
              <dd className="text-right">e-Sewa</dd>
            </div>
            <div className="flex items-start justify-between gap-2">
              <dt className="text-muted-foreground">Delivery Method</dt>
              <dd className="text-right">Pickup</dd>
            </div>
          </dl>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/40 px-6 py-3">
        <CardDescription className="text-xs">
          Updated : November 23, 2023
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

export default OrderSummary;
