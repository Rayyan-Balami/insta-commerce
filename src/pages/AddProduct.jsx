import PageTitle from "@/components/PageTitle";
import ProductForm from "@/components/product/productForm/ProductForm";
import ProductFormMenus from "@/components/product/productForm/ProductFormMenus";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { productSchema } from "@/schemas/product";
import { Form } from "@/components/ui/form";
import productService from "@/appwrite/product";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import BucketService from "@/appwrite/bucket";
import { getENV } from "@/getENV";

function AddProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      skus: [{ color: "", price: "", stock: "", size: [] }],
      category: "",
      status: "",
      images: [],
      video: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const { success, result, message } = await productService.createProduct(
        data
      );
      console.log(result);

      if (success) {
        const imagePreviews = BucketService.getFilePreviews(
          getENV("PRODUCTS_BUCKET_ID"),
          result.images
        ).previews;

        //set products_time in local storage to force a re-fetch of products
        localStorage.setItem(
          "products_timestamp",
          Date.now() -
            (Date.now() - parseInt(getENV("CACHE_LIMIT"), 10)).toString()
        );

        toast.success("Product created successfully");
        navigate("/product");
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("An error occurred while creating the product");
      console.error("Error creating product:", error);
    }
  };

  return (
    <>
      <FormProvider {...form}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 lg:space-y-6"
          >
            <PageTitle title="Add Product">
              <ProductFormMenus />
            </PageTitle>
            <ProductForm />
          </form>
        </Form>
      </FormProvider>
    </>
  );
}

export default AddProduct;
