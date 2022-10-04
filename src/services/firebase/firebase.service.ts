import * as firebase from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import IFirebaseService from 'src/interfaces/firebase.service';

const firebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

let FirebaseApp: firebase.FirebaseApp;

type MapType = {
  [key: string]: string;
}

const firebaseErrorsCodeTextMap: MapType = {
  'auth/email-already-in-use': 'Email already in use.',
  'auth/user-not-found': 'Incorrect email or password.',
  'auth/wrong-password': 'Incorrect email or password.'
}

const FirebaseService:IFirebaseService = {
  getAuthService: function (): Auth {
    return getAuth(this.getAppService());
  },
  getAppService: function (): firebase.FirebaseApp {
    try {
      FirebaseApp = firebase.getApp();
    } catch (error) {
      FirebaseApp = firebase.initializeApp(firebaseCredentials);
    }

    return FirebaseApp;
  },
  getFirebaseErrorTextByKey: function (key: string): string {
    return key in firebaseErrorsCodeTextMap ? firebaseErrorsCodeTextMap[key] : key;
  }
}

export default FirebaseService;