import IAuthenticationService from "./authentication.service";
import IDevTheGatheringService from "./dev-the-gathering.service";

export default interface IApplication {

}

export interface ICentralizedApplication extends IApplication {
  authenticationService: IAuthenticationService;
  devTheGatheringService: IDevTheGatheringService;
}

export interface IDecentralizedApplication extends IApplication {
  authenticationService: Omit<IAuthenticationService,'createUser'>;
  devTheGatheringService: IDevTheGatheringService;
}