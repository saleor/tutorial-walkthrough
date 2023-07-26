import React from 'react';
import Link from "next/link";

const styles = {
  header: 'flex justify-between',
  title: 'text-3xl font-extrabold tracking-tight text-gray-900',
}

export const CartHeader = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        Your Cart
      </h1>
      <div>
        <Link href="/" className="link">
          Continue Shopping
        </Link>
      </div>
    </header>
  );
}
