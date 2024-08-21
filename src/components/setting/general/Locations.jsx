import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { PlusCircle, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FormControl, FormField } from "@/components/ui/form";

function Locations() {
  const form = useFormContext();

  const {
    fields: pickupFields,
    append: appendPickup,
    remove: removePickup,
  } = useFieldArray({
    control: form.control,
    name: "pickupLocations", // Ensure this matches your defaultValues and schema
  });

  const {
    fields: deliveryFields,
    append: appendDelivery,
    remove: removeDelivery,
  } = useFieldArray({
    control: form.control,
    name: "deliveryLocations", // Ensure this matches your defaultValues and schema
  });

  const handleAddPickup = (e) => {
    e.preventDefault();
    appendPickup({ address: "", fee: 0 });
  };

  const handleAddDelivery = (e) => {
    e.preventDefault();
    appendDelivery({ address: "", fee: 0 });
  };

  const deliveryMethods = form.watch("deliveryMethod");

  return (
    <>
      {/* Pickup Locations Table */}
      {deliveryMethods.includes("pickup") && (
        <Card className="bg-muted/40">
          <CardHeader>
            <CardTitle>Pickup Locations</CardTitle>
            <CardDescription>
              Add locations where customers can pick up their orders
            </CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Address</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pickupFields.map((item, index) => {
                  const { address, fee } = form.formState.errors.pickupLocations?.[index] || {};
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`pickupLocations.${index}.address`}
                          render={({ field }) => (
                            <FormControl>
                              <Input
                                placeholder="Address"
                                {...field}
                                value={field.value || ""} // Ensure controlled value
                                className={`min-w-20 ${address ? "border-red-500" : ""}`}
                              />
                            </FormControl>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`pickupLocations.${index}.fee`}
                          render={({ field }) => (
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Fee"
                                {...field}
                                value={field.value || 0} // Ensure controlled value
                                className={`min-w-20 ${fee ? "border-red-500" : ""}`}
                              />
                            </FormControl>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          onClick={() => removePickup(index)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t pt-6 grid place-items-center">
            <Button
              size="sm"
              variant="ghost"
              className="gap-1"
              onClick={handleAddPickup}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              Add Pickup Location
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Delivery Locations Table */}
      {deliveryMethods.includes("delivery") && (
        <Card className="bg-muted/40">
          <CardHeader>
            <CardTitle>Delivery Locations</CardTitle>
            <CardDescription>
              Add locations where customers can have their orders delivered
            </CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Address</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deliveryFields.map((item, index) => {
                  const { address, fee } = form.formState.errors.deliveryLocations?.[index] || {};
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`deliveryLocations.${index}.address`}
                          render={({ field }) => (
                            <FormControl>
                              <Input
                                placeholder="Address"
                                {...field}
                                value={field.value || ""} // Ensure controlled value
                                className={`min-w-20 ${address ? "border-red-500" : ""}`}
                              />
                            </FormControl>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`deliveryLocations.${index}.fee`}
                          render={({ field }) => (
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Fee"
                                {...field}
                                value={field.value || 0} // Ensure controlled value
                                className={`min-w-20 ${fee ? "border-red-500" : ""}`}
                              />
                            </FormControl>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          onClick={() => removeDelivery(index)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t pt-6 grid place-items-center">
            <Button
              size="sm"
              variant="ghost"
              className="gap-1"
              onClick={handleAddDelivery}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              Add Delivery Location
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}

export default Locations;
