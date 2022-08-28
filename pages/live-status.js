import Head from 'next/head';
import PageHeading from '../components/PageHeading';
import InputSection from '../components/InputSection';
import Inputs from '../components/Input';
import ErrorMsg from '../components/ErrorMsg';
import CustomLoader from '../components/CustomLoader';
import DisplayData from '../components/DisplayData';
import { useState } from 'react';
const LiveStatus = () => {
  const [status, setStatus] = useState('');
  const [errorStatus, seterrorStatus] = useState({});
  const [loader, setLoader] = useState(false);

  return (
    <>
      <Head>
        <title>Check Train Live Status</title>
        <meta name="description" content="Check Train Live Status" />
      </Head>
      <div className="wrapper">
        <div className="container">
          <PageHeading pageHeading="Check Train Live Status" />
          <InputSection
            chnageStatus={setStatus}
            errorStatus={seterrorStatus}
            loader={setLoader}
            apiUrl={process.env.apiUrl}
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
          {status ? (
            status.data.message ? (
              status.data.message
            ) : (
              <DisplayData data={status.data} />
            )
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};

export default LiveStatus;
