import React from "react";
import Link from "next/link";

const styles = {
  background: 'bg-white shadow-sm',
  container: 'max-w-7xl mx-auto px-8',
  menu: 'flex justify-between h-16',
  menuSection: 'flex space-x-8 h-full',
  menuLink: 'font-bold text-gray-700 hover:text-blue-400 z-10 flex items-center text-sm'
}

export const Navbar = () => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.menu}>
          <div className={styles.menuSection}>
            <Link href="/">
              <a className={styles.menuLink} aria-expanded="false">
                All Products 
              </a>
            </Link>
          </div>

          <div className={styles.menuSection}>
          </div>
        </div>
      </div>
    </div>
  );
};
