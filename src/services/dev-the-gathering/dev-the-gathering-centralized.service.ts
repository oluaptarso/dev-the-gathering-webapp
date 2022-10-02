import IDevTheGatheringService from '../../interfaces/dev-the-gathering.service';
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

const DevTheGatheringCentralizedService: IDevTheGatheringService = {
  getApolloClient: (token: string): ApolloClient<NormalizedCacheObject> => {
    return new ApolloClient({
      uri: process.env.NEXT_PUBLIC_CENTRALIZED_GRAPHQL_URL,
      cache: new InMemoryCache(),
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
};

export default DevTheGatheringCentralizedService;
