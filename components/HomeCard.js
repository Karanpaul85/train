import Lottie from 'lottie-react-web';
import Link from 'next/link';
import styles from '../styles/HomeCard.module.css';
const HomeCard = ({ heading, animationData, slug }) => {
  const options = {
    loop: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className={styles.homeCard}>
      <Link href={slug} passHref>
        <a>
          <div className={styles.lottieSec}>
            <Lottie options={options} />
          </div>
          <span>{heading}</span>
        </a>
      </Link>
    </div>
  );
};
export default HomeCard;
