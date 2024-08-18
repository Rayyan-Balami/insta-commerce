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
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import AlertDialog from "@/components/ui/alert-dialog";

const initialData = [
  {
    id: "1A5xZeb",
    name: "Apple",
    description: "Fresh and juicy apples.",
    skus: [
      {
        color: "Red",
        price: "1",
        stock: "2",
        size: ["Small"],
      },
      {
        color: "Green",
        price: "1.5",
        stock: "5",
        size: ["Medium"],
      },
    ],
    category: "Fruits",
    status: "Available",
    images: [
      "https://i.pinimg.com/564x/4c/01/56/4c01564b2bb728c2d34873b3cf317f48.jpg",
      "https://i.pinimg.com/564x/5c/02/57/5c0257b2bb728c2d34873b3cf317f48.jpg",
    ],
    video: "https://www.youtube.com/watch?v=9XaS93WMRQQ",
  },
  {
    id: "2B6xYec",
    name: "Banana",
    description: "Ripe and sweet bananas.",
    skus: [
      {
        color: "Yellow",
        price: "1",
        stock: "1",
        size: ["Medium"],
      },
      {
        color: "Green",
        price: "0.8",
        stock: "10",
        size: ["Small"],
      },
    ],
    category: "Fruits",
    status: "Out of Stock",
    images: [
      "https://i.pinimg.com/564x/4c/01/56/4c01564b2bb728c2d34873b3cf317f48.jpg",
      "https://i.pinimg.com/564x/6c/03/58/6c0358b2bb728c2d34873b3cf317f48.jpg",
    ],
    video: "",
  },
  {
    id: "3C7xZed",
    name: "Cherry",
    description: "Delicious red cherries.",
    skus: [
      {
        color: "Red",
        price: "1",
        stock: "3",
        size: ["Small"],
      },
      {
        color: "Dark Red",
        price: "1.2",
        stock: "8",
        size: ["Medium"],
      },
    ],
    category: "Fruits",
    status: "Available",
    images: [
      "https://i.pinimg.com/564x/4c/01/56/4c01564b2bb728c2d34873b3cf317f48.jpg",
      "https://i.pinimg.com/564x/7c/04/59/7c0459b2bb728c2d34873b3cf317f48.jpg",
    ],
    video: "",
  },
  {
    id: "4D8xYef",
    name: "Date",
    description: "Sweet and chewy dates.",
    skus: [
      {
        color: "Brown",
        price: "1",
        stock: "4",
        size: ["Small"],
      },
      {
        color: "Dark Brown",
        price: "1.3",
        stock: "6",
        size: ["Large"],
      },
    ],
    category: "Fruits",
    status: "Out of Stock",
    images: [
      "https://i.pinimg.com/564x/4c/01/56/4c01564b2bb728c2d34873b3cf317f48.jpg",
      "https://i.pinimg.com/564x/8c/05/60/8c0560b2bb728c2d34873b3cf317f48.jpg",
    ],
    video: "",
  },
  // Add more products similarly...
];

export default function ProductTable() {
  const [data, setData] = useState(initialData);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [viewSku, setViewSku] = useState({});

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

  //TODO: move this to parent or redux cuz, cart summary is not a part of this component
  const handleViewSku = (rowId) => {
    setViewSku(data.find((row) => row.id === rowId));
  };

  useEffect(() => {
    console.log(data, rowSelection);
  }, [data, rowSelection]);

  const table = useReactTable({
    data,
    columns: createColumns(handleCheckboxChange, handleViewSku),
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
        { label: "Available", value: "Available" },
        { label: "Out of Stock", value: "Out of Stock" },
      ],
    },
    {
      label: "Category",
      column: "category",
      options: [
        { label: "Fruits", value: "Fruits" },
        // Add more categories if needed
      ],
    },
    // Add more filters as needed
  ];

  return (
    <>
      <TableControls table={table} searchColumns={["name"]} filters={filters}>
        <AlertDialog
          title="Delete Selected Items"
          description="This action will remove selected items from Database. Are you sure you want to proceed?"
          size="sm"
          variant="destructive"
          acceptLabel="Delete"
          onClick={removeCheckedItems}
          disabled={Object.keys(rowSelection).length === 0}
          triggerLabel={<Trash className="size-3.5" />}
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
