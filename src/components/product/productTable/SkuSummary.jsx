import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TicketPercent } from "lucide-react";
import { Separator } from "@/components/ui/separator";

function SkuSummary() {
  return (
    <Card x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/40 border-b">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            SKU Summary
          </CardTitle>
          <CardDescription className="text-xs">
            Product : <strong>SKU-123456</strong>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm ">
        <div className="grid gap-3">
          <p className="font-semibold">SKU - 1 </p>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Color</span>
              <span>Black</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Size</span>
              <span>S, M, L</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Stock</span>
              <span>10</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span>Price</span>
              <span>$29.00</span>
            </li>
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Color</span>
              <span>Black</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Size</span>
              <span>S, M, L</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Stock</span>
              <span>10</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span>Price</span>
              <span>$29.00</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export default SkuSummary;
