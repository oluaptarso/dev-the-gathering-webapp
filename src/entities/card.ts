import { CardRarityEnum } from 'src/enums/card-rarity.enum';
import ICard from 'src/interfaces/card';

export class Card implements ICard {
  id = '0';
  externalId = 0;
  number = 0;
  ownerId = '';
  rarity: CardRarityEnum = CardRarityEnum.COMMON;
  name = '';
  imgSrc = '';
  foil = false;
  quantity = 0;
  level = 0;
  createdAt = 0;
  updatedAt = 0;
}
