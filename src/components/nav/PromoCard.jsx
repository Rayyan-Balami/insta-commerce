import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  const cardTitle = title || card.title || "Title";
  const cardDescription = description || card.description || "Description";
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
        <CardHeader className="p-4">
          <CardTitle className="text-xl">{cardTitle}</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm p-0 mx-4 text-pretty">
          {parse(cardDescription)}
        </CardContent>
        <CardFooter className="p-4">
          <Button size="sm" className="w-full" asChild>
            <Link to={cardURL} target="_blank">
              {cardCTA}
            </Link>
          </Button>
          </CardFooter>
      </Card>
    </div>
  );
}

export default PromoCard;
