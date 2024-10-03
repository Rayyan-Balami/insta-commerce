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
import useProductWithPromotions from "@/hooks/useProductWithPromotions";
import { useEffect, useState, Fragment } from "react";

function SkuSummary({ viewProductID }) {
  const products = useProductWithPromotions();
  const [viewingProduct, setViewingProduct] = useState();

  useEffect(() => {
    if (viewProductID) {
      const product = products.find((product) => product.$id === viewProductID);
      setViewingProduct(product);
    }else{
      setViewingProduct(products[0]);
    }
  }, [viewProductID, products]);

  console.log(viewingProduct);

  return (
    <Card x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/40 border-b">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            SKU Summary
          </CardTitle>
          <CardDescription className="text-xs line-clamp-1">
            <strong>Name: </strong> {viewingProduct?.name || "-"}
          </CardDescription>
          <CardDescription className="text-xs line-clamp-1">
            <strong>Category: </strong> {viewingProduct?.category || "-"}
          </CardDescription>
        </div>
      </CardHeader>
           <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          {viewingProduct?.skus.map((sku, index) => (
            <Fragment key={index}>
              <p className="font-semibold">SKU - {index + 1}</p>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Color</span>
                  <span className="capitalize">{sku.color}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Size</span>
                  <span className="uppercase">{sku.size.join(", ")}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Stock</span>
                  <span>{sku.stock}</span>
                </li>
                <li className="flex items-center justify-between font-semibold">
                  <span>Price</span>
                  <span>Rs {sku.price.toFixed(2)}</span>
                </li>
              </ul>
              {index !== viewingProduct.skus.length - 1 && (
                <Separator className="my-2" />
              )}
            </Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default SkuSummary;
