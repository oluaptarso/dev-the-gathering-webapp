import Link from 'next/link';
import { Dispatch, Reducer, SetStateAction, useContext, useReducer, useState } from 'react';
import { Button } from 'src/components/shared/buttons';
import { StyledForm } from 'src/components/shared/styled-form';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FirebaseErrorsCodeText } from 'src/services/firebase/firebase';
import ReactLoading from 'react-loading';
import { ApplicationContext } from 'src/contexts/application';
import { ErrorList } from 'src/components/shared/error-list';
import Spacer from 'src/components/shared/spacer';

const StyledSignInForm = styled(StyledForm)`
  input[type='email'] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  input[type='password'] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`;

type Inputs = {
  email: string;
  password: string;
};

const ValidationSchema = yup
  .object({
    email: yup.string().required('An email address is required').email('An valid email address is required'),
    password: yup.string().required('An password is required'),
  })
  .required();

interface LoginErrorState {
  hasError: boolean;
  errorMessage: string;
}

const SignInForm = ({ setRegistering }: { setRegistering: Dispatch<SetStateAction<boolean>> }) => {
  const application = useContext(ApplicationContext);  

  const [loading, setLoading] = useState(false);
  const [state, setState] = useReducer<Reducer<LoginErrorState, Partial<LoginErrorState>>>((state, newState) => ({ ...state, ...newState }), {
    hasError: false,
    errorMessage: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(ValidationSchema),
  });

  //only load if has an application.
  if (!application) return <></>;

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }: Inputs) => {
    setLoading(true);
    setState({ hasError: false, errorMessage: '' });
    const loginResponse = await application.authenticationService.login({ email, password });
    setLoading(false);
    if (!loginResponse.success) {
      setState({ hasError: true, errorMessage: FirebaseErrorsCodeText.getText(loginResponse.error.code) });
    }
  };

  return (
    <StyledSignInForm onSubmit={handleSubmit(onSubmit)}>
      <h1 className="h3 mb-3 fw-normal">Sign in</h1>
      {state.hasError && (
        <ErrorList>
          <li>{state.errorMessage}</li>
        </ErrorList>
      )}
      <div className="form-floating">
        <input type="email" autoFocus className="form-control" id="floatingInput" placeholder="awesome@email.com" {...register('email')} />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating">
        <input type="password" className="form-control" id="floatingPassword" placeholder="password" {...register('password')} />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <ErrorList>
        <li>{errors.email?.message}</li>
        <li>{errors.password?.message}</li>
      </ErrorList>
      <Spacer />
      <Button className="w-100 mb-2" type="submit" loading={loading} disabled={!!Object.keys(errors).length || loading}>
        {loading ? <ReactLoading type="cylon" color="white" height={32} width={32} /> : 'Sign in'}
      </Button>
      <Link href="">
        <a
          onClick={(e) => {
            e.preventDefault();
            setRegistering(true);
          }}
        >
          Create Account
        </a>
      </Link>
    </StyledSignInForm>
  );
};

export default SignInForm;
