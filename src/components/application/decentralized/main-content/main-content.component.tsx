import { useContext } from 'react';
import { AuthContext } from 'src/contexts/auth';
import StyledMainContent from '../../centralized/main-content/main-content.style';
import DecentralizedCardAlbumContainer from '../card-album/card-album-container';
import DecentralizedSignIn from '../sign-in/sign-in';

const DecentralizedMainContent = () => {
  const user = useContext(AuthContext);  

  return (
    <StyledMainContent>
      {user ? (
        <DecentralizedCardAlbumContainer/>
      ) : (
        <DecentralizedSignIn />
      )}
    </StyledMainContent>
  );
};

export default DecentralizedMainContent;
