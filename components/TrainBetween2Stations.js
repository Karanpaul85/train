import styles from '../styles/TrainBetweenStations.module.css';
const TrainBetweenStations = ({ allData }) => {
  const allTrains = () => {
    return (
      allData &&
      allData.length &&
      allData.map((item) => {
        return (
          <div key={item.train_number} className={styles.singleInfo}>
            <div className={styles.trainHeading}>
              <div className={styles.trainNo}>
                <span>TN</span>
                {item.train_number}
              </div>
              <div className={styles.trainName}>
                <span>Name</span>
                {item.train_name}
              </div>
            </div>
            <div className={styles.trainOtherInfo}>
              <div className={styles.infoSec}>
                <span>From:-</span>
                {item.train_origin_station} ({item.train_origin_station_code}) -{' '}
                {item.depart_time}
              </div>
              <div className={styles.infoSec}>
                <span>To:-</span>
                {item.train_destination_station} (
                {item.train_destination_station_code}) - {item.arrival_time}
              </div>
              <div className={styles.infoSec}>
                <span>Dist:-</span>
                {item.distance} KM
              </div>
              <div className={styles.infoSec}>
                <span>Class:-</span>
                {classes(item.class_type)}
              </div>
              <div className={styles.infoSec}>
                <span>Run Day:-</span>
                {runningDay(item.run_days)}
              </div>
              <div className={styles.infoSec}>
                <span>Day:-</span>
                {item.day_of_journey}
              </div>
            </div>
          </div>
        );
      })
    );
  };
  const classes = (classes) => {
    return (
      classes &&
      classes.length &&
      classes
        .map((classType) => {
          return classType;
        })
        .join(', ')
    );
  };
  const runningDay = (days) => {
    return (
      days &&
      days.length &&
      days
        .map((days) => {
          return days;
        })
        .join(', ')
    );
  };
  return <div className={styles.trainINfo}>{allTrains()}</div>;
};
export default TrainBetweenStations;
