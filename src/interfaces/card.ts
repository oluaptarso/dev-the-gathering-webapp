import { CardRarityEnum } from "src/enums/card-rarity.enum";

export default interface ICard {
  id:string;
  externalId:number;
  number:number;
  ownerId:string;
  rarity: CardRarityEnum;
  name:string;
  imgSrc:string;
  foil:boolean;
  quantity:number;
  level:number;
  createdAt:number;
  updatedAt:number;
}