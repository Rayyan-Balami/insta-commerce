// Columns.js
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Video,
  Image,
  MoreHorizontal,
  Eye,
  SquarePen,
  TicketPercent,
  Percent,
} from "lucide-react";
import * as React from "react";
import { TableColumnSort } from "@/components/ui/TableColumnSort";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { calculateDiscountedPrice } from "../ProductCard";



export const createColumns = (handleCheckboxChange, setViewProductID) => [
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
      <div className="relative w-fit">
        <img
          src={row.original.imagePreviews[0]}
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
    header: ({ column }) => <TableColumnSort column={column} />,
    cell: ({ row }) => (
      <div className="min-w-40">
        <p className="capitalize line-clamp-1">{row.original.name}</p>
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "variants",
    header: "Variants",
    cell: ({ row }) => <Badge variant="outline" className="whitespace-nowrap">
      {row.original.skus.length} - Variants
      </Badge>,
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
    accessorKey: "discountName",
    header: "Discount Name",
    cell: ({ row }) => (
      <div className="min-w-40 space-y-1">
        {row.original.discount ? (
          <Badge
            variant="secondary"
            className="border border-primary/10 gap-2 uppercase rounded-md"
          >
            <Percent className="size-[1rem]" />
            {row.original.discount.name}
          </Badge>
        ) : (
          <p className="text-center">-</p>
        )}
      </div>
    ),
    filterFn: (row, columnId, filterValue) => {
      const targetName = row.original.discount ? row.original.discount.name : "";
      return targetName.toLowerCase().includes(filterValue.toLowerCase());
    },
  },
  {
    accessorKey: "promoCode",
    header: "Promo Code",
    cell: ({ row }) => (
      <div className="min-w-40 space-y-1">
        {row.original.promoCode ? (
          <Badge
            variant="secondary"
            className="border border-primary/10 gap-2 uppercase rounded-md"
          >
            <TicketPercent className="size-[1.15rem]" />
            {row.original.promoCode.code}
          </Badge>
        ) : (
          <p className="text-center">-</p>
        )}
      </div>
    ),
    filterFn: (row, columnId, filterValue) => {
      const targetName = row.original.promoCode ? row.original.promoCode.code : "";
      return targetName.toLowerCase().includes(filterValue.toLowerCase());
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => <TableColumnSort column={column} />,
    cell: ({ row }) => {
      const product = row.original;
      const selectedVarient = product.skus[0];
      const discountedPrice = calculateDiscountedPrice(product, selectedVarient.price);
      const originalPrice = selectedVarient.price.toFixed(2);
      const [integerPart, decimalPart] = originalPrice.split(".");
  
      return (
        <div className="flex flex-col gap-0.5 whitespace-nowrap">
          {discountedPrice !== null && (
            <span className="text-xs font-semibold italic text-muted-foreground line-through">
              Rs {integerPart}
              <span className="font-normal">.{decimalPart}</span>
            </span>
          )}
          <div className="flex items-center gap-2">
            <span>
              {discountedPrice !== null ? (
                discountedPrice === 0 ? (
                  "Free"
                ) : (
                  <>
                    Rs {Math.floor(discountedPrice)}
                    <span className="text-xs font-normal">
                      .{discountedPrice.split(".")[1]}
                    </span>
                  </>
                )
              ) : (
                <>
                  Rs {integerPart}
                  <span className="text-sm font-normal">.{decimalPart}</span>
                </>
              )}
            </span>
            {product.discount && (
              <Badge variant="secondary" className="border border-primary/10">
                - {product.discount.discountRate}%
              </Badge>
            )}
          </div>
        </div>
      );
    },
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const priceA = rowA.original.skus[0].price;
      const priceB = rowB.original.skus[0].price;
      return priceA - priceB;
    },
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
              onClick={() => setViewProductID(row.original.$id)}
            >
              <Eye className="size-3.5 mr-2" />
              SKU
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/edit-product/${row.original.$id}`}>
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

// // Columns.js
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";
// import {
//   Video,
//   ArrowUpDown,
//   Image,
//   MoreHorizontal,
//   Eye,
//   SquarePen,
// } from "lucide-react";
// import * as React from "react";
// import { Badge } from "@/components/ui/badge";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Link } from "react-router-dom";
// import {TableColumnSort } from "@/components/ui/TableColumnSort";

// // data structure reference for the table
// // {
// //   name: "Apple",
// //   description: "Fresh and juicy apples.",
// //   skus: [
// //     {
// //       color: "Red",
// //       price: "1",
// //       stock: "2",
// //       size: ["Small"],
// //     },
// //     {
// //       color: "Green",
// //       price: "1.5",
// //       stock: "5",
// //       size: ["Medium"],
// //     },
// //   ],
// //   category: "Fruits",
// //   status: "Available",
// //   images: [
// //     "https://i.pinimg.com/564x/4c/01/56/4c01564b2bb728c2d34873b3cf317f48.jpg",
// //     "https://i.pinimg.com/564x/5c/02/57/5c0257b2bb728c2d34873b3cf317f48.jpg",
// //   ],
// //   video: "",
// // },

// export const createColumns = (handleCheckboxChange) => [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => {
//           handleCheckboxChange("selectAll", !!value); // Use the combined function
//           table.toggleAllPageRowsSelected(!!value);
//         }}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => {
//           handleCheckboxChange(row.original.id, !!value); // Use the combined function
//           row.toggleSelected(!!value);
//         }}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "image",
//     header: "Image",
//     cell: ({ row }) => (
//       <div className="relative w-fit">
//         <img
//           src={row.original.images[0]}
//           alt=""
//           className="border rounded-md min-h-20 min-w-20 max-h-20 max-w-20 aspect-square object-cover object-center"
//         />
//         <Badge
//           variant="outline"
//           className="absolute -top-2 -left-2 gap-1 bg-background"
//         >
//           <Image className="size-3.5" /> : {row.original.images.length}
//         </Badge>
//         {row.original.video && (
//           <Badge
//             variant="outline"
//             className="absolute -bottom-2 -right-2 gap-1 bg-background"
//           >
//             <Video className="size-3.5" /> : 1
//           </Badge>
//         )}
//       </div>
//     ),
//   },
//   {
//     accessorKey: "name",
//     header: ({ column }) => <TableColumnSort column={column}/>,
//     cell: ({ row }) => (
//       <div className="min-w-40">
//         <p className="capitalize line-clamp-1">{row.original.name}</p>
//         <p className="text-muted-foreground">{row.original.description}</p>
//       </div>
//     ),
//     enableSorting: true,
//   },
//   {
//     accessorKey: "category",
//     header: "Category",
//     cell: ({ row }) => <Badge variant="outline">{row.original.category}</Badge>,
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => <Badge variant="outline">{row.original.status}</Badge>,
//   },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const payment = row.original;

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(payment.id)}
//             >
//               <Eye className="size-3.5 mr-2" />
//               SKU
//             </DropdownMenuItem>
//             <DropdownMenuItem asChild>
//               <Link to={`/edit-products/${payment.id}`}>
//               <SquarePen className="size-3.5 mr-2" />
//               Edit
//               </Link>
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];
