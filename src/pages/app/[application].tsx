import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import CentralizedApplication from 'src/components/application/centralized/centralized-application';
import DecentralizedApplication from 'src/components/application/decentralized/decentralized-application';
import { ApplicationTypeEnum } from '../../enums/application-type-enum';

const Application: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ applicationType }: InferGetStaticPropsType<typeof getStaticProps>) => {
  
  const title = `Dev: The Gathering - ${applicationType == ApplicationTypeEnum.Centralized ? 'Centralized' : 'Decentralized' }`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {applicationType == ApplicationTypeEnum.Centralized ? <CentralizedApplication /> : <DecentralizedApplication />}
    </>
  );
};

export default Application;

export const getStaticPaths: GetStaticPaths<{ application: string }> = async () => {
  return {
    paths: [{ params: { application: 'decentralized' } }, { params: { application: 'centralized' } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  applicationType: ApplicationTypeEnum;
}> = async ({ ...params }) => {
  let applicationType: ApplicationTypeEnum;

  if (params.params && params.params.application === 'decentralized') {
    applicationType = ApplicationTypeEnum.Decentralized;
  } else {
    applicationType = ApplicationTypeEnum.Centralized;
  }

  return {
    props: {
      applicationType,
    },
  };
};
