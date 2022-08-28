import Lottie from 'lottie-react-web';
import loading from '../public/lottie/loading.json';
import style from '../styles/loader.module.css';
const CustomLoader = () => {
  const options = {
    loop: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className={style.loader}>
      <Lottie options={options} />
    </div>
  );
};
export default CustomLoader;
