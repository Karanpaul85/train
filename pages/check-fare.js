import Head from 'next/head';
import PageHeading from '../components/PageHeading';
import InputSection from '../components/InputSection';
import Inputs from '../components/Input';
import { useState } from 'react';
const LiveStatus = () => {
  const [status, setStatus] = useState([]);
  return (
    <>
      <Head>
        <title>Check Ticket Price</title>
        <meta name="description" content="Check Ticket Price" />
      </Head>
      <div className="wrapper">
        <div className="container">
          <PageHeading pageHeading="Check Ticket Price" />
          <InputSection chnageStatus={setStatus}>
            <Inputs
              type="date"
              name="travelDate"
              placeholder="Select Date"
              id="travelDate"
            />
            <Inputs
              type="number"
              name="trainNo"
              placeholder="Train Number"
              id="trainNo"
            />
            <Inputs
              type="text"
              name="fromStationCode"
              placeholder="Enter Source"
              id="fromStationCode"
            />
            <Inputs
              type="text"
              name="toStationCode"
              placeholder="Enter Destination"
              id="toStationCode"
            />
          </InputSection>
        </div>
      </div>
    </>
  );
};
export default LiveStatus;
