import Inputs from '../components/Input';
import styles from '../styles/allStationList.module.css';
import { useEffect, useState } from 'react';
const AllStationsList = ({
  hide,
  selectedInput,
  chnageStatus,
  trainStations,
}) => {
  const [suggestionsData, setSuggestionsData] = useState([]);
  useEffect(() => {
    trainStations &&
      trainStations.length > 0 &&
      setSuggestionsData(trainStations);
  }, []);
  const slectedStation = (e) => {
    const stationCode = e.target.getAttribute('data-code');
    const inputName = document.getElementById(selectedInput);
    if (inputName) inputName.value = stationCode;
    hide(false);
  };

  const close = (e) => {
    hide(false);
  };
  const callName = (e) => {
    chnageStatus([]);
    const inputValue = e.value;
    if (inputValue.length >= 1) {
      getSuggestions(inputValue);
    } else {
      setSuggestionsData([]);
    }
  };
  const getSuggestions = (inputValue) => {
    const jsonName = inputValue.charAt(0);
    if (!trainStations) {
      const axios = require('axios');
      const options = {
        method: 'GET',
        url: `/stations/${jsonName}.json`,
      };
      axios
        .request(options)
        .then(function (response) {
          setSuggestionsData(response.data);
          searchStation(inputValue);
        })
        .catch(function (error) {
          console.log(error, 'error');
        });
    } else {
      searchStation(inputValue);
    }
  };
  const searchStation = (inputValue) => {
    const listSection = document.getElementById('listSection');
    const li = listSection.getElementsByTagName('li');
    const filter = inputValue.toUpperCase();
    for (var i = 0; i < li.length; i++) {
      const txtValue = li[i].textContent || li[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = '';
      } else {
        li[i].style.display = 'none';
      }
    }
  };

  return (
    <div className={styles.suggestionPopup}>
      <div className={styles.suggestionPopupInner}>
        <div className={styles.searchInputs}>
          <Inputs
            type="text"
            name="toStationCode"
            placeholder="Search Station"
            id="toStationCode"
            onChange={(e) => {
              callName(e.target);
            }}
            style={{ width: '70%' }}
            autoComplete="off"
          />
          <Inputs
            type="button"
            name="close"
            id="close"
            value="Close"
            onClick={(e) => {
              close();
            }}
            style={{ width: '30%' }}
          />
        </div>

        <ul className={styles.listSection} id="listSection">
          {trainStations &&
            suggestionsData &&
            suggestionsData.map((station) => {
              let objKeys = Object.keys(station);
              let keyExist = objKeys.includes('stop');
              if (keyExist && station.stop) {
                return (
                  <li
                    key={station.station_code.toLowerCase()}
                    onClick={(e) => slectedStation(e)}
                    data-code={station.station_code}
                    data-name={station.station_name}
                  >
                    {station.station_name} - ({station.station_code})
                  </li>
                );
              }
            })}
          {!trainStations &&
            suggestionsData &&
            suggestionsData.map((station) => {
              return (
                <li
                  key={station.station_code.toLowerCase()}
                  onClick={(e) => slectedStation(e)}
                  data-code={station.station_code}
                  data-name={station.station_name}
                >
                  {station.station_name} - ({station.station_code})
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
export default AllStationsList;
