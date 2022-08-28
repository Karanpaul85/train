import styles from '../styles/displayPnr.module.css';
const DisplayPnr = ({ data }) => {
  console.log(data, 'data data');
  if (typeof window !== 'undefined') {
    const pnrArray = [];
    const isPnrArray = localStorage.getItem('pnrArray');
    pnrArray = isPnrArray && isPnrArray !== null ? JSON.parse(isPnrArray) : [];
    const isPnrExist =
      pnrArray &&
      pnrArray.length &&
      pnrArray.some(function (obj) {
        return obj.pnr_number === data.pnr_number;
      });
    const findPnrExist =
      pnrArray &&
      pnrArray.length &&
      pnrArray.find((obj) => obj.pnr_number === data.pnr_number);
    let index = pnrArray.indexOf(findPnrExist);
    console.log(isPnrExist, 'isPnrExist');
    if (isPnrExist) {
      pnrArray.splice(index, 1);
      pnrArray.push(data);
    } else {
      pnrArray.push(data);
    }
    localStorage.setItem('pnrArray', JSON.stringify(pnrArray));
  } else {
    console.log('You are on the server');
  }

  return (
    <div className={styles.trainINfo}>
      {data !== '' ? (
        <>
          <div className={styles.infoHeading}>
            <div className={styles.trainNumber}>
              {data.train_number} - {data.train_name} | PNR - {data.pnr_number}
            </div>
            <div className={styles.otherInfo}>
              <span>
                {data.boarding_station.station_code} -{' '}
                {data.boarding_station.departure_time} &rarr;{' '}
                {data.reservation_upto.station_code} -{' '}
                {data.reservation_upto.arrival_time}
              </span>
              <span>
                {data.date} | {data.class} | {data.quota}
              </span>
              <span>
                {data.chart_prepared ? 'Chart Prepared' : 'Chart Not Prepared'}
              </span>
            </div>
          </div>
          <div className={styles.passengerInfo}>
            <table>
              <tbody>
                <tr>
                  <th>SN</th>
                  <th>Current Status</th>
                  <th>Booking Status</th>
                </tr>
                {data.passenger &&
                  data.passenger.map((single) => {
                    return (
                      <tr key={single.passengerSerialNumber}>
                        <td>{single.passengerSerialNumber}</td>
                        <td>{single.currentStatus}</td>
                        <td>
                          {single.bookingStatus}/{single.bookingBerthNo}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
};
export default DisplayPnr;
