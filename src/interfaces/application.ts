import { ApplicationTypeEnum } from "src/enums/application-type.enum";
import IAuthenticationService from "./authentication.service";
import IDevTheGatheringService from "./dev-the-gathering.service";

export default interface IApplication {

}

export interface ICentralizedApplication extends IApplication {
  authenticationService: IAuthenticationService;
  devTheGatheringService: IDevTheGatheringService;
  type: ApplicationTypeEnum.Centralized;
}

export const isAnICentralizedApplication = (obj: any): obj is ICentralizedApplication => {
  return 'type' in obj && obj.type === ApplicationTypeEnum.Centralized;
}

export interface IDecentralizedApplication extends IApplication {
  authenticationService: Omit<IAuthenticationService,'createUser'>;
  devTheGatheringService: IDevTheGatheringService;
  type: ApplicationTypeEnum.Decentralized;
}

export const isAnIDecentralizedApplication = (obj: any): obj is IDecentralizedApplication => {
  return 'type' in obj && obj.type === ApplicationTypeEnum.Decentralized;
}