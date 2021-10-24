import React from "react";

import {
  Layout,
  CartHeader,
  CartList,
  CartSummary
} from "@/components";

const styles = {
  grid: 'grid grid-cols-3 gap-8',
}

const Cart = () => {
  return (
    <Layout>
      <CartHeader />

      <div className={styles.grid}>
        <div className="col-span-2">
          <CartList />
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;