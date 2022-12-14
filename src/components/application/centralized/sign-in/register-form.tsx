import { Dispatch, Reducer, SetStateAction, useContext, useReducer, useState } from 'react';
import { Button } from 'src/components/shared/button';
import { StyledForm } from 'src/components/shared/styled-form';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FirebaseService from 'src/services/firebase/firebase.service';
import ReactLoading from 'react-loading';
import { ApplicationContext } from 'src/contexts/application';
import IAuthenticationService, { isAnIAuthenticationService } from 'src/interfaces/authentication.service';
import { ErrorList } from 'src/components/shared/error-list/error-list';

const StyledRegisterForm = styled(StyledForm)`
  input#floatingInput {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  input#floatingPassword {
    border-radius: 0;
    margin-bottom: -1px;
  }

  input#floatingConfirmPassword {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`;

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const ValidationSchema = yup
  .object({
    email: yup.string().required('An email address is required').email('An valid email address is required'),
    password: yup.string().required('An password is required').min(6, 'Password must be at least 6 characters long'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'The passwords do not match'),
  })
  .required();

interface CreateUserErrorState {
  hasError: boolean;
  errorMessage: string;
}

const RegisterForm = ({ setRegistering }: { setRegistering: Dispatch<SetStateAction<boolean>> }) => {
  const application = useContext(ApplicationContext);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useReducer<Reducer<CreateUserErrorState, Partial<CreateUserErrorState>>>((state, newState) => ({ ...state, ...newState }), {
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
  // garantees that the right service is used
  if (!isAnIAuthenticationService(application.authenticationService)) return <></>;

  // casts the service to IAuthenticationService
  const authenticationService = application.authenticationService as IAuthenticationService;

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }: Inputs) => {
    setLoading(true);
    setState({ hasError: false, errorMessage: '' });
    setLoading(false);
    const createUserResponse = await authenticationService.createUser({ email, password });
    if (!createUserResponse.success) {
      setState({ hasError: true, errorMessage: FirebaseService.getFirebaseErrorTextByKey(createUserResponse.error.code) });
    }
  };

  return (
    <StyledRegisterForm onSubmit={handleSubmit(onSubmit)}>
      <h1 className="h3 mb-3 fw-normal">Register</h1>
      {state.hasError && <ErrorList errors={[state.errorMessage]} />}
      <div className="form-floating">
        <input type="text" autoFocus className="form-control" id="floatingInput" placeholder="name@example.com" {...register('email')} />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating">
        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" {...register('password')} />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <div className="form-floating">
        <input type="password" className="form-control" id="floatingConfirmPassword" placeholder="Confirm Password" {...register('confirmPassword')} />
        <label htmlFor="floatingConfirmPassword">Confirm Password</label>
      </div>
      <ErrorList errors={[errors.email?.message, errors.password?.message, errors.confirmPassword?.message]} />      
      <Button className="w-100 mb-2" type="submit" loading={loading} disabled={!!Object.keys(errors).length || loading}>
        {loading ? <ReactLoading type="cylon" color="white" height={32} width={32} /> : 'Register'}
      </Button>
      <Button
        secondary={true}
        className="w-100"
        onClick={(e) => {
          e.preventDefault();
          setRegistering(false);
        }}
      >
        Back
      </Button>
    </StyledRegisterForm>
  );
};

export default RegisterForm;
