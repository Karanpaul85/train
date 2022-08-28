import styles from '../styles/Header.module.css';
import { useRouter } from 'next/router';
import BackArrow from './BackArrow';
import Link from 'next/link';
export default function Header() {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <div className={`${styles.wrapper} wrapper`}>
        {router.pathname !== '/' && <BackArrow />}
        <Link href="/" passHref>
          <a className={styles.mainLink}>IRCTC Enquiry</a>
        </Link>
      </div>
    </header>
  );
}
