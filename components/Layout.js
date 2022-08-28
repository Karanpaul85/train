import Head from 'next/head';
import Navbar from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="./assets/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="./assets/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="./assets/favicon-16x16.png"
        />
        <link rel="manifest" href="./assets/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="IRCTC" />
        <meta name="twitter:card" content="summary" />
        <meta property="og:image:width" content="1500" />
        <meta property="og:image:height" content="786" />
        <meta property="og:image" content="./assets/icon.png" />
        <meta name="twitter:image" content="./assets/icon.png" />
        <meta name="theme-color" content="#07007a" />
        <title>Welcome to my website</title>
        <meta
          name="keywords"
          content="Hindi news, हिंदी न्यूज़ , Hindi Samachar, हिंदी समाचार, Latest News in Hindi, Breaking News in Hindi, ताजा ख़बरें, KP News"
        />
      </Head>
      {router.pathname !== '/404' && <Navbar />}
      <main>{children}</main>
      {router.pathname !== '/404' && <Footer />}
    </>
  );
}
