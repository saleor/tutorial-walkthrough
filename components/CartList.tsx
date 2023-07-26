import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  products: any[];
}

const styles = {
  product: {
    image: 'flex-shrink-0 bg-white w-48 h-48 border object-center object-cover',
    container: 'ml-8 flex flex-col justify-center',
    name: 'text-xl font-bold',
  }
}

export const CartList = ({ products }: Props) => {
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {products.map((line) => {
        const variant = line?.variant;
        const product = line?.variant.product;

        return (
          <li key={line?.id} className="py-6">
            <Link href={`/products/${product?.slug}`} className="flex">
                <div className={styles.product.image}>
                  <Image
                    src={product?.thumbnail?.url || ""}
                    alt={product?.thumbnail?.alt || ""}
                  />
                </div>

                <div className={styles.product.container}>
                  <div>
                    <h3 className={styles.product.name}>
                      {product?.name}
                    </h3>
                    <h4>
                      {variant?.name}
                    </h4>
                  </div>
                </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
