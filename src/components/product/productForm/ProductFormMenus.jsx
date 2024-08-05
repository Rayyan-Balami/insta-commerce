import { UndoDot, PlusCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";

function ProductFormMenus() {
  const form = useFormContext();
  return (
    <>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="h-8 gap-1"
        onClick={form.reset}
        disabled={form.formState.isSubmitting}
      >
        <UndoDot className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Clear
        </span>
      </Button>
      <Button
        type="submit"
        size="sm"
        className="h-8 gap-1"
        disabled={!form.formState.isValid || form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <PlusCircle className="h-3.5 w-3.5" />
        )}
        Add Product
      </Button>
    </>
  );
}

export default ProductFormMenus;
