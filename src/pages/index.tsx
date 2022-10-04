import type { NextPage } from 'next';
import Head from 'next/head';
import HomeHero from 'src/components/home/hero';
import KnowMore from 'src/components/home/know-more';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dev: The Gathering</title>
      </Head>
      <HomeHero />
      <KnowMore />
    </>
  );
};

export default Home;
