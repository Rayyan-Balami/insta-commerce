import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { createColumns } from "./Columns"; // Updated import
import { TableContainer } from "@/components/ui/TableContainer";
import { TableControls } from "@/components/ui/TableControls";
import { TablePagination } from "@/components/ui/TablePagination";
import { Trash } from "lucide-react";
import AlertDialog from "@/components/ui/alert-dialog";

const initialData = [
  {
    id: "Lm45f8TY",
    createdDate: "2023-11-17",
    lastUpdated: "2023-11-19",
    status: "Cancelled",
    orderDetails: [
      {
        productId: "CKR-101",
        productName: "Cookware Set",
        category: "Lamps",
        quantity: 1,
        price: 100.0,
        variant: {
          color: "Silver",
          size: "Standard",
        },
      },
    ],
    subtotal: 100.0,
    delivery: 0.0,
    discount: 10.0,
    promoCode: {
      code: "COOK10",
      discount: 10.0,
    },
    total: 90.0,
    customerInformation: {
      name: "Emily Clark",
      email: "emily.clark@acme.com",
      phone: "+1 555 123 456",
    },
    shippingInformation: {
      address: "Bhaktapur 7",
      city: "Bhaktapur",
      landmark: "Near Bhaktapur Durbar Square",
      deliveryZone: "BKT, outside ringroad",
      deliveryNote: "Please cancel the order, no longer needed.",
    },
    paymentAndDelivery: {
      paymentMethod: "Cash on Delivery",
      deliveryMethod: "Standard",
    },
  },
  {
    id: "Xt93r7UF",
    createdDate: "2023-11-15",
    lastUpdated: "2023-11-16",
    status: "Pending",
    orderDetails: [
      {
        productId: "LMP-333",
        productName: "Study Lamp",
        category: "shoes",
        quantity: 2,
        price: 40.0,
        variant: {
          color: "Blue",
          size: "M",
        },
      },
    ],
    subtotal: 80.0,
    delivery: 5.0,
    discount: 0.0,
    promoCode: {
      code: "",
      discount: 0.0,
    },
    total: 85.0,
    customerInformation: {
      name: "Olivia Brown",
      email: "olivia.brown@acme.com",
      phone: "+1 111 222 333",
    },
    shippingInformation: {
      address: "New Road 2",
      city: "Kathmandu",
      landmark: "Near Ranjana Galli",
      deliveryZone: "KTM, inside ringroad",
      deliveryNote: "Call me upon arrival.",
    },
    paymentAndDelivery: {
      paymentMethod: "PayPal",
      deliveryMethod: "Express",
    },
  },
  {
    id: "2t8Yf7U3",
    createdDate: "2023-11-15",
    lastUpdated: "2023-11-16",
    status: "Pending",
    orderDetails: [
      {
        productId: "LMP-333",
        productName: "Study Lamp",
        category: "shoes",
        quantity: 2,
        price: 40.0,
        variant: {
          color: "Blue",
          size: "M",
        },
      },
    ],
    subtotal: 80.0,
    delivery: 5.0,
    discount: 0.0,
    promoCode: {
      code: "",
      discount: 0.0,
    },
    total: 85.0,
    customerInformation: {
      name: "Rachel Green",
      email: "rachelgreen.acme.com",
      phone: "+977 111 222 333",
    },
    shippingInformation: {
      address: "New Road 2",
      city: "Kathmandu",
      landmark: "Near Ranjana Galli",
      deliveryZone: "KTM, inside ringroad",
      deliveryNote: "Call me upon arrival.",
    },
    paymentAndDelivery: {
      paymentMethod: "PayPal",
      deliveryMethod: "Express",
    },
  },
];

export default function OrderTable() {
  const [data, setData] = useState(initialData);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentRow, setCurrentRow] = useState(null);

  const removeCheckedItems = () => {
    setData((prevData) => prevData.filter((row) => !rowSelection[row.id]));
    // Reset row selection
    setRowSelection({});
  };

  const handleCheckboxChange = (rowId, isChecked) => {
    setRowSelection((prevSelection) => {
      if (rowId === "selectAll") {
        return isChecked
          ? Object.fromEntries(data.map((row) => [row.id, true]))
          : {};
      } else {
        const { [rowId]: _, ...rest } = prevSelection;
        return isChecked ? { ...prevSelection, [rowId]: true } : rest;
      }
    });
  };

  useEffect(() => {
    console.log(data, rowSelection);
  }, [data, rowSelection]);


  const table = useReactTable({
    data,
    columns: createColumns(handleCheckboxChange),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      columnVisibility,
      rowSelection,
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getRowId: (row) => row.id,
  });

  const filters = [
    {
      label: "Status",
      column: "status",
      options: [
        { label: "Pending", value: "Pending" },
        { label: "Cancelled", value: "Cancelled" },
        { label: "Delivered", value: "Delivered" },
      ],
    },
    // Add more filters
  ];

  const searchColumns = [
    {
      label: "Customer Information",
      column: "customerInformation",
    },
    {
      label: "Shipping Information",
      column: "shippingInformation",
    },
    {
      label: "Status",
      column: "status",
    },
    {
      label: "date",
      column: "createdDate",
    },
    // Add more search columns as needed
  ];

  return (
    <>
      <TableControls table={table} searchColumns={searchColumns} filters={filters}>
        <AlertDialog
          title="Delete Selected Items"
          description="This action will remove selected items from Database. Are you sure you want to proceed?"
          size="sm"
          variant="destructive"
          acceptLabel="Delete"
          onClick={removeCheckedItems}
          disabled={Object.keys(rowSelection).length === 0}
          triggerLabel={<Trash className="size-4" />}
        />
      </TableControls>
      <TableContainer table={table} />
      <TablePagination
        table={table}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </>
  );
}
