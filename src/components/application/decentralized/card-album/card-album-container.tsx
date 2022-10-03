import { ApolloProvider } from '@apollo/client';
import { useContext } from 'react';
import { ApplicationContext } from 'src/contexts/application';
import { AuthContext } from 'src/contexts/auth';
import DecentralizedCardAlbum from './card-album';

const DecentralizedCardAlbumContainer = () => {
  const user = useContext(AuthContext);
  const application = useContext(ApplicationContext);

  // only load if has an application and user.
  if (!application || !user) return <></>;

  const apolloClient = application.devTheGatheringService.getApolloClient();

  return (
    <ApolloProvider client={apolloClient}>
      <DecentralizedCardAlbum />
    </ApolloProvider>
  );
};

export default DecentralizedCardAlbumContainer;
