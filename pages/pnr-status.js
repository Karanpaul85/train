import Head from 'next/head';
import PageHeading from '../components/PageHeading';
import InputSection from '../components/InputSection';
import Inputs from '../components/Input';
import { useEffect, useState } from 'react';
import styles from '../styles/storePnr.module.css';
import Link from 'next/link';
const PNRStatus = () => {
  const [storePNR, setStorePNR] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pnrArray = [];
      const isPnrArray = localStorage.getItem('pnrArray');
      pnrArray =
        isPnrArray && isPnrArray !== null ? JSON.parse(isPnrArray) : [];
      pnrArray && pnrArray.length && setStorePNR(pnrArray);
    } else {
      console.log('You are on the server');
    }
  }, []);
  return (
    <>
      <Head>
        <title>Check Train PNR Status</title>
        <meta name="description" content="Check Train PNR Status" />
      </Head>
      <div className="wrapper">
        <div className="container">
          <PageHeading pageHeading="Check PNR Status" />
          <InputSection>
            <Inputs
              type="number"
              placeholder="Enter PNR Number"
              id="pnrNumber"
              name="pnrNumber"
              style={{ width: '100%' }}
            />
          </InputSection>

          {storePNR &&
            storePNR.length &&
            storePNR.map((item) => {
              return (
                <Link
                  href={`/pnr-enquiry?pnrNumber=${item && item.pnr_number}`}
                  passHref
                  key={item && item.pnr_number}
                >
                  <a className={styles.storePNR}>
                    <div className={styles.info}>
                      <span>{item && item.pnr_number}</span>
                      <span>{item && item.class}</span>
                      <span>
                        {item && item.date} -{' '}
                        {item &&
                          item.source_station &&
                          item.source_station.departure_time}
                      </span>
                    </div>
                    <div className={styles.train}>
                      <span>
                        {item &&
                          item.source_station &&
                          item.source_station.station_code}{' '}
                        &rarr;{' '}
                        {item &&
                          item.reservation_upto &&
                          item.reservation_upto.station_code}
                      </span>
                      <span>
                        {item.train_number} {item.train_name}
                      </span>
                    </div>
                  </a>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default PNRStatus;
