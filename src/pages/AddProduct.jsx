import PageTitle from '@/components/PageTitle'
import ProductForm from '@/components/product/productForm/ProductForm'
import ProductFormMenus from '@/components/product/productForm/ProductFormMenus'

import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { productSchema } from "@/schemas/product"
import { Form } from "@/components/ui/form";

function AddProduct() {
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
    // Simulate asynchronous submission (e.g., API call)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data); // Handle form submission logic here
    //reset the form
    // form.reset();
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