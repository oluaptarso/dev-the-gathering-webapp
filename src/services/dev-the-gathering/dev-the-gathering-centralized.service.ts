import IDevTheGatheringService from '../../interfaces/dev-the-gathering.service';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const DevTheGatheringCentralizedService: IDevTheGatheringService = {
  apolloClient: new ApolloClient({
    uri: 'https://us-central1-dev-the-gathering.cloudfunctions.net/graphql',
    cache: new InMemoryCache(),
  }),
};

export default DevTheGatheringCentralizedService;
