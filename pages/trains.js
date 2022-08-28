import Head from 'next/head';
import PageHeading from '../components/PageHeading';
import InputSection from '../components/InputSection';
import Inputs from '../components/Input';
import ErrorMsg from '../components/ErrorMsg';
import CustomLoader from '../components/CustomLoader';
import TrainBetweenStations from '../components/TrainBetween2Stations';
import AllStationsList from '../components/AllStationsList';
import { useState } from 'react';
const CheckTrains = () => {
  const [status, setStatus] = useState([]);
  const [errorStatus, seterrorStatus] = useState({});
  const [loader, setLoader] = useState(false);
  const [suggestions, setSuggestions] = useState(false);
  const [selectedInput, setSelectedInput] = useState('');
  const callName = (e) => {
    let inputId = e.getAttribute('id');
    setSuggestions(true);
    setSelectedInput(inputId);
  };

  return (
    <>
      <Head>
        <title>Check the Trains between 2 stations</title>
        <meta
          name="description"
          content="Check the Trains between 2 stations"
        />
      </Head>
      <div className="wrapper">
        <div className="container">
          <PageHeading pageHeading="Check Trains Between 2 Stations" />
          <InputSection
            chnageStatus={setStatus}
            errorStatus={seterrorStatus}
            loader={setLoader}
            apiUrl="https://irctc1.p.rapidapi.com/api/v2/trainBetweenStations"
          >
            <Inputs
              type="text"
              name="fromStationCode"
              placeholder="Enter Source"
              id="fromStationCode"
              onClick={(e) => {
                callName(e.target);
              }}
            />
            <Inputs
              type="text"
              name="toStationCode"
              placeholder="Enter Destination"
              id="toStationCode"
              onClick={(e) => {
                callName(e.target);
              }}
            />
          </InputSection>
          {suggestions && (
            <AllStationsList
              hide={setSuggestions}
              selectedInput={selectedInput}
              chnageStatus={setStatus}
            />
          )}
          {errorStatus && Object.keys(errorStatus).length === 0 ? (
            ''
          ) : (
            <ErrorMsg msg={errorStatus.message} />
          )}
          {loader && <CustomLoader />}
          {status ? (
            status.message && Object.keys(status.message).length === 0 ? (
              'There is no train between these two stations'
            ) : (
              <TrainBetweenStations allData={status.data} />
            )
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};
export default CheckTrains;
