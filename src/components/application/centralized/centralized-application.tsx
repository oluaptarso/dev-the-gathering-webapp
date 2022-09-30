import { ApolloProvider } from '@apollo/client';
import { useContext } from 'react';
import { AuthContext } from 'src/contexts/auth';
import { FirebaseAuthProvider } from 'src/providers/firebase-auth';
import DevTheGatheringCentralizedService from 'src/services/dev-the-gathering/dev-the-gathering-centralized.service';
import Header from '../shared/header/header.component';
import MainContent from './main-content/main-content.component';



const CentralizedApplication = () => {
  const user = useContext(AuthContext);

  return (
    <FirebaseAuthProvider>
      <ApolloProvider client={DevTheGatheringCentralizedService.apolloClient}>
        <Header/>
        <MainContent/>
      </ApolloProvider>
    </FirebaseAuthProvider>
  );
};

export default CentralizedApplication;
