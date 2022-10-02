import { Card } from 'src/entities/card';
import { CardRarityEnum } from 'src/enums/card-rarity.enum';

export type DevTheGatheringCard = {
  id: number;
  number: number;
  rarity: CardRarityEnum;
  name: string;
  imgSrc: string;
};

export type DevTheGatheringCardsType = {
  [key: number]: DevTheGatheringCard;
};

export const enumFromStringValue = <T>(enm: { [s: string]: T}, value: string): T | undefined => {
  return (Object.values(enm) as unknown as string[]).includes(value)
    ? value as unknown as T
    : undefined;
}

export const mergeWithResponseCard = (card: Card) => {
  return {
    id: card.id,
    externalId: card.externalId,
    number: DevTheGatheringCards[card.externalId].number,
    ownerId: card.ownerId,
    rarity: card.rarity,
    foil: card.foil,
    quantity: card.quantity,
    level: card.level,
    createdAt: card.createdAt,
    updatedAt: card.updatedAt,
    name: DevTheGatheringCards[card.externalId].name,
    imgSrc: DevTheGatheringCards[card.externalId].imgSrc,
  };
};

const DevTheGatheringCards: DevTheGatheringCardsType = {
  1: { id: 1, rarity: CardRarityEnum.COMMON, number: 1, name: 'HTML', imgSrc: '' },
  2: { id: 2, rarity: CardRarityEnum.COMMON, number: 2, name: 'CSS', imgSrc: '' },
  3: { id: 3, rarity: CardRarityEnum.COMMON, number: 3, name: 'JavaScript', imgSrc: '' },
  4: { id: 4, rarity: CardRarityEnum.COMMON, number: 4, name: 'jQuery', imgSrc: '' },
  1001: { id: 1001, rarity: CardRarityEnum.UNCOMMON, number: 5, name: 'AngularJS', imgSrc: '' },
  5: { id: 5, rarity: CardRarityEnum.COMMON, number: 6, name: 'Bootstrap', imgSrc: '' },
  1002: { id: 1002, rarity: CardRarityEnum.UNCOMMON, number: 7, name: 'Vue.js', imgSrc: '' },
  2001: { id: 2001, rarity: CardRarityEnum.RARE, number: 8, name: 'React', imgSrc: '' },
  3001: { id: 3001, rarity: CardRarityEnum.EPIC, number: 9, name: 'Angular', imgSrc: '' },
  1003: { id: 1003, rarity: CardRarityEnum.UNCOMMON, number: 10, name: 'Tailwind', imgSrc: '' },
  2002: { id: 2002, rarity: CardRarityEnum.RARE, number: 11, name: 'ASP', imgSrc: '' },
  6: { id: 6, rarity: CardRarityEnum.COMMON, number: 12, name: 'ASP.NET', imgSrc: '' },
  1004: { id: 1004, rarity: CardRarityEnum.UNCOMMON, number: 13, name: 'C#', imgSrc: '' },
  7: { id: 7, rarity: CardRarityEnum.COMMON, number: 14, name: 'PHP', imgSrc: '' },
  1005: { id: 1005, rarity: CardRarityEnum.UNCOMMON, number: 15, name: 'Laravel', imgSrc: '' },
  2003: { id: 2003, rarity: CardRarityEnum.RARE, number: 16, name: 'Perl', imgSrc: '' },
  3002: { id: 3002, rarity: CardRarityEnum.EPIC, number: 17, name: 'Node.js', imgSrc: '' },
  1006: { id: 1006, rarity: CardRarityEnum.UNCOMMON, number: 18, name: 'Express', imgSrc: '' },
  8: { id: 8, rarity: CardRarityEnum.COMMON, number: 19, name: 'Java', imgSrc: '' },
  9: { id: 9, rarity: CardRarityEnum.COMMON, number: 20, name: 'Python', imgSrc: '' },
  2004: { id: 2004, rarity: CardRarityEnum.RARE, number: 21, name: 'Solidity', imgSrc: '' },
  4001: { id: 4001, rarity: CardRarityEnum.LEGENDARY, number: 22, name: 'GoHorse', imgSrc: '' },
};

export default DevTheGatheringCards;
