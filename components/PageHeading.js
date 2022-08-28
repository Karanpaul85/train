import styles from '../styles/pageHeading.module.css';
const PageHeading = ({ pageHeading }) => {
  return (
    <div className={styles.pageHeading}>
      <h1>{pageHeading}</h1>
    </div>
  );
};
export default PageHeading;
