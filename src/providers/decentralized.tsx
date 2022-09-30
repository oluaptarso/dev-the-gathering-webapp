import { PropsWithChildren } from 'react';
import { IDecentralizedApplication } from 'src/interfaces/application';
import { ApplicationContext } from 'src/contexts/application';
import AuthenticationDecentralizedService from 'src/services/authentication/authentication-decentralized.service';
import DevTheGatheringDecentralizedService from 'src/services/dev-the-gathering/dev-the-gathering-decentralized.service';

export const DecentralizedProvider: React.FC<PropsWithChildren> = ({ children }) => { 
  
  const application:IDecentralizedApplication = {
    authenticationService : AuthenticationDecentralizedService,
    devTheGatheringService : DevTheGatheringDecentralizedService,
  }

  return <ApplicationContext.Provider value={application}>{children}</ApplicationContext.Provider>;
};
