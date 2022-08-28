import Head from 'next/head';
import PageHeading from '../components/PageHeading';
import InputSection from '../components/InputSection';
import Inputs from '../components/Input';
import SelectInputs from '../components/SelectInput';
import CustomLoader from '../components/CustomLoader';
import AllStationsList from '../components/AllStationsList';
import ErrorMsg from '../components/ErrorMsg';
import { useState } from 'react';
const SeatStatus = () => {
  const sn = 1;
  const [status, setStatus] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isdisable, setIsdisable] = useState(true);
  const [loader, setLoader] = useState(false);
  const [suggestions, setSuggestions] = useState(false);
  const [selectedInput, setSelectedInput] = useState('');
  const [trainStations, setTrainStations] = useState([]);
  const [quotas, setQuotas] = useState([]);

  const callName = (e) => {
    let inputId = e.getAttribute('id');
    setSuggestions(true);
    setSelectedInput(inputId);
  };
  const inputDisabled = () => {
    setIsdisable(true);
    let inputs = document.querySelectorAll(
      'input[type=text], input[type=date], select'
    );
    inputs.forEach((inpt) => {
      inpt.value = '';
    });
  };
  const getTrainClasses = (e) => {
    setStatus([]);
    let targetValue = e.target.value;
    if (targetValue.length > 3) {
      let targetValue = e.target.value;
      if (targetValue.length > 3) {
        setLoader(true);
        setTimeout(function () {
          const axios = require('axios');
          const options = {
            method: 'GET',
            url: 'https://irctc1.p.rapidapi.com/api/v1/getTrainSchedule',
            params: { trainNo: targetValue },
            headers: {
              'X-RapidAPI-Key': process.env.apiKey,
              'X-RapidAPI-Host': process.env.apiHost,
            },
          };
          axios
            .request(options)
            .then(function (response) {
              setTrainStations(response.data.data.route);
              setClasses(response.data.data.class);
              setQuotas(response.data.data.quota);
              setIsdisable(false);
              setLoader(false);
            })
            .catch(function (error) {
              console.log(error.message, 'error');
            });
        }, 500);
      }
    }
  };

  const DisplaySeats = (data) => {
    return (
      <table className="trainRoutes">
        <tbody>
          <tr>
            <th>SN</th>
            <th>Date</th>
            <th>Status</th>
            <th>Fare</th>
            <th>Chance</th>
          </tr>
          {data.data &&
            data.data.map((item, index) => {
              return (
                <tr key={item.date}>
                  <td>{index + 1}</td>
                  <td>{item.date}</td>
                  <td>{item.current_status}</td>
                  <td>&#8377; {item.total_fare}</td>
                  <td
                    className={
                      item.confirm_probability
                        ? item.confirm_probability.toLowerCase()
                        : ''
                    }
                  >
                    {item.confirm_probability_percent
                      ? item.confirm_probability_percent + '%'
                      : ''}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  };
  return (
    <>
      <Head>
        <title>Check Seats Availablity</title>
        <meta name="description" content="Check Seats Availablity" />
      </Head>
      <div className="wrapper">
        <div className="container">
          <PageHeading pageHeading="Check Seats Availablity" />
          <InputSection
            chnageStatus={setStatus}
            loader={setLoader}
            apiUrl="https://irctc1.p.rapidapi.com/api/v1/checkSeatAvailability"
          >
            <Inputs
              type="number"
              name="trainNo"
              placeholder="Train Number"
              id="trainNo"
              onBlur={(e) => getTrainClasses(e)}
              onFocus={inputDisabled}
            />
            <Inputs
              type="text"
              name="fromStationCode"
              placeholder="Enter Source"
              id="fromStationCode"
              onClick={(e) => {
                callName(e.target);
              }}
              disabled={isdisable}
            />
            <Inputs
              type="text"
              name="toStationCode"
              placeholder="Enter Destination"
              id="toStationCode"
              onClick={(e) => {
                callName(e.target);
              }}
              disabled={isdisable}
            />
            <Inputs
              type="date"
              name="date"
              placeholder="Select Date"
              id="date"
              disabled={isdisable}
            />

            <SelectInputs
              id="classType"
              name="classType"
              empty="Class Type"
              options={classes}
              isdisabled={isdisable}
            />
            <SelectInputs
              id="quota"
              name="quota"
              empty="Quota Type"
              options={quotas}
              isdisabled={isdisable}
            />
          </InputSection>
          {suggestions && (
            <AllStationsList
              hide={setSuggestions}
              selectedInput={selectedInput}
              chnageStatus={setStatus}
              trainStations={trainStations}
            />
          )}
          {loader && <CustomLoader />}
          {status ? (
            status.data && status.data.length > 0 ? (
              <DisplaySeats data={status.data} />
            ) : (
              status.message == '' && (
                <ErrorMsg msg="There is no data avialable accroding to this detail." />
              )
            )
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};
export default SeatStatus;
