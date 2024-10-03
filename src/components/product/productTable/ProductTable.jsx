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
import { deletePromoCode } from "@/store/promotionSlice";
import promotionService from "@/appwrite/promotion";
import { toast } from "sonner";
import { getENV } from "@/getENV";
import useProductWithPromotions from "@/hooks/useProductWithPromotions";

export default function ProductTable({ setViewProductID}) {
  const dispatch = useDispatch();
  const initialData = useProductWithPromotions();

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
      const promises = ids.map(($id) => promotionService.deletePromoCode($id));
      const results = await Promise.all(promises);
      const success = results.every(({ success }) => success);

      if (success) {
        ids.forEach(($id) => {
          dispatch(deletePromoCode($id));
        });
        localStorage.setItem(
          "promotions_timestamp",
          (Date.now() - parseInt(getENV("CACHE_LIMIT"), 10)).toString()
        );
        toast.success("Promo code(s) deleted successfully.");
      } else {
        toast.error("Failed to delete promo code(s).");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting promo code(s).");
    }
  };

  useEffect(() => {
    console.log(rowSelection);
  }, [rowSelection]);

  const table = useReactTable({
    data,
    columns: createColumns(
      handleCheckboxChange,
      setViewProductID
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

  const filters = [
    {
      label: "Status",
      column: "status",
      options: [
        { label: "Active", value: "active" },
        { label: "Draft", value: "draft" },
        { label: "Archived", value: "archived" },
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

  const searchColumns = [
    {
      label: "Name",
      column: "name",
    },
    {
      label: "Discount Name",
      column: "discountName",
    },
    {
      label: "Promo Code",
      column: "promoCode",
    }
    // Add more search columns as needed
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
              <span>Remove Promo codes</span>{" "}
              <Badge variant="outline">
                {Object.keys(rowSelection).length}
              </Badge>
            </>
          }
          description="This action will remove all the selected promo codes. Are you sure you want to proceed?"
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

// import React, { useEffect, useState } from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getPaginationRowModel,
//   getFilteredRowModel,
//   getSortedRowModel,
// } from "@tanstack/react-table";
// import { createColumns } from "./Columns"; // Updated import
// import { TableContainer } from "@/components/ui/TableContainer";
// import { TableControls } from "@/components/ui/TableControls";
// import { TablePagination } from "@/components/ui/TablePagination";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Trash } from "lucide-react";
// import AlertDialog from "@/components/ui/alert-dialog";

// const initialData = [
//   {
//     id: "1A5xZeb",
//     name: "Apple",
//     description: "Fresh and juicy apples.",
//     skus: [
//       {
//         color: "Red",
//         price: "1",
//         stock: "2",
//         size: ["Small"],
//       },
//       {
//         color: "Green",
//         price: "1.5",
//         stock: "5",
//         size: ["Medium"],
//       },
//     ],
//     category: "Fruits",
//     status: "Available",
//     images: [
//       "https://i.pinimg.com/564x/4c/01/56/4c01564b2bb728c2d34873b3cf317f48.jpg",
//       "https://i.pinimg.com/564x/5c/02/57/5c0257b2bb728c2d34873b3cf317f48.jpg",
//     ],
//     video: "https://www.youtube.com/watch?v=9XaS93WMRQQ",
//   },
//   {
//     id: "2B6xYec",
//     name: "Banana",
//     description: "Ripe and sweet bananas.",
//     skus: [
//       {
//         color: "Yellow",
//         price: "1",
//         stock: "1",
//         size: ["Medium"],
//       },
//       {
//         color: "Green",
//         price: "0.8",
//         stock: "10",
//         size: ["Small"],
//       },
//     ],
//     category: "Fruits",
//     status: "Out of Stock",
//     images: [
//       "https://i.pinimg.com/564x/4c/01/56/4c01564b2bb728c2d34873b3cf317f48.jpg",
//       "https://i.pinimg.com/564x/6c/03/58/6c0358b2bb728c2d34873b3cf317f48.jpg",
//     ],
//     video: "",
//   },
//   {
//     id: "3C7xZed",
//     name: "Cherry",
//     description: "Delicious red cherries.",
//     skus: [
//       {
//         color: "Red",
//         price: "1",
//         stock: "3",
//         size: ["Small"],
//       },
//       {
//         color: "Dark Red",
//         price: "1.2",
//         stock: "8",
//         size: ["Medium"],
//       },
//     ],
//     category: "Fruits",
//     status: "Available",
//     images: [
//       "https://i.pinimg.com/564x/4c/01/56/4c01564b2bb728c2d34873b3cf317f48.jpg",
//       "https://i.pinimg.com/564x/7c/04/59/7c0459b2bb728c2d34873b3cf317f48.jpg",
//     ],
//     video: "",
//   },
//   {
//     id: "4D8xYef",
//     name: "Date",
//     description: "Sweet and chewy dates.",
//     skus: [
//       {
//         color: "Brown",
//         price: "1",
//         stock: "4",
//         size: ["Small"],
//       },
//       {
//         color: "Dark Brown",
//         price: "1.3",
//         stock: "6",
//         size: ["Large"],
//       },
//     ],
//     category: "Fruits",
//     status: "Out of Stock",
//     images: [
//       "https://i.pinimg.com/564x/4c/01/56/4c01564b2bb728c2d34873b3cf317f48.jpg",
//       "https://i.pinimg.com/564x/8c/05/60/8c0560b2bb728c2d34873b3cf317f48.jpg",
//     ],
//     video: "",
//   },
//   // Add more products similarly...
// ];

// export default function ProductTable() {
//   const [data, setData] = useState(initialData);
//   const [columnFilters, setColumnFilters] = useState([]);
//   const [columnVisibility, setColumnVisibility] = useState({});
//   const [rowSelection, setRowSelection] = useState({});
//   const [sorting, setSorting] = useState([]);
//   const [pageSize, setPageSize] = useState(10);
//   const [viewSku, setViewSku] = useState({});

//   const removeCheckedItems = () => {
//     setData((prevData) => prevData.filter((row) => !rowSelection[row.id]));
//     // Reset row selection
//     setRowSelection({});
//   };

//   const handleCheckboxChange = (rowId, isChecked) => {
//     setRowSelection((prevSelection) => {
//       if (rowId === "selectAll") {
//         return isChecked
//           ? Object.fromEntries(data.map((row) => [row.id, true]))
//           : {};
//       } else {
//         const { [rowId]: _, ...rest } = prevSelection;
//         return isChecked ? { ...prevSelection, [rowId]: true } : rest;
//       }
//     });
//   };

//   //TODO: move this to parent or redux cuz, cart summary is not a part of this component
//   const handleViewSku = (rowId) => {
//     setViewSku(data.find((row) => row.id === rowId));
//   };

//   useEffect(() => {
//     console.log(data, rowSelection);
//   }, [data, rowSelection]);

//   const table = useReactTable({
//     data,
//     columns: createColumns(handleCheckboxChange, handleViewSku),
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     state: {
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//       sorting,
//     },
//     onColumnFiltersChange: setColumnFilters,
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     onSortingChange: setSorting,
//     getRowId: (row) => row.id,
//   });

//   const filters = [
//     {
//       label: "Status",
//       column: "status",
//       options: [
//         { label: "Available", value: "Available" },
//         { label: "Out of Stock", value: "Out of Stock" },
//       ],
//     },
//     {
//       label: "Category",
//       column: "category",
//       options: [
//         { label: "Fruits", value: "Fruits" },
//         // Add more categories if needed
//       ],
//     },
//     // Add more filters as needed
//   ];

//   const searchColumns = [
//     {
//       label: "Name",
//       column: "name",
//     },
//     // Add more search columns as needed
//   ];

//   return (
//     <>
//       <TableControls table={table} searchColumns={searchColumns} filters={filters}>
//         <AlertDialog
//           title="Delete Selected Items"
//           description="This action will remove selected items from Database. Are you sure you want to proceed?"
//           size="sm"
//           variant="destructive"
//           acceptLabel="Delete"
//           onClick={removeCheckedItems}
//           disabled={Object.keys(rowSelection).length === 0}
//           triggerLabel={<Trash className="size-4" />}
//         />
//       </TableControls>
//       <TableContainer table={table} />
//       <TablePagination
//         table={table}
//         pageSize={pageSize}
//         setPageSize={setPageSize}
//       />
//     </>
//   );
// }
