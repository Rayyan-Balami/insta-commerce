import PageTitle from '@/components/PageTitle'
import ProductForm from '@/components/product/productForm/ProductForm'
import ProductFormMenus from '@/components/product/productForm/ProductFormMenus'
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { productSchema } from "@/schemas/product"
import { Form } from "@/components/ui/form";
import productService from "@/appwrite/product";
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { setProducts } from '@/store/productSlice'
import { useDispatch } from 'react-redux'

function AddProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      skus: [
        { color: "", price: "", stock: "", size: [] },
      ],
      category: "",
      status: "",
      images: [],
      video: "",
    },
  });

  const onSubmit = async (data) => {
    const response = await productService.createProduct(data);
    if (response.success) {
      dispatch(setProducts(response.result.documents));
      console.log("Product created successfully", response);
      //push it in products state and local storage
      dispatch(setProducts(response.result.documents));
      localStorage.setItem("products", JSON.stringify(response.result.documents));
      toast.success("Product created successfully");
      navigate('/product')
    } else {
      toast.error(response.message);
    }
  }

  return (
    <>
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 lg:space-y-6'>
          <PageTitle title="Add Product">
          <ProductFormMenus />
          </PageTitle>
          <ProductForm />
        </form>
      </Form>
    </FormProvider>
    </>
  )
}

export default AddProduct