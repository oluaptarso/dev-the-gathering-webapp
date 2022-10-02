import * as firebase from 'Firebase/app';
import { getAuth } from 'firebase/auth';

const FirebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

let FirebaseApp: firebase.FirebaseApp;

try {
  FirebaseApp = firebase.getApp();
} catch (error) {
  FirebaseApp = firebase.initializeApp(FirebaseCredentials);
}

export const FirebaseAuth = getAuth(FirebaseApp);
export default FirebaseApp;

type MapType = {
  [key: string]: string;
}

const FirebaseErrorsCodeTextMap:MapType = {
  'auth/email-already-in-use': 'Email already in use.',
  'auth/user-not-found': 'Incorrect email or password.',
  'auth/wrong-password': 'Incorrect email or password.'
}

export const FirebaseErrorsCodeText = {
  getText: (key: string): string => {
    return key in FirebaseErrorsCodeTextMap ? FirebaseErrorsCodeTextMap[key] : key;
  },
};
