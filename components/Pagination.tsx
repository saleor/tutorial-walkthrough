import React from 'react';

const styles = {
  nav: 'my-8 flex justify-center flex-col items-center',
  info: 'text-sm text-gray-500 mt-2'
}

interface Props {
  onLoadMore: () => void;
  totalCount: number;
  itemCount: number;
}

export const Pagination = ({
  onLoadMore,
  itemCount,
  totalCount,
}: Props) => {
  return (
    <nav className={styles.nav}>
      <a
        onClick={onLoadMore}
        className="button"
      >
        Load More
      </a>
      {itemCount && totalCount && (
        <div className={styles.info}>
          {itemCount} out of {totalCount}
        </div>
      )}
    </nav>
  );
};
