import IAuthenticationService, { ILoginUserOutput } from "../../interfaces/authentication.service";

const AuthenticationDecentralizedService: Omit<IAuthenticationService,'createUser'> = {
  login: async () : Promise<ILoginUserOutput> => {
    const mock:ILoginUserOutput = {
      success: false,
    };
    return mock;
  },
  logout: () => {
    
  }
}

export default AuthenticationDecentralizedService;