const TrainRout = ({ data }) => {
  const sn = 1;
  return (
    <>
      <style jsx>{`
        .trainRoutes {
          font-family: Arial, Helvetica, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }

        .trainRoutes td,
        .trainRoutes th {
          border: 1px solid #ddd;
          padding: 5px;
          font-size: 0.8rem;
        }

        .trainRoutes tr:nth-child(even) {
          background-color: #f2f2f2;
        }

        .trainRoutes tr:hover {
          background-color: #ddd;
        }

        .trainRoutes th {
          padding-top: 12px;
          padding-bottom: 12px;
          text-align: left;
          background-color: #04aa6d;
          color: white;
        }
      `}</style>
      <table className="trainRoutes">
        <tbody>
          <tr>
            <th>SN</th>
            <th>Station Name</th>
            <th>Code</th>
            <th>Day</th>
            <th>Distance</th>
          </tr>
          {data &&
            data.map((item, index) => {
              if (item.stop) {
                return (
                  <tr key={item.station_code}>
                    <td>{sn++}</td>
                    <td>{item.station_name}</td>
                    <td>{item.station_code}</td>
                    <td>{item.day}</td>
                    <td>{item.distance_from_source}KM</td>
                  </tr>
                );
              }
            })}
        </tbody>
      </table>
    </>
  );
};
export default TrainRout;
