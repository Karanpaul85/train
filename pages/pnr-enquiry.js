import Head from 'next/head';
import PageHeading from '../components/PageHeading';
import ErrorMsg from '../components/ErrorMsg';
import DisplayPnr from '../components/DisplayPnr';
const PnrEnquiry = ({ data }) => {
  const pnrNumber =
    data && data.errors
      ? data.errors[0].pnrNumber
      : data.data
      ? data.data.pnr_number
      : data.message;
  return (
    <>
      <Head>
        <title>{`Your PNR is ${pnrNumber}`}</title>
        <meta property="og:title" content="My page title" key="title" />
        <meta
          name="description"
          content={`Here is your PNR status ${pnrNumber}`}
        />
      </Head>
      <div className="wrapper">
        <div className="container">
          <PageHeading pageHeading="PNR Status" />
          {isNaN(parseInt(pnrNumber)) ? (
            <ErrorMsg msg={pnrNumber} />
          ) : (
            <DisplayPnr data={data.data ? data.data : ''} />
          )}
        </div>
      </div>
    </>
  );
};
export async function getServerSideProps(context) {
  const axios = require('axios');
  const options = {
    method: 'GET',
    url: 'https://irctc1.p.rapidapi.com/api/v2/getPNRStatus',
    params: context.query,
    headers: {
      'X-RapidAPI-Key': process.env.apiKey,
      'X-RapidAPI-Host': process.env.apiHost,
    },
  };
  const res = await axios.request(options);
  const data = (await res.data) ? res.data : res.message;
  return {
    props: { data }, // will be passed to the page component as props
  };
}
export default PnrEnquiry;
