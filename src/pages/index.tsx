import type { NextPage } from 'next';
import Head from 'next/head';
import Hero from 'src/components/home/hero';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dev: The Gathering</title>
      </Head>
      <Hero />
    </>
  );
};

export default Home;
