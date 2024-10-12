import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown,Ellipsis } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function PromoCard({ title, description, CTA, URL }) {
  const loading = useSelector((state) => state.promotion.loading);
  const card =
    useSelector((state) => state.promotion.promotions.promoCard) || {};
  const [isExpanded, setIsExpanded] = useState(
    JSON.parse(localStorage.getItem("promoCardExpanded")) || false
  );

  const toggleExpanded = () => {
    setIsExpanded((expanded) => {
      localStorage.setItem("promoCardExpanded", JSON.stringify(!expanded));
      return !expanded;
    });
  };

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
    <Card className="transition-all mb-2 p-3.5 space-y-3.5">
      <CardHeader className="p-0">
        <CardTitle className="text-xl">{cardTitle}</CardTitle>
      </CardHeader>
      {isExpanded && (
        <CardContent className="text-muted-foreground text-sm p-0 text-pretty">
          {parse(cardDescription)}
        </CardContent>
      )}
      <CardFooter className="p-0 flex-col gap-2">
        <Button className="w-full h-8" asChild>
          <Link to={cardURL} target="_blank">
            {cardCTA}
          </Link>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="-mb-7 rounded-full"
          onClick={toggleExpanded}
        >
          <ChevronDown className={`size-5 ${isExpanded ? "" : "transform rotate-180"} transition-all`} />
        </Button>
      </CardFooter>
    </Card>
  );
}

function FooterMenu() {
  const footerMenu = [
    { name: "Contact Us", url: "/contact" },
    { name: "Privacy Policy", url: "/privacy" },
    { name: "Terms of Service", url: "/terms" },
    { name: "Refund Policy", url: "/refund" },
  ]
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="flex-1 gap-2 rounded-full focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 text-muted-foreground hover:text-secondary-foreground">
          <Ellipsis className="h-5 w-5" />
          <span>Support</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {
          footerMenu.map((item, index) => (
            <DropdownMenuItem key={index} asChild>
              <Link to={item.url}>{item.name}</Link>
            </DropdownMenuItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function PromoCardAndMenu() {
  return (
    <div className="mt-auto px-2 pb-2 lg:px-4 lg:pb-4 space-y-5">
      <PromoCard />
      <div className="flex gap-4">
        <ModeToggle />
        <FooterMenu />
      </div>
    </div>
  );
}

export default PromoCardAndMenu;