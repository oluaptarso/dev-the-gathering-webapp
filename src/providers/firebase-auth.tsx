import { useEffect, useState, PropsWithChildren } from 'react';
import { FirebaseAuth } from 'src/services/firebase/firebase';
import { AuthContext } from 'src/contexts/auth';
import { ICentralizedAuthenticatedUser } from 'src/services/authentication/authentication-centralized.service';

export const FirebaseAuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<ICentralizedAuthenticatedUser | null>(null);

  useEffect(() => {
    const unsubscribe = FirebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser({
          displayName: user.email || '',
          id: user.uid,
          token: await user.getIdToken(),
          emailVerified: user.emailVerified,
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
