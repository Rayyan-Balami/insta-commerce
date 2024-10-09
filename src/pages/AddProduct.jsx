import PageTitle from "@/components/PageTitle";
import ProductForm from "@/components/product/productForm/ProductForm";
import ProductFormMenus from "@/components/product/productForm/ProductFormMenus";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { productSchema } from "@/schemas/product";
import { Form } from "@/components/ui/form";
import productService from "@/appwrite/product";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import BucketService from "@/appwrite/bucket";
import { getENV } from "@/getENV";
import { useState } from "react";
import { addProduct, updateProduct } from "@/store/productSlice";

function AddProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams() || null;
  const [editingProduct, setEditingProduct] = useState(
    id && useSelector(state => state.product.products.find(product => product.$id === id))
  );

  let defaultValues = {
    name: "",
    description: "",
    skus: [{ color: "", price: "", stock: "", size: [] }],
    category: "",
    status: "",
    images: [],
    video: "",
  };

  if (id && editingProduct) {
    defaultValues = {
      name: editingProduct.name,
      description: editingProduct.description,
      skus: editingProduct.skus,
      category: editingProduct.category,
      status: editingProduct.status,
      images: [],
      video: editingProduct.video || "",
    };
  }

  console.log(defaultValues);

  const form = useForm({
    resolver: zodResolver(productSchema(id)),
    defaultValues
  });

  const onSubmit = async (data) => {
    try {
      let response;
      if (id) {
        console.log("update submit form",data);
        response = await productService.updateProduct(id, data, editingProduct.images);
      } else {
        console.log("add submit form",data);
        response = await productService.createProduct(data);
      }

      const { success, result, message } = response;
      console.log(result);

      if (success) {
        const imagePreviews = BucketService.getFilePreviews(
          getENV("PRODUCTS_BUCKET_ID"),
          result.images
        ).previews;

        result.imagePreviews = imagePreviews;

        if (id) {
          dispatch(updateProduct(result));
        } else  {
        dispatch(addProduct(result));
        }

        //set products_time in local storage to force a re-fetch of products
        localStorage.setItem(
          "products_timestamp",
          Date.now() -
            (Date.now() - parseInt(getENV("CACHE_LIMIT"), 10)).toString()
        );

        toast.success(`Product ${id ? "updated" : "created"} successfully`);
        navigate("/product");
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(`An error occurred while ${id ? "updating" : "creating"} the product`);
      console.error(`Error ${id ? "updating" : "creating"} product:`, error);
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
            <PageTitle title={id ? "Edit Product" : "Add Product"}>
              <ProductFormMenus />
            </PageTitle>
            <ProductForm editingProduct={editingProduct} setEditingProduct={setEditingProduct} />
          </form>
        </Form>
      </FormProvider>
    </>
  );
}

export default AddProduct;