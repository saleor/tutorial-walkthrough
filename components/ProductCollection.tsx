import React from 'react';

import { useProductCollectionQuery } from '@/saleor/api';
import { Pagination, ProductElement } from '@/components';

const styles = {
  grid: 'grid gap-4 grid-cols-4',
}

export const ProductCollection = () => {
  const { loading, error, data, fetchMore } = useProductCollectionQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  if (data) {
    const products = data.products?.edges || [];
    const pageInfo = data.products?.pageInfo;
    const totalCount = data.products?.totalCount;

    const onLoadMore = () => {
      fetchMore({
        variables: {
          after: pageInfo?.endCursor,
        },
      });
    };

    return (
      <>
        <ul role="list" className={styles.grid}>
          {products?.length > 0 &&
            products.map(
              ({ node }) => <ProductElement key={node.id} {...node} />,
            )}
        </ul>
        {pageInfo?.hasNextPage && 
          <Pagination
            onLoadMore={onLoadMore}
            itemCount={products.length}
            totalCount={totalCount || NaN}
          />
        }
      </>
    );
  }

  return null;
}
