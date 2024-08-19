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
import { TableColumnSort } from "../ui/TableColumnSort";

// data structure reference for the table
// {
//   orderId: "Oe31b70H",
//   careatedDate: "2023-11-23",
//   lastUpdated: "2023-11-23",
//   status: "Delivered",
//   orderDetails: [
//     {
//       productId: "GLM-123",
//       productName: "Glimmer Lamps",
//       quantity: 2,
//       price: 250.0,
//       variant: {
//         color: "Black",
//         size: "M",
//       },
//     },
//   ],
//   subtotal: 500.0,
//   delivery: 0.0,
//   discount: 25.0,
//   promoCode: {
//     code: "HuKut500",
//     discount: 25.0,
//   },
//   total: 475.0,
//   customerInformation: {
//     name: "Liam Johnson",
//     email: "liam@acme.com",
//     phone: "+1 234 567 890",
//   },
//   shippingInformation: {
//     address: "Nayabazar 16",
//     city: "Kathmandu",
//     landmark: "Near Bhatbhateni Supermarket",
//     deliveryZone: "KTM, inside ringroad",
//     deliveryNote: "Please deliver the package before 6 PM.",
//   },
//   paymentAndDelivery: {
//     paymentMethod: "e-Sewa",
//     deliveryMethod: "Pickup",
//   },
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
    accessorKey: "customerInformation",
    header: ({ column }) => <TableColumnSort column={column} />,
    cell: ({ row }) => {
      const { name, email, phone } = row.original.customerInformation;
      return (
        <div className="space-y-1">
          <p className="font-semibold">{name}</p>
          <p className="text-muted-foreground">{email}</p>
          <p className="text-muted-foreground">{phone}</p>
        </div>
      );
    },
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const nameA = rowA.original.customerInformation.name.toLowerCase();
      const nameB = rowB.original.customerInformation.name.toLowerCase();
      return nameA.localeCompare(nameB);
    },
    filterFn: (row, columnId, filterValue) => {
      const name = row.original.customerInformation.name.toLowerCase();
      const email = row.original.customerInformation.email.toLowerCase();
      const phone = row.original.customerInformation.phone.toLowerCase();
      return (
        name.includes(filterValue.toLowerCase()) ||
        email.includes(filterValue.toLowerCase()) ||
        phone.includes(filterValue.toLowerCase())
      );
    },
  },
  {
    accessorKey: "shippingInformation",
    header: "Shipping",
    cell: ({ row }) => {
      const { address, city } = row.original.shippingInformation;
      return (
        <div className="space-y-1">
          <p>{address}</p>
          <p>{city}</p>
        </div>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const address = row.original.shippingInformation.address.toLowerCase();
      const city = row.original.shippingInformation.city.toLowerCase();
      return (
        address.includes(filterValue.toLowerCase()) ||
        city.includes(filterValue.toLowerCase())
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge variant="outline">{row.original.status}</Badge>,
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => <span>{row.original.total}</span>,
  },
  {
    accessorKey: "createdDate",
    header: "Date",
    cell: ({ row }) => <span>{row.original.createdDate}</span>,
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
              Summary
            </DropdownMenuItem>
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Pending</DropdownMenuItem>
            <DropdownMenuItem>Delivered</DropdownMenuItem>
            <DropdownMenuItem>Cancelled</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
