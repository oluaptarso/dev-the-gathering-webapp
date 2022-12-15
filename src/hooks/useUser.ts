import { useApolloClient } from '@apollo/client';
import { useEffect, RefObject, useCallback, Reducer, useReducer, useContext } from 'react';
import { AuthContext } from 'src/contexts/auth';
import { GET_USER } from 'src/graphql/queries/user';
import { ICentralizedAuthenticatedUser, isAnICentralizedAuthenticatedUser } from 'src/interfaces/user';

type UseUserProps = {
  onMove: (e: MouseEvent) => void;
  onLeave: (e: MouseEvent) => void;
  target: RefObject<HTMLElement>;
};

interface IUseUserState {
  canOpenBoosterPack: boolean;
  lastBoosterPackOpenedAt: number | null;
  emailVerified: boolean;
  loading: boolean;
}
/* use this hook to get centralized user information */
export const useUser = () => {
  const user = useContext(AuthContext) as ICentralizedAuthenticatedUser;
  const client = useApolloClient();

  const [state, setState] = useReducer<Reducer<IUseUserState, Partial<IUseUserState>>>((state, newState) => ({ ...state, ...newState }), {
    canOpenBoosterPack: false,
    lastBoosterPackOpenedAt: null,
    emailVerified: user.emailVerified,
    loading: false,
  });

  const fetchUserData = useCallback(async () => {
    setState({ loading: true });
    const response = await client.query({ query: GET_USER, fetchPolicy: 'no-cache' });

    if (response.data) {
      setState({
        canOpenBoosterPack: response.data.user.canOpenBoosterPack,
        lastBoosterPackOpenedAt: response.data.user.lastBoosterPackOpenedAt,
        loading: false,
      });
    }
  }, [client]);

  useEffect(() => {
    if (isAnICentralizedAuthenticatedUser(user) && user.emailVerified) {
      fetchUserData();
    }
  }, [client, user, fetchUserData]);

  return { ...state, refetchUserData: fetchUserData };
};
