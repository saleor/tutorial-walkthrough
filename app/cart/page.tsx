import React from "react";

import {
  CartHeader,
  CartList,
  CartSummary
} from "@/components";
import { CheckoutByTokenDocument } from "@/gql/graphql";

import { cookies } from "next/headers";
import { execute } from "@/lib";
const styles = {
  grid: 'grid grid-cols-3 gap-8',
}

export default async function Cart() {
  const checkoutToken = cookies().get('checkout')?.value;

  const { checkout } = checkoutToken ? await execute({
    query: CheckoutByTokenDocument,
    variables: { checkoutToken },
  }) : { checkout: null }

  const products = checkout?.lines || [];

  return (
    <>
      <CartHeader />

      <div className={styles.grid}>
        <div className="col-span-2">
          <CartList products={products} />
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </>
  );
};
