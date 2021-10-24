import React from "react";
import { useLocalStorage } from 'react-use';

import {
  Layout,
  CartHeader,
  CartList,
  CartSummary
} from "@/components";
import { useCheckoutByTokenQuery } from "@/saleor/api";

const styles = {
  grid: 'grid grid-cols-3 gap-8',
}

const Cart = () => {
  const [token] = useLocalStorage('token');
  const { data, loading, error } = useCheckoutByTokenQuery({
    variables: { checkoutToken: token },
    skip: !token,
  });

  if (loading) return <div>Loading...</div>; 
  if (error) return <div>Error</div>;
  if (!data || !data.checkout) return null;

  const products = data.checkout?.lines || [];

  return (
    <Layout>
      <CartHeader />

      <div className={styles.grid}>
        <div className="col-span-2">
          <CartList products={products} />
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;