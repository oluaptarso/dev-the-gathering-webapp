import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { ethers } from 'ethers';
import IDevTheGatheringService from '../../interfaces/dev-the-gathering.service';
import { ExternalProvider } from '@ethersproject/providers';
import ContractAbi from "src/contracts/DevTheGatheringV2.json";

declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }
}

const DevTheGatheringDecentralizedService: IDevTheGatheringService = {
  getApolloClient: (): ApolloClient<NormalizedCacheObject> => {
    return new ApolloClient({
      uri: process.env.NEXT_PUBLIC_DECENTRALIZED_GRAPHQL_URL,
      cache: new InMemoryCache(),
    });
  },
  getContract: (): ethers.Contract | null => {
    const ethereum = global?.window?.ethereum;

    if (ethereum && ethereum.request) {
      // Creating a new provider
      const provider = new ethers.providers.Web3Provider(ethereum);
      // Getting the signer
      const signer = provider.getSigner();
      // Creating a new contract factory with the signer, address and ABI
      let contract = new ethers.Contract(process.env.NEXT_PUBLIC_DECENTRALIZED_CONTRACT_ADDRESS || '', ContractAbi.abi, signer);
      // Returning the contract
      return contract;
    }

    return null;
  },
};

export default DevTheGatheringDecentralizedService;
