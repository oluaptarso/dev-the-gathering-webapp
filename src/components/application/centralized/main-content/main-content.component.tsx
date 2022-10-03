import { useContext } from 'react';
import { AuthContext } from 'src/contexts/auth';
import CentralizedCardAlbumContainer from '../card-album/card-album-container';
import SignIn from '../sign-in/sign-in';
import StyledMainContent from './main-content.style';

const CentralizedMainContent = () => {
  const user = useContext(AuthContext);  

  return (
    <StyledMainContent>
      {user ? (
        <CentralizedCardAlbumContainer/>
      ) : (
        <SignIn />
      )}
    </StyledMainContent>
  );
};

export default CentralizedMainContent;
