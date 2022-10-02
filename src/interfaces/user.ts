import { ApplicationTypeEnum } from "src/enums/application-type.enum";

export default interface IAuthenticatedUser {
  id: string;
  displayName: string;
  applicationType: ApplicationTypeEnum
}

export interface ICentralizedAuthenticatedUser extends IAuthenticatedUser {
  token: string;
  emailVerified: boolean;
}

export const isAnICentralizedAuthenticatedUser = (obj: any): obj is ICentralizedAuthenticatedUser => {
  return 'token' in obj && 'emailVerified' in obj;
}