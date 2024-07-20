import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag } from "lucide-react"
import { Link } from "react-router-dom"
import Product from "@/pages/Product"

export default function ProductCard({product}) {
  return (
    <Link to="/product">
      <Card className="w-full 2xl:max-w-sm overflow-hidden group">
        <div className="relative overflow-hidden">
          <img src={product} alt="Product Image" className="aspect-square w-full object-cover object-center xl:group-hover:scale-105 transition-all duration-300" />
        </div>
        <CardContent className="p-4 space-y-4 xl:group-hover:bg-muted/40 transition-all duration-300">
          <div>
            <h3 className="text-lg font-semibold">Cozy Knit Sweater</h3>
            <p className="text-muted-foreground">A soft and comfortable knit sweater.</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="bg-green-500 hover:bg-green-600 text-white">
                20% Off
              </Badge>
              <Badge variant="secondary" className="bg-blue-500 hover:bg-blue-600 text-white">
                Tops
              </Badge>
            </div>
          </div>
          <div className="flex items-center justify-between flex-wrap">
            <div>
              <span className="text-2xl font-bold">$49.99</span>
              <span className="text-muted-foreground line-through ml-2">$59.99</span>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
            <ShoppingBag className="h-3.5 w-3.5"/>
            <span>Add To Cart</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}