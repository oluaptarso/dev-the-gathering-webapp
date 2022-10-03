import { CentralizedProvider } from 'src/providers/centralized';
import Header from '../shared/header/header.component';
import CentralizedMainContent from './main-content/main-content.component';

const CentralizedApplication = () => {
  return (
    <CentralizedProvider>
      <Header />
      <CentralizedMainContent />
    </CentralizedProvider>
  );
};

export default CentralizedApplication;
