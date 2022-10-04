import { FirebaseApp } from 'Firebase/app';
import { Auth } from "firebase/auth";


export default interface IFirebaseService {
  getAuthService: () => Auth;
  getAppService: () => FirebaseApp;
  getFirebaseErrorTextByKey: (key: string) => string;
}