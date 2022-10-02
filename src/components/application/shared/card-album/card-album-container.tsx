import { ApolloProvider } from "@apollo/client";
import { useContext } from "react";
import { ApplicationContext } from "src/contexts/application";
import { AuthContext } from "src/contexts/auth";
import { isAnICentralizedAuthenticatedUser } from "src/interfaces/user";
import CardAlbum from "./card-album";

const CardAlbumContainer = () => {
  
  const user = useContext(AuthContext);
  const application = useContext(ApplicationContext);

  // only load if has an application and user.
  if (!application || !user) return <></>;

  // garantees that the user is an ICentralizedAuthenticatedUser
  if(!isAnICentralizedAuthenticatedUser(user)) return <></>;

  const apolloClient = application.devTheGatheringService.getApolloClient(user.token);  
  
  return (
    <ApolloProvider client={apolloClient}>
      <CardAlbum />
    </ApolloProvider>
  );
};

export default CardAlbumContainer;
