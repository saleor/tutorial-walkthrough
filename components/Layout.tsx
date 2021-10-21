import React from 'react';

interface Props {
  children: React.ReactNode;
}

const styles = {
  background: 'min-h-screen bg-gray-100',
  container: 'py-10 max-w-7xl mx-auto',
}

export const Layout: React.VFC<Props> = ({ children }) => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  );
}
