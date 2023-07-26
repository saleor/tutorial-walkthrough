import '../styles/main.css'

import { Navbar } from '@/components';

interface Props {
  children: React.ReactNode;
}

const styles = {
  background: 'min-h-screen bg-gray-100',
  container: 'py-10 max-w-7xl mx-auto',
}

export default function Layout({ children }: Props) {

  return (
    <html lang='en'>
      <body>
        <div className={styles.background}>
          <Navbar />
          <div className={styles.container}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
