import React from "react";
import { Combobox } from "./Combobox";
export function TableFilters({ table, filters }) {
  return (
    <>
      {filters.map((filter) => (
        <Combobox
          key={filter.column}
          list={filter.options}
          value={table.getColumn(filter.column).getFilterValue()}
          onChange={(value) => table.getColumn(filter.column).setFilterValue(value)}
          placeholder={filter.label}
          className="w-auto h-9"
          // multiple={true}
        />
      ))}
    </>
  );
}

