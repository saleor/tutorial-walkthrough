import React from 'react';
import Image from 'next/image';

import { execute, formatAsMoney } from '@/lib';
import { cookies } from 'next/headers';
import { AddProductVariantToCartDocument, CreateCheckoutDocument } from '@/gql/graphql';
import { redirect } from 'next/navigation';

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

export const ProductDetails = ({ product: { id, name, description, category, variants, media } }: any) => {
 const selectedVariantID = variants![0]!.id!;

  async function addToCart() {
    'use server';

    let checkoutToken = cookies().get('checkout')?.value;

    if (!checkoutToken) {
      const { checkoutCreate } = await execute({
        query: CreateCheckoutDocument,
      })

      if (checkoutCreate && checkoutCreate.checkout) {
        cookies().set('checkout', checkoutCreate.checkout.token);
      }
    }

    checkoutToken = cookies().get('checkout')?.value;

    await execute({
      query: AddProductVariantToCartDocument,
      variables: {
        checkoutToken,
        variantId: selectedVariantID,
      }
    })

    redirect('/cart');
  };

  return (
    <div className={styles.columns}>
      <div className={styles.image.aspect}>
        <Image
          src={media![0]?.url}
          width={1200}
          height={1200}
          className={styles.image.content} 
          alt={''}        />
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

        {/* <VariantSelector variants={variants || []} id={id} selectedVariantID={selectedVariantID} /> */}

        <div className="text-2xl font-bold">
          {formatAsMoney(variants[0].pricing?.price?.gross.amount)}
        </div>

        <form action={addToCart}>
          <button
            type="submit"
            className="primary-button"
          >
            Add to carts
          </button>
        </form>
      </div>
    </div>
  );
}
