import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { ApplicationTypeEnum } from '../../enums/ApplicationTypeEnum';
import IAuthenticationService from '../../interfaces/IAuthenticationService';
import IDevTheGatheringService from '../../interfaces/IDevTheGatheringService';
import AuthenticationCentralizedService from '../../services/authentication/AuthenticationCentralizedService';
import AuthenticationDecentralizedService from '../../services/authentication/AuthenticationDecentralizedService';
import DevTheGatheringCentralizedService from '../../services/dev-the-gathering/DevTheGatheringCentralizedService';
import DevTheGatheringDecentralizedService from '../../services/dev-the-gathering/DevTheGatheringDecentralizedService';

const Application: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  authenticationService,
  devTheGatheringService,
  applicationType,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <p>E ae {applicationType == ApplicationTypeEnum.Centralized ? 'Centralized' : 'Decentralized'}</p>;
};

export default Application;

export const getStaticPaths: GetStaticPaths<{ application: string }> = async () => {
  return {
    paths: [{ params: { application: 'decentralized' } }, { params: { application: 'centralized' } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  authenticationService: IAuthenticationService;
  devTheGatheringService: IDevTheGatheringService;
  applicationType: ApplicationTypeEnum;
}> = async ({ ...params }) => {
  let authenticationService: IAuthenticationService;
  let devTheGatheringService: IDevTheGatheringService;
  let applicationType: ApplicationTypeEnum;

  if (params.params && params.params.application === 'decentralized') {
    authenticationService = AuthenticationDecentralizedService;
    devTheGatheringService = DevTheGatheringDecentralizedService;
    applicationType = ApplicationTypeEnum.Decentralized;
  } else {
    authenticationService = AuthenticationCentralizedService;
    devTheGatheringService = DevTheGatheringCentralizedService;
    applicationType = ApplicationTypeEnum.Centralized;
  }

  return {
    props: {
      authenticationService,
      devTheGatheringService,
      applicationType,
    },
  };
};
