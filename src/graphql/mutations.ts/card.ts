import { gql } from '@apollo/client';

export const OPEN_BOOSTER_PACK = gql`
  mutation openBoosterPack {
    openBoosterPack {
      id
      externalId
      ownerId
      rarity
      foil
      level
      quantity
      createdAt
      updatedAt
    }
  }
`;
