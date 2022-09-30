import { ApolloProvider } from '@apollo/client';
import { useContext } from 'react';
import { ApplicationContext } from 'src/contexts/application';
import { AuthContext } from 'src/contexts/auth';
import { CentralizedProvider } from 'src/providers/centralized';
import { FirebaseAuthProvider } from 'src/providers/firebase-auth';
import DevTheGatheringCentralizedService from 'src/services/dev-the-gathering/dev-the-gathering-centralized.service';
import Header from '../shared/header/header.component';
import MainContent from './main-content/main-content.component';

const CentralizedApplication = () => {
  return (
    <CentralizedProvider>
      <Header />
      <MainContent />
    </CentralizedProvider>
  );
};

export default CentralizedApplication;
