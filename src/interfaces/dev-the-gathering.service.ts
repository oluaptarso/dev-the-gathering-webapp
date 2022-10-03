import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { ethers } from 'ethers';

export default interface IDevTheGatheringService {
  getApolloClient: (token?:string) => ApolloClient<NormalizedCacheObject>;
  getContract?: () => ethers.Contract | null; 
}
