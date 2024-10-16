import { GanttChart } from "lucide-react";
import React from "react";
import CategoriesCheckBoxes from "./CategoriesCheckBoxes";
import { useSelector } from "react-redux";

function Categories({ className }) {
  const { categories } = useSelector((state) => state.store.general);
  return (
    <div className={className}>
      <p className="flex items-center gap-3 px-3 py-2 text-muted-foreground">
        <GanttChart className="h-[1.15rem] w-[1.15rem]" />
        <span>Categories</span>
      </p>
      <ul >
        {categories?.map(category => <CategoriesCheckBoxes key={category} category={category}/>)}
      </ul>
    </div>
  );
}

export default Categories;
