import { PropsWithChildren } from 'react';
import AuthenticationCentralizedService from 'src/services/authentication/authentication-centralized.service';
import { ICentralizedApplication } from 'src/interfaces/application';
import DevTheGatheringCentralizedService from 'src/services/dev-the-gathering/dev-the-gathering-centralized.service';
import { ApplicationContext } from 'src/contexts/application';
import { ApolloProvider } from '@apollo/client';
import { FirebaseAuthProvider } from './firebase-auth';

export const CentralizedProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const application: ICentralizedApplication = {
    authenticationService: AuthenticationCentralizedService,
    devTheGatheringService: DevTheGatheringCentralizedService,
  };

  return (
    <ApplicationContext.Provider value={application}>
      <FirebaseAuthProvider>
        <ApolloProvider client={application.devTheGatheringService.apolloClient}>{children}</ApolloProvider>
      </FirebaseAuthProvider>
    </ApplicationContext.Provider>
  );
};
