// Columns.js
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Video,
  ArrowUpDown,
  Image,
  MoreHorizontal,
  Eye,
  SquarePen,
} from "lucide-react";
import * as React from "react";
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
import { Link } from "react-router-dom";

// data structure reference for the table
// {
//   name: "Apple",
//   description: "Fresh and juicy apples.",
//   skus: [
//     {
//       color: "Red",
//       price: "1",
//       stock: "2",
//       size: ["Small"],
//     },
//     {
//       color: "Green",
//       price: "1.5",
//       stock: "5",
//       size: ["Medium"],
//     },
//   ],
//   category: "Fruits",
//   status: "Available",
//   images: [
//     "https://i.pinimg.com/564x/4c/01/56/4c01564b2bb728c2d34873b3cf317f48.jpg",
//     "https://i.pinimg.com/564x/5c/02/57/5c0257b2bb728c2d34873b3cf317f48.jpg",
//   ],
//   video: "",
// },

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
      <div className="relative w-fit">
        <img
          src={row.original.images[0]}
          alt=""
          className="border rounded-md min-h-20 min-w-20 max-h-20 max-w-20 aspect-square object-cover object-center"
        />
        <Badge
          variant="outline"
          className="absolute -top-2 -left-2 gap-1 bg-background"
        >
          <Image className="size-3.5" /> : {row.original.images.length}
        </Badge>
        {row.original.video && (
          <Badge
            variant="outline"
            className="absolute -bottom-2 -right-2 gap-1 bg-background"
          >
            <Video className="size-3.5" /> : 1
          </Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="min-w-40">
        <p className="capitalize line-clamp-1">{row.original.name}</p>
        <p className="text-muted-foreground">{row.original.description}</p>
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <Badge variant="outline">{row.original.category}</Badge>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge variant="outline">{row.original.status}</Badge>,
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
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              <Eye className="size-3.5 mr-2" />
              SKU
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/edit-products/${payment.id}`}>
              <SquarePen className="size-3.5 mr-2" />
              Edit
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
