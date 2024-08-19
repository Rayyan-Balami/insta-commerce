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
import AlertDialog from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";

const initialData = [
  {
    id: "5e4d3",
    image:
      "https://i.pinimg.com/564x/4c/01/56/4c01564b2bb728c2d34873b3cf317f48.jpg",
    name: "Apple Apple Apple Apple Apple",
    quantity: 2,
    price: 1,
    checked: true,
  },
  {
    id: "t3r4d",
    image:
      "https://i.pinimg.com/564x/4c/01/56/4c01564b2bb728c2d34873b3cf317f48.jpg",
    name: "Banana",
    quantity: 1,
    price: 1,
    checked: false,
  },
  {
    id: "g7r4h",
    image:
      "https://i.pinimg.com/564x/4c/01/56/4c01564b2bb728c2d34873b3cf317f48.jpg",
    name: "Cherry",
    quantity: 3,
    price: 1,
    checked: true,
  },
  {
    id: "1e4d3",
    image:
      "https://i.pinimg.com/564x/4c/01/56/4c01564b2bb728c2d34873b3cf317f48.jpg",
    name: "Date",
    quantity: 4,
    price: 1,
    checked: false,
  },
  {
    id: "2e4d3",
    image:
      "https://i.pinimg.com/564x/4c/01/56/4c01564b2bb728c2d34873b3cf317f48.jpg",
    name: "Elderberry",
    quantity: 4,
    price: 1,
    checked: false,
  },
  {
    id: "0e4d3",
    image:
      "https://i.pinimg.com/564x/4c/01/56/4c01564b2bb728c2d34873b3cf317f48.jpg",
    name: "Fig",
    quantity: 4,
    price: 1,
    checked: false,
  },
];

export default function ProductTable() {
  const [data, setData] = useState(initialData);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState(
    initialData.reduce((acc, row) => {
      if (row.checked) {
        acc[row.id] = true;
      }
      return acc;
    }, {})
  );
  const [sorting, setSorting] = useState([]);

  const [pageSize, setPageSize] = useState(10);

  // Function to handle quantity change
  const handleQuantityChange = (row, type, value) => {
    let newValue;

    switch (type) {
      case "increment":
        newValue = row.quantity + 1;
        break;
      case "decrement":
        newValue = Math.max(1, row.quantity - 1);
        break;
      case "set":
        newValue = Math.max(1, value); // Ensure the value is at least 1
        break;
      default:
        return;
    }

    setData((prev) =>
      prev.map((r) => (r.id === row.id ? { ...r, quantity: newValue } : r))
    );
  };

  const removeCheckedItems = () => {
    setData((prevData) => prevData.filter((row) => !row.checked));
    //set the row selection to empty object cuz it itself is to store the checked items
    setRowSelection({});
  };

  //also toggle the row selection on the basis of row id in data like in quantity and removeCartItems
  const handleCheckboxChange = (rowId, isChecked) => {
    setData((prevData) =>
      prevData.map((row) => ({
        ...row,
        checked:
          rowId === "selectAll"
            ? isChecked
            : row.id === rowId
            ? isChecked
            : row.checked,
      }))
    );

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
    columns: createColumns(handleQuantityChange, handleCheckboxChange),
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

  const searchColumns = [
    {
      label: "Name",
      column: "name",
    },
  ];

  return (
    <>
      <TableControls table={table} searchColumns={searchColumns}>
        <AlertDialog
          title="Remove Cart Items"
          description="This action will remove all the checked items from the cart. Are you sure you want to proceed?"
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
