import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const styles = {
  card: 'bg-white border',
  summary: 'px-4 py-2 border-gray-100 bg-gray-50 border-t',
  title: 'block text-lg text-gray-900 truncate',
  category: 'block text-sm font-medium text-gray-500',
  image: {
    aspect: 'aspect-square',
    content: 'object-center object-cover'
  }
}

type Props = any;

export const ProductElement = ({ id, name, thumbnail, category, pricing }: Props) => {
  const lowestPrice = pricing?.priceRange?.start?.gross.amount ?? 0;
  const highestPrice = pricing?.priceRange?.stop?.gross.amount ?? 0;

  return (
    <li key={id} className={styles.card}>
      <Link href={`/products/${id}`}>
        <div className={styles.image.aspect}>
          <Image src={thumbnail?.url} alt="" width={256} height={256} />
        </div>
        <div className={styles.summary}>
          <div className="flex justify-between items-center">
            <div>
              <p className={styles.title}>{name}</p>
              <p className={styles.category}>{category?.name}</p>
            </div>
            <div>{lowestPrice == highestPrice ? highestPrice : `${lowestPrice} - ${highestPrice}`}</div>
          </div>
        </div>
      </Link>
    </li>
  );
}