import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";


function PromoCard() {
  return (
    <div className="mt-auto md:px-4 md:pb-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader>
              <CardTitle>Follow Us</CardTitle>
              <CardDescription>
              Join our community and gain full access to premium features and dedicated support.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="sm" className="w-full">
                Website By Balami
              </Button>
            </CardContent>
          </Card>
        </div>
  );
}

export default PromoCard;
