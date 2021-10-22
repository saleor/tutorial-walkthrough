import React from 'react';
import Link from 'next/link';

const styles = {
  card: 'bg-white border',
  summary: 'px-4 py-2 border-gray-100 bg-gray-50 border-t',
  title: 'block text-lg text-gray-900 truncate',
  category: 'block text-sm font-medium text-gray-500',
  image: {
    aspect: 'aspect-h-1 aspect-w-1',
    content: 'object-center object-cover'
  }
}

import { Product } from '@/saleor/api'

type Props = Pick<Product, 'id' | 'name' | 'thumbnail' | 'category'>;

export const ProductElement = ({ id, name, thumbnail, category }: Props) => {
  return (
    <li key={id} className={styles.card}>
      <Link href={`/product/${id}`}>
        <a>
          <div className={styles.image.aspect}>
            <img src={thumbnail?.url} alt="" className={styles.image.content} />
          </div>
          <div className={styles.summary}>
            <p className={styles.title}>{name}</p>
            <p className={styles.category}>{category?.name}</p>
          </div>
        </a>
      </Link>
    </li>
  );
}