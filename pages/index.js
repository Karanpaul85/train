import Head from 'next/head';
import HomeCard from '../components/HomeCard';
import RunningTrain from '../public/lottie/train-loader.json';
import Stations from '../public/lottie/stations.json';
import PNR from '../public/lottie/pnr.json';
import Seat from '../public/lottie/seat.json';
import TrainBetween from '../public/lottie/train-between.json';

export default function Home() {
  return (
    <>
      <Head>
        <title>IRCTC Enquiry</title>
        <meta name="description" content="IRCTC Enquiry" />
        <meta name="keywords" content="IRCTC Enquiry" />
      </Head>
      <div className="wrapper">
        <div className="container">
          <HomeCard
            heading="Live Status"
            animationData={RunningTrain}
            slug="/live-status"
          />
          <HomeCard
            heading="Train Route"
            animationData={Stations}
            slug="/train-routes"
          />
          <HomeCard
            heading="PNR Status"
            animationData={PNR}
            slug="/pnr-status"
          />
          <HomeCard
            heading="Seats Available"
            animationData={Seat}
            slug="/seat-status"
          />
          <HomeCard
            heading="Check Trains"
            animationData={TrainBetween}
            slug="/trains"
          />
        </div>
      </div>
    </>
  );
}
