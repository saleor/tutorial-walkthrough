import React from 'react';
import { useRouter } from "next/router";

import {
  Product
} from "@/saleor/api";

import {
  VariantSelector
} from '@/components';

const styles = {
  columns: 'grid grid-cols-2 gap-x-10 items-start',
  image: {
    aspect: 'aspect-w-1 aspect-h-1 bg-white rounded',
    content: 'object-center object-cover'
  },
  details: {
    title: 'text-4xl font-bold tracking-tight text-gray-800',
    category: 'text-lg mt-2 font-medium text-gray-500',
    description: 'prose lg:prose-s'
  }
}

interface Props {
  product: Pick<Product, 'id' | 'name' | 'description' | 'thumbnail' | 'category' | 'media' | 'variants'>;
}

export const ProductDetails = ({ product }: Props) => {
  const router = useRouter();

  const queryVariant = process.browser
    ? router.query.variant?.toString()
    : undefined;
  const selectedVariantID = queryVariant || product?.variants![0]!.id!;

  return (
    <div className={styles.columns}>
      <div className={styles.image.aspect}>
        <img
          src={product?.media![0]?.url}
          className={styles.image.content}
        />
      </div>

      <div className="space-y-8">
        <div>
          <h1 className={styles.details.title}>
            {product?.name}
          </h1>
          <p className={styles.details.category}>
            {product?.category?.name}
          </p>
        </div>

        <article className={styles.details.description}>
          {product?.description}
        </article>

        <VariantSelector variants={product?.variants || []} id={product.id} selectedVariantID={selectedVariantID} />
      </div>
    </div>
  );
}
