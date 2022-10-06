import IAuthenticatedUser from './user';

export interface ICreateUserInput {
  email: string;
  password: string;
}

export interface ICreateUserOutput {
  success: boolean;
  user?: IAuthenticatedUser;
  error?: any;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface ILoginUserOutput {
  success: boolean;
  error?: any;
}

export enum ServiceTypeEnum {
  DecentralizedAuthenticationService,
  CentralizedAuthenticationService
};

export default interface IAuthenticationService {
  createUser: ({ email, password }: ICreateUserInput) => Promise<ICreateUserOutput>;
  login: ({ email, password }: ILoginInput) => Promise<ILoginUserOutput>;
  logout: () => void;
}

export interface IDecentralizedAuthenticationService extends Omit<IAuthenticationService,'createUser' | 'login'> {  
  login: () => Promise<ILoginUserOutput>;
  logout: () => void;
  type:ServiceTypeEnum;
}

export const isAnIDecentralizedAuthenticationService = (obj: any): obj is IDecentralizedAuthenticationService => {
  return 'type' in obj && obj.type == ServiceTypeEnum.DecentralizedAuthenticationService;
}

export const isAnIAuthenticationService = (obj: any): obj is IAuthenticationService => {
  return 'createUser' in obj && typeof obj.createUser === 'function';
}
