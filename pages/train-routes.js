import Head from 'next/head';
import PageHeading from '../components/PageHeading';
import InputSection from '../components/InputSection';
import Inputs from '../components/Input';
import ErrorMsg from '../components/ErrorMsg';
import CustomLoader from '../components/CustomLoader';
import TrainRout from '../components/TrainRout';
import { useState } from 'react';
const TrainRoutes = () => {
  const [status, setStatus] = useState([]);
  const [errorStatus, seterrorStatus] = useState({});
  const [loader, setLoader] = useState(false);

  return (
    <>
      <Head>
        <title>Check the Train Routes</title>
        <meta name="description" content="Check the Train Routes" />
      </Head>
      <div className="wrapper">
        <div className="container">
          <PageHeading pageHeading="Check the Train Routes" />
          <InputSection
            chnageStatus={setStatus}
            errorStatus={seterrorStatus}
            loader={setLoader}
            apiUrl="https://irctc1.p.rapidapi.com/api/v1/getTrainSchedule"
          >
            <Inputs
              type="number"
              placeholder="Enter Train Number"
              id="trainNo"
              name="trainNo"
              maxLength="5"
              style={{ width: '100%' }}
            />
          </InputSection>

          {errorStatus && Object.keys(errorStatus).length === 0 ? (
            ''
          ) : (
            <ErrorMsg msg={errorStatus.message} />
          )}
          {loader && <CustomLoader />}
          {status.data && Object.keys(status.data).length !== 0 && (
            <TrainRout data={status.data.route} />
          )}
        </div>
      </div>
    </>
  );
};
export default TrainRoutes;
