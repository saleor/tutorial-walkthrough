import React from 'react';
import { useFetchTwelveProductsQuery } from '@/saleor/api';

const styles = {
  grid: 'grid gap-4 grid-cols-4',
  product: {
    card: 'bg-white border',
    summary: 'px-4 py-2 border-gray-100 bg-gray-50 border-t',
    title: 'block text-lg text-gray-900 truncate',
    category: 'block text-sm font-medium text-gray-500',
    image: {
      aspect: 'aspect-h-1 aspect-w-1',
      content: ''
    }
  }
}

export const ProductCollection: React.VFC = () => {
  const { loading, error, data } = useFetchTwelveProductsQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  if (data) {
    const products = data.products?.edges || [];

    return (
      <ul role="list" className={styles.grid}>
        {products?.length > 0 &&
          products.map(
            ({ node: { id, name, thumbnail, category } }) => (
              <li key={id} className={styles.product.card}>
                <a>
                  <div className={styles.product.image.aspect}>
                    <img src={thumbnail?.url} alt="" className="" />
                  </div>
                  <div className={styles.product.summary}>
                    <p className={styles.product.title}>{name}</p>
                    <p className={styles.product.category}>{category?.name}</p>
                  </div>
                </a>
              </li>
            ),
          )}
      </ul>
    );
  }

  return null;
}
