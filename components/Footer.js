import styles from '../styles/Footer.module.css';
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.wrapper} wrapper`}>
        &copy;copyright IRCTC Enquiry
      </div>
    </footer>
  );
}
