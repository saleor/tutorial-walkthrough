import React from 'react';

import { Navbar } from '@/components';

interface Props {
  children: React.ReactNode;
}

const styles = {
  background: 'min-h-screen bg-gray-100',
  container: 'py-10 max-w-7xl mx-auto',
}

export const Layout = ({ children }: Props) => {
  return (
    <div className={styles.background}>
      <Navbar />
      <div className={styles.container}>
        {children}
      </div>
    </div>
  );
}