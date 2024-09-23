import React from "react";
import { TableFilters } from "./TableFilters";
import {TableColumnSearch} from "./TableColumnSearch";
import {TableColumnVisibility} from "./TableColumnVisibility";

export function TableControls({
  table,
  searchColumns = [],
  filters = [],
  children,
}) {
  return (
    <div className="flex items-center flex-wrap gap-2">
        <TableColumnVisibility table={table} />
      <div className="flex-1 flex items-center gap-2">
      <TableColumnSearch table={table} searchColumns={searchColumns} />
      <TableFilters table={table} filters={filters} />
      </div>
        {children}
    </div>
  );
}
