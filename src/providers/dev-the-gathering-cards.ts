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
  1: { id: 1, rarity: CardRarityEnum.COMMON, number: 1, name: 'HTML', imgSrc: '/cards/001.png' },
  2: { id: 2, rarity: CardRarityEnum.COMMON, number: 2, name: 'CSS', imgSrc: '/cards/002.png' },
  3: { id: 3, rarity: CardRarityEnum.COMMON, number: 3, name: 'JavaScript', imgSrc: '/cards/003.png' },
  4: { id: 4, rarity: CardRarityEnum.COMMON, number: 4, name: 'jQuery', imgSrc: '/cards/004.png' },
  1001: { id: 1001, rarity: CardRarityEnum.UNCOMMON, number: 5, name: 'AngularJS', imgSrc: '/cards/005.png' },
  5: { id: 5, rarity: CardRarityEnum.COMMON, number: 6, name: 'Bootstrap', imgSrc: '/cards/006.png' },
  1002: { id: 1002, rarity: CardRarityEnum.UNCOMMON, number: 7, name: 'Vue.js', imgSrc: '/cards/007.png' },
  2001: { id: 2001, rarity: CardRarityEnum.RARE, number: 8, name: 'React', imgSrc: '/cards/008.png' },
  3001: { id: 3001, rarity: CardRarityEnum.EPIC, number: 9, name: 'Angular', imgSrc: '/cards/009.png' },
  1003: { id: 1003, rarity: CardRarityEnum.UNCOMMON, number: 10, name: 'Tailwind', imgSrc: '/cards/010.png' },
  2002: { id: 2002, rarity: CardRarityEnum.RARE, number: 11, name: 'Rust', imgSrc: '/cards/011.png' },
  6: { id: 6, rarity: CardRarityEnum.COMMON, number: 12, name: 'ASP.NET', imgSrc: '/cards/012.png' },
  1004: { id: 1004, rarity: CardRarityEnum.UNCOMMON, number: 13, name: 'C#', imgSrc: '/cards/013.png' },
  7: { id: 7, rarity: CardRarityEnum.COMMON, number: 14, name: 'PHP', imgSrc: '/cards/014.png' },
  1005: { id: 1005, rarity: CardRarityEnum.UNCOMMON, number: 15, name: 'Laravel', imgSrc: '/cards/015.png' },
  2003: { id: 2003, rarity: CardRarityEnum.RARE, number: 16, name: 'Perl', imgSrc: '/cards/016.png' },
  3002: { id: 3002, rarity: CardRarityEnum.EPIC, number: 17, name: 'Node.js', imgSrc: '/cards/017.png' },
  1006: { id: 1006, rarity: CardRarityEnum.UNCOMMON, number: 18, name: 'Express', imgSrc: '/cards/018.png' },
  8: { id: 8, rarity: CardRarityEnum.COMMON, number: 19, name: 'Java', imgSrc: '/cards/019.png' },
  9: { id: 9, rarity: CardRarityEnum.COMMON, number: 20, name: 'Python', imgSrc: '/cards/020.png' },
  2004: { id: 2004, rarity: CardRarityEnum.RARE, number: 21, name: 'Solidity', imgSrc: '/cards/021.png' },
  4001: { id: 4001, rarity: CardRarityEnum.LEGENDARY, number: 22, name: 'XGH', imgSrc: '/cards/022.png' },
};

export default DevTheGatheringCards;
