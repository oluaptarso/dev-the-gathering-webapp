import { ApplicationTypeEnum } from 'src/enums/application-type.enum';
import MetamaskUserStore from 'src/stores/metamask-user';
import { IDecentralizedAuthenticationService, ILoginUserOutput, ServiceTypeEnum } from '../../interfaces/authentication.service';

const AuthenticationDecentralizedService: IDecentralizedAuthenticationService = {
  login: async (): Promise<ILoginUserOutput> => {
    const userOutput: ILoginUserOutput = {
      success: false,
    };

    const ethereum = global?.window?.ethereum;

    if (ethereum && ethereum.request) {      
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      MetamaskUserStore.setUser({
        applicationType: ApplicationTypeEnum.Decentralized,
        displayName: accounts[0],
        id: accounts[0],
      });

    } else {
      userOutput.error = { hasError: true, errorMessage: 'Please, install the Metamask wallet.' };      
    }

    return userOutput;
  },
  logout: () => {
    MetamaskUserStore.setUser(null);
  },
  type: ServiceTypeEnum.DecentralizedAuthenticationService
};

export default AuthenticationDecentralizedService;
