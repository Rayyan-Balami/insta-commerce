import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Columns2 } from "lucide-react";
import { TableFilters } from "./TableFilters";

export function TableControls({
  table,
  searchColumns = [],
  filters = [],
  children,
}) {
  const [searchFilters, setSearchFilters] = useState({});

  const handleSearchFilter = (event, columnId) => {
    const value = event.target.value;
    setSearchFilters((prev) => ({
      ...prev,
      [columnId]: value,
    }));
    table.getColumn(columnId)?.setFilterValue(value);
  };

  return (
    <div className="flex items-center flex-wrap gap-4">
      {searchColumns.map((columnId) => (
        <Input
          key={columnId}
          placeholder={`Search ${columnId}`}
          value={searchFilters[columnId] || ""}
          onChange={(event) => handleSearchFilter(event, columnId)}
          className="sm:max-w-[16rem] h-9"
        />
      ))}
      <TableFilters table={table} filters={filters} />
      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Columns2 className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {children}
      </div>
    </div>
  );
}
