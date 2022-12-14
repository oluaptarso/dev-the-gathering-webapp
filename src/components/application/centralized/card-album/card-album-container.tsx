import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import { useContext } from 'react';
import { ApplicationContext } from 'src/contexts/application';
import { AuthContext } from 'src/contexts/auth';
import { isAnICentralizedAuthenticatedUser } from 'src/interfaces/user';
import CentralizedCardAlbum from './card-album';

const CentralizedCardAlbumContainer = () => {
  const user = useContext(AuthContext);
  const application = useContext(ApplicationContext);

  // only load if has an application and user.
  if (!application || !user) return <></>;

  // guarantees that is the right kind of application.
  if (!isAnICentralizedAuthenticatedUser(user)) return <></>;

  const apolloClient = application.devTheGatheringService.getApolloClient(user.token);

  return (
    <ApolloProvider client={apolloClient}>
      <CentralizedCardAlbum />
    </ApolloProvider>
  );
};

export default CentralizedCardAlbumContainer;
