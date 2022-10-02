import { PropsWithChildren } from 'react';
import AuthenticationCentralizedService from 'src/services/authentication/authentication-centralized.service';
import { ICentralizedApplication } from 'src/interfaces/application';
import DevTheGatheringCentralizedService from 'src/services/dev-the-gathering/dev-the-gathering-centralized.service';
import { ApplicationContext } from 'src/contexts/application';
import { FirebaseAuthProvider } from './firebase-auth';
import { ApplicationTypeEnum } from 'src/enums/application-type.enum';

export const CentralizedProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const application: ICentralizedApplication = {
    authenticationService: AuthenticationCentralizedService,
    devTheGatheringService: DevTheGatheringCentralizedService,
    type: ApplicationTypeEnum.Centralized,
  };

  return (
    <ApplicationContext.Provider value={application}>
      <FirebaseAuthProvider>
        {children}
      </FirebaseAuthProvider>
    </ApplicationContext.Provider>
  );
};
