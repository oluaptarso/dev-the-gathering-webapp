import { Reducer, useContext, useReducer, useState } from 'react';
import { Button } from 'src/components/shared/buttons';
import { StyledForm } from 'src/components/shared/styled-form';
import ReactLoading from 'react-loading';
import { ApplicationContext } from 'src/contexts/application';
import MetamaskUserStore from 'src/stores/metamask-user';
import { ApplicationTypeEnum } from 'src/enums/application-type.enum';
import { ErrorList } from 'src/components/shared/error-list';
import Spacer from 'src/components/shared/spacer';

interface LoginErrorState {
  hasError: boolean;
  errorMessage: string;
}

const DecentralizedSignIn = () => {
  const application = useContext(ApplicationContext);

  const [loading, setLoading] = useState(false);
  const [state, setState] = useReducer<Reducer<LoginErrorState, Partial<LoginErrorState>>>((state, newState) => ({ ...state, ...newState }), {
    hasError: false,
    errorMessage: '',
  });

  //only load if has an application.
  if (!application) return <></>;

  const connectWallet = async () => {
    try {
      const ethereum = global?.window?.ethereum;

      if (ethereum && ethereum.request) {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        MetamaskUserStore.setUser({
          applicationType: ApplicationTypeEnum.Decentralized,
          displayName: accounts[0],
          id: accounts[0],
        });
      } else {
        setState({ hasError: true, errorMessage: 'Please, install the Metamask wallet.' });
      }
    } catch (error: any) {
      if (error && typeof error.message === 'string') {
        setState({ hasError: true, errorMessage: error.message });
      }
    }
  };

  return (
    <StyledForm>
      <h1 className="h3 mb-3 fw-normal">Sign in</h1>
      {state.hasError && (
        <ErrorList>
          <li>{state.errorMessage}</li>
        </ErrorList>
      )}
      <Spacer />
      <Button className="w-100 mb-2" type="button" loading={loading} disabled={loading} onClick={connectWallet}>
        {loading ? <ReactLoading type="cylon" color="white" height={32} width={32} /> : 'Connect Wallet'}
      </Button>
    </StyledForm>
  );
};

export default DecentralizedSignIn;
