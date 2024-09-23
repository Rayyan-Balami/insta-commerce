// Columns.js
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, ArrowUpDown } from "lucide-react";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { TableColumnSort } from "@/components/ui/TableColumnSort";
import { Badge } from "@/components/ui/badge";
import { parseISO, format } from "date-fns";
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

export const createColumns = (handleCheckboxChange) => [
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
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="aspect-[2.76/1]  min-h-20 max-w-sm">
        <img
          src={row.original.preview}
          alt=""
          className="w-full h-full border rounded-md object-cover object-center"
          loading="lazy"
        />
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize whitespace-nowrap">
        {row.original.mimeType.split("/")[1]}
      </Badge>
    ),
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize whitespace-nowrap">
        {(row.original.sizeOriginal / 1024 / 1024).toFixed(2)} MB
      </Badge>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize whitespace-nowrap">
        {format(parseISO(row.original.$createdAt), "do MMM yyyy - h:mm a")}{" "}
      </Badge>
    ),
  },
];
