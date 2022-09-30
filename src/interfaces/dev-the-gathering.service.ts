import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

export default interface IDevTheGatheringService {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}
