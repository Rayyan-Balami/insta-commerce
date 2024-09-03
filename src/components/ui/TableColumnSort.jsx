import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowDownAZ, ArrowUpZA } from "lucide-react";

export function TableColumnSort({ column }) {
  const isSorted = column.getIsSorted();
  return (
    <Button variant="ghost" onClick={() => column.toggleSorting()}>
      Customer
      {!isSorted ? (
        <ArrowUpDown className="ml-2 size-3.5" />
      ) : isSorted === "asc" ? (
        <ArrowDownAZ className="ml-2 size-3.5" />
      ) : (
        <ArrowUpZA className="ml-2 size-3.5" />
      )}
    </Button>
  );
}

