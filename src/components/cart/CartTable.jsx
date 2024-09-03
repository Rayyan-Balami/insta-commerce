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
import { Badge } from "../ui/badge";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, changeChecked, removeFromCart } from "@/store/cartSlice";

export default function ProductTable() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [data, setData] = useState(cartItems);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState(
    cartItems.reduce((acc, row) => {
      if (row.checked) {
        acc[row.id] = true;
      }
      return acc;
    }, {})
  );
  const [sorting, setSorting] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  // Sync data state with Redux store's cartItems state
  useEffect(() => {
    setData(cartItems);
  }, [cartItems]);

  // Handle quantity change and dispatch to Redux
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

    dispatch(updateQuantity({ id: row.id, quantity: newValue }));
  };

  // Remove checked items from cart and Redux store
  const removeCheckedItems = () => {
    const itemsToRemove = data.filter((row) => row.checked).map((row) => row.id);
    itemsToRemove.forEach((id) => dispatch(removeFromCart(id)));
    setRowSelection({});
  };

  // Handle checkbox change and dispatch to Redux
  const handleCheckboxChange = (rowId, isChecked) => {
    if (rowId === "selectAll") {
      setRowSelection(isChecked ? Object.fromEntries(data.map((row) => [row.id, true])) : {});
      data.forEach((row) => dispatch(changeChecked({ id: row.id, checked: isChecked })));
    } else {
      dispatch(changeChecked({ id: rowId, checked: isChecked }));
    }
  };

  // useEffect(() => {
  //   console.log(data, rowSelection);
  // }, [data, rowSelection]);

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
          title={
            <>
              <span>Remove Cart Items</span>{" "}
              <Badge variant="outline">{Object.keys(rowSelection).length}</Badge>
            </>
          }
          description="This action will remove all the checked items from the cart. Are you sure you want to proceed?"
          size="sm"
          variant="destructive"
          acceptLabel="Delete"
          onAccept={removeCheckedItems}
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
