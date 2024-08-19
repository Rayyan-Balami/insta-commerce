import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

export function TableColumnSort({ column }) {
  const isSorted = column.getIsSorted();
  return (
    <Button variant="ghost" onClick={() => column.toggleSorting()}>
      Customer
      {!isSorted ? (
        <ArrowUpDown className="ml-2 size-3.5" />
      ) : isSorted === "asc" ? (
        <ArrowUp className="ml-2 size-3.5" />
      ) : (
        <ArrowDown className="ml-2 size-3.5" />
      )}
    </Button>
  );
}

