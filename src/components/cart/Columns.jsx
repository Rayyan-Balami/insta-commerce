// Columns.js
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, ArrowUpDown } from "lucide-react";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { TableColumnSort } from "../ui/TableColumnSort";

export const createColumns = (handleQuantityChange, handleCheckboxChange) => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => {
          handleCheckboxChange("selectAll", !!value); // Use the combined function
          table.toggleAllPageRowsSelected(!!value);
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          handleCheckboxChange(row.original.id, !!value); // Use the combined function
          row.toggleSelected(!!value);
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="aspect-square min-h-20 max-w-20">
        <img
          src={row.original.imagePreview}
          alt=""
          className="w-full h-full border rounded-md object-cover object-center"
          loading="lazy"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => <TableColumnSort column={column} />,
    cell: ({ row }) => (
      <div className="min-w-40 space-y-1">
        <p className="capitalize line-clamp-2">{row.original.name}</p>
        <p className="text-muted-foreground text-xs italic">
          Variant: {row.original.sku.color}{" "}
          <span className="capitalize">({row.original.sku.size})</span>
        </p>
        <p className="text-muted-foreground text-xs italic">
          Rs {row.original.sku.price.toFixed(2)}
        </p>
      </div>
    ),
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const nameA = rowA.original.name.toLowerCase();
      const nameB = rowB.original.name.toLowerCase();
      return nameA.localeCompare(nameB);
    },
  },
  {
    id: "quantity",
    header: "Quantity",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          disabled={row.original.quantity <= 1}
          onClick={() => handleQuantityChange(row.original, "decrement")}
        >
          <MinusIcon className="w-4 h-4" />
        </Button>
        <Input
          type="number"
          min="1"
          max={row.original.sku.stock}
          value={row.original.quantity}
          onChange={(e) => {
            const parsedValue = parseInt(e.target.value, 10);
            const validValue =
              isNaN(parsedValue) || parsedValue < 1
                ? 1
                : Math.min(parsedValue, selectedVarient.stock);
            handleQuantityChange(row.original, "set", validValue);
          }}
          className="h-9 w-16 text-center"
        />
        <Button
          variant="outline"
          size="sm"
          disabled={row.original.quantity >= row.original.sku.stock}
          onClick={() => handleQuantityChange(row.original, "increment")}
        >
          <PlusIcon className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
  {
    id: "total",
    header: "Total",
    cell: ({ row }) => (
      <p className="whitespace-nowrap font-semibold">
        Rs {(row.original.sku.price * row.original.quantity).toFixed(2)}
      </p>
    ),
  },
];
