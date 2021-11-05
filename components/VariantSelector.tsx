import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { VariantFragment } from '@/saleor/api'

const styles = {
  grid: 'grid grid-cols-8 gap-2',
  variant: {
    default: 'flex justify-center border rounded-md p-3 font-semibold hover:border-blue-400',
    selected: 'border-2 border-blue-300 bg-blue-300',
  }
}

interface Props {
  id: string;
  selectedVariantID: string;
  variants: (VariantFragment | null | undefined)[]; // @patrys
}

export const VariantSelector = ({ variants, id, selectedVariantID }: Props) => {
  return (
    <div className={styles.grid}>
      {variants.map((variant) => {
        const isSelected = variant?.id === selectedVariantID;
        return (
          <Link
            key={variant?.name}
            href={{
              pathname: "/product/[id]",
              query: { variant: variant?.id, id },
            }}
            replace
            shallow
          >
            <a className={clsx(styles.variant.default, isSelected && styles.variant.selected)}>
              {variant?.name}
            </a>
          </Link>
        );
      })}
    </div>    
  );
}
