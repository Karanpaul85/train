import styles from '../styles/displaydata.module.css';
import Logo from '../public/assets/icon.png';
const DisplayData = ({ data }) => {
  const previousStations = () => {
    return (
      data &&
      data.previous_stations &&
      data.previous_stations.map((item) => {
        return (
          <tr key={item.station_code}>
            <td>{item.stoppage_number}</td>
            <td>{item.station_name}</td>
            <td>{item.std}</td>
            <td>{item.platform_number}</td>
            <td
              className={
                item.arrival_delay !== 0 ? `${styles.red}` : `${styles.green}`
              }
            >
              {item.arrival_delay}
            </td>
          </tr>
        );
      })
    );
  };
  const upcomingStations = () => {
    return (
      data &&
      data.upcoming_stations &&
      data.upcoming_stations.map((item) => {
        return (
          item.station_code !== '' && (
            <tr key={item.station_code}>
              <td>{item.stoppage_number}</td>
              <td>{item.station_name}</td>
              <td>{item.std}</td>
              <td>{item.platform_number}</td>
              <td
                className={
                  item.arrival_delay !== 0 ? `${styles.red}` : `${styles.green}`
                }
              >
                {item.arrival_delay}
              </td>
            </tr>
          )
        );
      })
    );
  };
  const currentStations = () => {
    return (
      data &&
      data.current_location_info &&
      data.current_location_info.map((item) => {
        return (
          item.type === 1 && (
            <tr key={item.type}>
              <td>
                <img src={Logo} alt="IRCTC Enquiry" width={20} height={20} />
              </td>
              <td colSpan={4}>{item.readable_message}</td>
            </tr>
          )
        );
      })
    );
  };
  return (
    <div className={styles.trainINfo}>
      <div className={styles.infoHeading}>
        <div className={styles.trainNumber}>
          <span>Train No.</span>
          <span>{data.train_number}</span>
        </div>
        <div className={styles.trainNameNStations}>
          <div className="trainName">{data.seo_train_name}</div>
          <div className="startNstop">
            {data.source} - {data.destination}
          </div>
        </div>
        <div className={styles.runningDays}>Run Day : {data.run_days}</div>
      </div>
      {'new_message' in data ? (
        <div className={styles.message}>
          <p>{data.new_message}</p>
          <p>{data.title}</p>
        </div>
      ) : (
        <table>
          <tbody>
            <tr>
              <th>SN</th>
              <th>Name</th>
              <th>Time</th>
              <th>PN</th>
              <th>Delay</th>
            </tr>
            {previousStations()}
            {currentStations()}
            {upcomingStations()}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default DisplayData;
