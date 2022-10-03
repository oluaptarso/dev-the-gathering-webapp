import { useEffect, useState, PropsWithChildren } from 'react';
import { AuthContext } from 'src/contexts/auth';
import IAuthenticatedUser from 'src/interfaces/user';
import MetamaskUserStore from 'src/stores/metamask-user';

export const MetamaskAuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IAuthenticatedUser | null>(null);

  useEffect(() => {
    MetamaskUserStore.init();
    MetamaskUserStore.subscribe(setUser);    

    //return MetamaskUserStore.unsubscribe();
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
