import PageTitle from '@/components/PageTitle'
import ProductForm from '@/components/product/productForm/ProductForm'
import ProductFormMenus from '@/components/product/productForm/ProductFormMenus'

function AddProduct() {
  return (
    <>
    <PageTitle title="Add Product">
    <ProductFormMenus />
    </PageTitle>
    <ProductForm />
    </>
  )
}

export default AddProduct