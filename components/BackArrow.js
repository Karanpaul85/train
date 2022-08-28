import { useRouter } from 'next/router';
const BackArrow = () => {
  const router = useRouter();
  const backArrow = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '45px',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  };
  const backPage = () => {
    router.back();
  };
  return (
    <>
      <div style={backArrow} onClick={backPage}>
        &larr;
      </div>
    </>
  );
};
export default BackArrow;
