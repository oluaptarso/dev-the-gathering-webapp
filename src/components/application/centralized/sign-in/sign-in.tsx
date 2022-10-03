import { useState } from 'react';
import RegisterForm from './register-form';
import SignInForm from './sign-in-form';

const SignIn = () => {
  const [registering, setRegistering] = useState(false);

  return registering ? <RegisterForm setRegistering={setRegistering} /> : <SignInForm setRegistering={setRegistering} />;
};

export default SignIn;
