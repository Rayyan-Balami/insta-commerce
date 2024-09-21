import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Skeleton } from "../ui/skeleton";

function PromoCard({ title, description, CTA, URL }) {
  const loading = useSelector((state) => state.promotion.loading);
  const card =
    useSelector((state) => state.promotion.promotions.promoCard) || {};

  // Use props if provided, otherwise fallback to Redux store values
  const cardTitle = title || card.title || "Default Title";
  const cardDescription = description || card.description || "Default Description";
  const cardCTA = CTA || card.CTA || "CTA";
  const cardURL = URL || card.URL || "#";

  if (loading) {
    return <Skeleton className="aspect-[4/3] border" />;
  }

  if (!card) {
    return null;
  }

  return (
    <div className="mt-auto">
      <Card x-chunk="dashboard-02-chunk-0">
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
          <div className="text-muted-foreground">
            {cardDescription ? parse(cardDescription) : "No description available."}
          </div>
        </CardHeader>
        <CardContent>
          <Button size="sm" className="w-full" asChild>
            <Link to={cardURL} target="_blank">
              {cardCTA}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default PromoCard;
