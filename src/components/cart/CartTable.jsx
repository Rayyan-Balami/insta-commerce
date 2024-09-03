import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { createColumns } from "./Columns";
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
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [sorting, setSorting] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setData(cartItems);
    setRowSelection(cartItems.reduce((acc, { id, isChecked }) => {
      if (isChecked) acc[id] = true;
      return acc;
    }, {}));
  }, [cartItems]);

  const handleQuantityChange = (row, type, value) => {
    const newValue = Math.max(1, type === "increment" ? row.quantity + 1 : type === "decrement" ? row.quantity - 1 : value);
    dispatch(updateQuantity({ id: row.id, quantity: newValue }));
  };

  const removeCheckedItems = () => {
    data.filter(({ isChecked }) => isChecked).forEach(({ id }) => dispatch(removeFromCart(id)));
    setRowSelection({});
  };

  const handleCheckboxChange = (rowId, isChecked) => {
    if (rowId === "selectAll") {
      data.forEach((row) => {
        const update = { id: row.id, isChecked };
        dispatch(changeChecked(update));
      });
    } else {
      const update = { id: rowId, isChecked };
      dispatch(changeChecked(update));
    }
  };

  const table = useReactTable({
    data,
    columns: createColumns(handleQuantityChange, handleCheckboxChange),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { columnFilters, columnVisibility, rowSelection, sorting },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getRowId: (row) => row.id,
  });

  return (
    <>
      <TableControls table={table} searchColumns={[{ label: "Name", column: "name" }]}>
        <AlertDialog
          title={<><span>Remove Cart Items</span> <Badge variant="outline">{Object.keys(rowSelection).length}</Badge></>}
          description="This action will remove all the checked items from the cart. Are you sure you want to proceed?"
          size="sm"
          variant="destructive"
          acceptLabel="Delete"
          onAccept={removeCheckedItems}
          disabled={!Object.keys(rowSelection).length}
          triggerLabel={<Trash className="size-4" />}
        />
      </TableControls>
      <TableContainer table={table} />
      <TablePagination table={table} pageSize={pageSize} setPageSize={setPageSize} />
    </>
  );
}
