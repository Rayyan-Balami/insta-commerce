import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search, UndoDot } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function TableColumnSearch({ table, searchColumns = [] }) {
  const [searchFilters, setSearchFilters] = useState({});
  const [activeSelectedIndexes, setActiveSelectedIndexes] = useState([0]); // Manage multiple selected indexes

  const handleSearchFilter = (event, columnId) => {
    const value = event.target.value;
    setSearchFilters((prev) => ({
      ...prev,
      [columnId]: value,
    }));
    table.getColumn(columnId)?.setFilterValue(value);
  };

  const handleCheckboxChange = (index) => {
    setActiveSelectedIndexes(
      (prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index) // Deselect if already selected
          : [...prev, index] // Add index if not selected
    );
  };

  if (searchColumns.length === 0) {
    return null;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
            <Search className="w-4 h-4" />
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
        <DropdownMenuLabel>Search Filters</DropdownMenuLabel>
        <DropdownMenuSeparator />
          {searchColumns.map(({ label, column }, index) => (
            <DropdownMenuCheckboxItem
              key={column} // Use column ID for key
              className="capitalize"
              checked={activeSelectedIndexes.includes(index)}
              onCheckedChange={() => {
                handleCheckboxChange(index);
              }}
            >
              {label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* //button to clear all search filters */}
      {activeSelectedIndexes.length > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSearchFilters({});
            searchColumns.forEach(({ column }) =>
              table.getColumn(column)?.setFilterValue("")
            );
          }}
        >
          <UndoDot className="w-4 h-4" />
        </Button>
      )}
      {searchColumns
        .filter((_, index) => activeSelectedIndexes.includes(index)) // Filter only active indexes
        .map(({ column, label }) => (
          <Input
            key={column} // Use column ID for key
            placeholder={`Search ${label}`} // Display the label in the placeholder
            value={searchFilters[column] || ""}
            onChange={(event) => handleSearchFilter(event, column)}
            className="sm:max-w-[16rem] h-9" // Always show active inputs
          />
        ))}
    </>
  );
}