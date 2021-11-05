import React from 'react';
import { useRouter } from "next/router";
import { useLocalStorage } from "react-use";

import {
  useAddProductVariantToCartMutation,
  ProductFragment
} from "@/saleor/api";

import {
  VariantSelector
} from '@/components';

import { formatAsMoney } from '@/lib';

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
  product: ProductFragment 
}

export const ProductDetails = ({ product: { id, name, description, category, variants, media } }: Props) => {
  const router = useRouter();
  const [token] = useLocalStorage('token');
  const [addProductToCart] = useAddProductVariantToCartMutation();

  const queryVariant = process.browser
    ? router.query.variant?.toString()
    : undefined;
  const selectedVariantID = queryVariant || variants![0]!.id!;
  const selectedVariant = variants!.find((variant) => variant?.id === selectedVariantID);

  const onAddToCart = async () => {
    await addProductToCart({
      variables: { checkoutToken: token, variantId: selectedVariantID },
    });
    router.push("/cart");
  };

  return (
    <div className={styles.columns}>
      <div className={styles.image.aspect}>
        <img
          src={media![0]?.url}
          className={styles.image.content}
        />
      </div>

      <div className="space-y-8">
        <div>
          <h1 className={styles.details.title}>
            {name}
          </h1>
          <p className={styles.details.category}>
            {category?.name}
          </p>
        </div>

        <article className={styles.details.description}>
          {description}
        </article>

        <VariantSelector variants={variants || []} id={id} selectedVariantID={selectedVariantID} />

        <div className="text-2xl font-bold">
          {formatAsMoney(selectedVariant?.pricing?.price?.gross.amount)}
        </div>

        <button
          onClick={onAddToCart}
          type="submit"
          className="primary-button"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
