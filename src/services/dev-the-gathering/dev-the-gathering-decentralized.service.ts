import { ApolloClient, InMemoryCache } from '@apollo/client';
import IDevTheGatheringService from '../../interfaces/dev-the-gathering.service';

const DevTheGatheringDecentralizedService: IDevTheGatheringService = {
  apolloClient: new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/oluaptarso/devthegathering',
    cache: new InMemoryCache(),
  }),
};

export default DevTheGatheringDecentralizedService;
