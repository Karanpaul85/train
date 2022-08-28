import styles from '../styles/errorMsg.module.css';
const ErrorMsg = ({ msg }) => {
  return <div className={styles.errorDiv}>{msg}</div>;
};
export default ErrorMsg;
