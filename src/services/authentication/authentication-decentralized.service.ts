import MetamaskUserStore from "src/stores/metamask-user";
import IAuthenticationService, { ILoginUserOutput } from "../../interfaces/authentication.service";

const AuthenticationDecentralizedService: Omit<IAuthenticationService,'createUser'> = {
  login: async () : Promise<ILoginUserOutput> => {
    const mock:ILoginUserOutput = {
      success: false,
    };
    return mock;
  },
  logout: () => {
    MetamaskUserStore.setUser(null);
  }
}

export default AuthenticationDecentralizedService;