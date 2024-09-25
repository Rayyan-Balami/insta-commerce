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
import { Badge } from "@/components/ui/badge";
import { useSelector, useDispatch } from "react-redux";
import { deleteDiscount } from "@/store/promotionSlice";
import promotionService from "@/appwrite/promotion";
import { toast } from "sonner";
import { getENV } from "@/getENV";

export default function DiscountTable({ setIsEdit, setEditDataID }) {
  const dispatch = useDispatch();
  const initialData = useSelector(
    (state) => state.promotion.promotions.discounts
  );

  const [data, setData] = useState(initialData);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [sorting, setSorting] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleCheckboxChange = (rowId, isChecked) => {
    if (rowId === "selectAll") {
      const updatedRowSelection = data.reduce((acc, { $id }) => {
        acc[$id] = isChecked;
        return acc;
      }, {});
      console.log(updatedRowSelection);
      setRowSelection(updatedRowSelection);
    } else {
      const updatedRowSelection = { ...rowSelection, [rowId]: isChecked };
      setRowSelection(updatedRowSelection);
    }
  };

  const handleDelete = async () => {
    try {
      const ids = Object.keys(rowSelection);
      const promises = ids.map(($id) => promotionService.deleteDiscount($id));
      const results = await Promise.all(promises);
      const success = results.every(({ success }) => success);

      if (success) {
        ids.forEach(($id) => {
          dispatch(deleteDiscount($id));
        });
        localStorage.setItem(
          "promotions_timestamp",
          (Date.now() - parseInt(getENV("CACHE_LIMIT"), 10)).toString()
        );
        toast.success("Discount(s) deleted successfully.");
      } else {
        toast.error("Failed to delete discount(s).");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting discount(s).");
    }
  };

  useEffect(() => {
    console.log(rowSelection);
  }, [rowSelection]);

  const table = useReactTable({
    data,
    columns: createColumns(
      handleCheckboxChange,
      setIsEdit,
      setEditDataID,
      useSelector((state) => state.product.products),
      [
        {
          $id: "1",
          name: "Electronics Electronics Electronics Electronics Electronics Electronics Electronics",
        },
        { $id: "2", name: "Clothing" },
        { $id: "3", name: "Home & Furniture" },
      ]
    ),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { columnFilters, columnVisibility, rowSelection, sorting },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getRowId: (row) => row.$id, // Ensure this matches the unique identifier in your data
  });

  const searchColumns = [
    { label: "Name", column: "name" },
    { label: "Target", column: "target" },
  ];

  const filters = [
    {
      label: "Type",
      column: "type",
      options: [
        { label: "All", value: "all" },
        { label: "Products", value: "products" },
        { label: "Categories", value: "categories" },
      ],
    },
  ];

  return (
    <>
      <TableControls
        table={table}
        searchColumns={searchColumns}
        filters={filters}
      >
        <AlertDialog
          title={
            <>
              <span>Remove Discounts</span>{" "}
              <Badge variant="outline">
                {Object.keys(rowSelection).length}
              </Badge>
            </>
          }
          description="This action will remove all the selected discounts. Are you sure you want to proceed?"
          size="sm"
          variant="destructive"
          acceptLabel="Delete"
          onAccept={handleDelete}
          disabled={!Object.keys(rowSelection).length}
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
