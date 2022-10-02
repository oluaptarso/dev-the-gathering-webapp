import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ApplicationTypeEnum } from 'src/enums/application-type.enum';
import { ICentralizedAuthenticatedUser } from 'src/interfaces/user';
import IAuthenticationService, { ICreateUserInput, ICreateUserOutput, ILoginInput, ILoginUserOutput } from '../../interfaces/authentication.service';
import { FirebaseAuth } from '../firebase/firebase';

export interface ICentralizedCreateUserOutput extends Omit<ICreateUserOutput, 'user'> {
  user?: ICentralizedAuthenticatedUser;
}

const AuthenticationCentralizedService: IAuthenticationService = {
  createUser: async ({ email, password }: ICreateUserInput): Promise<ICentralizedCreateUserOutput> => {
    const response: ICentralizedCreateUserOutput = {
      success: true,
    };

    try {
      const res = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
      const user = res.user;
      await sendEmailVerification(user);

      response.user = {
        displayName: user.email || '',
        id: user.uid,
        token: await user.getIdToken(),
        emailVerified: user.emailVerified,
        applicationType: ApplicationTypeEnum.Centralized,
      };
    } catch (error) {
      console.error(error);
      response.success = false;
      response.error = error;
    }

    return response;
  },
  login: async ({ email, password }: ILoginInput): Promise<ILoginUserOutput> => {
    const response: ILoginUserOutput = {
      success: true,
    };

    try {
      await signInWithEmailAndPassword(FirebaseAuth, email, password);
    } catch (error) {
      console.error(error);
      response.success = false;
      response.error = error;
    }

    return response;
  },
  logout: () => {
    console.log('logout');
    signOut(FirebaseAuth);
  },
};

export default AuthenticationCentralizedService;
