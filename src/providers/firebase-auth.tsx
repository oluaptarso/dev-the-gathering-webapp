import { useEffect, useState, PropsWithChildren } from 'react';
import { FirebaseAuth } from 'src/services/firebase/firebase';
import { AuthContext } from 'src/contexts/auth';
import { ICentralizedAuthenticatedUser } from 'src/interfaces/user';
import { ApplicationTypeEnum } from 'src/enums/application-type.enum';

export const FirebaseAuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<ICentralizedAuthenticatedUser | null>(null);

  useEffect(() => {
    const unsubscribe = FirebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser({
          displayName: user.email || '',
          id: user.uid,
          token: await user.getIdToken(true),
          emailVerified: user.emailVerified,
          applicationType: ApplicationTypeEnum.Centralized,
        });
      }
      else{
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
