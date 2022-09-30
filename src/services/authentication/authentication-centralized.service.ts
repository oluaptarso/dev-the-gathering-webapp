import { createUserWithEmailAndPassword, EmailAuthCredential, sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import IAuthenticatedUser, { IHaveAuthenticationTokenProperty, IHaveEmailVerifiedProperty } from 'src/interfaces/user';
import IAuthenticationService, { ICreateUserInput, ICreateUserOutput, ILoginInput, ILoginUserOutput } from '../../interfaces/authentication.service';
import { FirebaseAuth } from '../firebase/firebase';

export interface ICentralizedAuthenticatedUser extends IAuthenticatedUser, IHaveAuthenticationTokenProperty, IHaveEmailVerifiedProperty {}
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
