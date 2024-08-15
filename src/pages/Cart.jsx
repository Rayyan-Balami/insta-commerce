import CartTable from '@/components/cart/CartTable';
import NoDataPlaceholder from '@/components/NoDataPlaceholder';
import PageTitle from '@/components/PageTitle';
import React from 'react'

function Cart() {
  return (
          <>
            <NoDataPlaceholder
              header="No Products In Cart"
              body="Looks like you haven't added any products to your cart yet."
            />
            <PageTitle title="Cart"/>
            <CartTable />
          </>
        );
}

export default Cart