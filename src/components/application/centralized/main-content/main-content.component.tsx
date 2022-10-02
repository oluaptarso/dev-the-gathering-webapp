import { ApolloProvider } from '@apollo/client';
import { useContext, useEffect } from 'react';
import { ApplicationContext } from 'src/contexts/application';
import { AuthContext } from 'src/contexts/auth';
import { isAnICentralizedAuthenticatedUser } from 'src/interfaces/user';
import CardAlbum from '../../shared/card-album/card-album';
import CardAlbumContainer from '../../shared/card-album/card-album-container';
import SignIn from '../../shared/sign-in/sign-in';
import StyledMainContent from './main-content.style';

const MainContent = () => {
  const user = useContext(AuthContext);  

  return (
    <StyledMainContent>
      {user ? (
        <CardAlbumContainer/>
      ) : (
        <SignIn />
      )}
    </StyledMainContent>
  );
};

export default MainContent;
