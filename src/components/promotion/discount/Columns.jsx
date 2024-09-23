// Columns.js
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, ArrowUpDown } from "lucide-react";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { TableColumnSort } from "@/components/ui/TableColumnSort";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, SquarePen } from "lucide-react";

export const createColumns = (
  handleCheckboxChange,
  setIsEdit,
  setEditDataID
) => [
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
          handleCheckboxChange(row.original.$id, !!value); // Use the combined function
          row.toggleSelected(!!value);
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <TableColumnSort column={column} />,
    cell: ({ row }) => (
      <div className="min-w-40 space-y-1">
        <p className="capitalize line-clamp-2">{row.original.name}</p>
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize whitespace-nowrap">
        {row.original.type === "products" || row.original.type === "categories"
          ? `${row.original.type} - ${row.original[row.original.type].length}`
          : "All"}
      </Badge>
    ),
  },
  {
    accessorKey: "DiscountRate",
    header: "Discount Rate",
    cell: ({ row }) => (
      <div className="min-w-40 space-y-1">
        <div className="flex items-center space-x-2">
          <p className="capitalize line-clamp-2">
            {row.original.discountRate} %
          </p>
          <p className="text-muted-foreground text-xs italic">
            {row.original.usagePeriod === "limitedDay"
              ? `/ ${row.original.limitedUsage} days`
              : "/ No Limit"}
          </p>
        </div>
        {row.original.minimumPurchaseAmount && (
          <p className="text-muted-foreground text-xs italic">
            {`Min Purchase Amt: ${row.original.minimumPurchaseAmount}`}
          </p>
        )}
        {row.original.maximumDiscountAmount && (
          <p className="text-muted-foreground text-xs italic">
            {`Max Discount Amt: ${row.original.maximumDiscountAmount}`}
          </p>
        )}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setIsEdit(true);
                setEditDataID(row.original.$id);
              }}
            >
              <SquarePen className="size-3.5 mr-2" />
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
