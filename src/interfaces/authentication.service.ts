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

export default interface IAuthenticationService {
  createUser: ({ email, password }: ICreateUserInput) => Promise<ICreateUserOutput>;
  login: ({ email, password }: ILoginInput) => Promise<ILoginUserOutput>;
  logout: () => void;
}

export const isAnIAuthenticationService = (obj: any): obj is IAuthenticationService => {
  return 'createUser' in obj && typeof obj.createUser === 'function';
}
