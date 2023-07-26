import React from 'react';

import { ProductElement } from '@/components';
import { ProductCollectionDocument } from '@/gql/graphql';
import { execute } from '@/lib';

const styles = {
  grid: 'grid gap-4 grid-cols-4',
}

export async function ProductCollection() {
  const { products } = await execute({
    query: ProductCollectionDocument,
    variables: {
      first: 4,
    },
    cache: 'no-store'
  })

  if (products) {
    return (
      <>
        <ul role="list" className={styles.grid}>
          {products.edges.length > 0 &&
            products.edges.map(
              ({ node }) => <ProductElement key={node.id} {...node} />,
            )}
        </ul>
      </>
    );
  }

  return null;
}
