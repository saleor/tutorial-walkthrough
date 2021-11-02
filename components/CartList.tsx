import React from 'react';
import Link from 'next/link';

interface Props {
  products: any[];
}

const styles = {
  product: {
    image: 'flex-shrink-0 bg-white w-48 h-48 border object-center object-cover',
    container: 'ml-8 flex-1 flex flex-col justify-center',
    name: 'text-xl font-bold',
  }
}

export const CartList = ({ products }: Props) => {
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {products.map((line) => {
        const lineID = line?.id || "";
        const variant = line?.variant;
        const product = line?.variant.product;
        const price = line?.totalPrice?.gross;

        return (
          <li key={line?.id} className="py-6">
            <Link href={`/products/${lineID}`}>
              <a className="flex">
                <div className={styles.product.image}>
                  <img
                    src={product?.thumbnail?.url || ""}
                    alt={product?.thumbnail?.alt || ""}
                  />
                </div>

                <div className={styles.product.container}>
                  <div className="flex justify-between">
                    <div className="pr-6">
                      <h3 className={styles.product.name}>
                        {product?.name}
                      </h3>
                      <h4>
                        {variant?.name}
                      </h4>
                    </div>

                    <p className="text-xl text-gray-900 text-right">
                      {price?.amount} {price?.currency}
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          </li>
        );
      })}
    </ul >
  );
}