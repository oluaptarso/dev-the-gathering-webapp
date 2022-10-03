import { gql } from '@apollo/client';

export const GET_CARDS = gql`
  query GetCards {
    cards {
      id
      externalId
      ownerId
      rarity
      foil
      quantity
      level
      createdAt
      updatedAt
    }
  }
`;

export const GET_CARDS_BY_OWNER = gql`
  query GetCardsByOwner ($owner: String!) {
    cards(where: { owner: $owner }) {
      id
      externalId
      owner
      rarity
      foil
      quantity
      level
      createdAt
      updatedAt
    }
  }
`;
