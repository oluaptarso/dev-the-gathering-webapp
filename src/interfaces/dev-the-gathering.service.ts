import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

export default interface IDevTheGatheringService {
  getApolloClient: (token:string) => ApolloClient<NormalizedCacheObject>;
}
