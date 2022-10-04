import { CardRarityEnum } from 'src/enums/card-rarity.enum';
import { Pulse } from 'src/styles/animations';
import { Flex } from 'src/styles/mixins/flex';
import { Glass } from 'src/styles/mixins/glass';
import styled from 'styled-components';

type StyleCardProps = {
  flipped: boolean;
  canBeFlipped: boolean;
  rarity: CardRarityEnum;
  imgSrc?: string;
};

const getRarityColor = (rarity: CardRarityEnum) => {
  const verify = typeof rarity == 'number' ? rarity : +CardRarityEnum[rarity];
  switch (verify) {
    case CardRarityEnum.UNCOMMON:
      return '#24ce6b';
    case CardRarityEnum.RARE:
      return '#2473ce';
    case CardRarityEnum.EPIC:
      return '#a624ce';
    case CardRarityEnum.LEGENDARY:
      return '#ceb524';
    default:
      return '#c9c9c9';
  }
};

const StyledCard = styled.div<StyleCardProps>`
  ${Flex({ alignItems: 'center', justifyContent: 'center' })}
  padding:calc(var(--bs-gutter-x) * .5);
  margin: 0;

  .card-container {
    height: 400px;
    width: 240px;
    position: relative;
    transform-style: preserve-3d;
    perspective: 1000px;
    transition: transform 50ms;
    cursor: ${(props) => (!props.flipped && props.canBeFlipped ? 'pointer' : 'default')};

    .card-3d-container {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      transform-style: preserve-3d;
      transition: transform 450ms ease-out;
      transform: ${(props) => (props.flipped ? 'rotateY(180deg)' : 'none')};

      .card-front,
      .card-back {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        transform-style: preserve-3d;
        backface-visibility: hidden;
      }
      .card-front {
        background-image: ${(props) => (!!props.imgSrc ? `url(${props.imgSrc})` : 'none')};
        transform: ${(props) => (props.canBeFlipped ? 'rotateY(180deg)' : 'none')};
        font-size: 17px;
        .level {
          position: absolute;
          top: 242px;
          left: 55px;
        }

        .quantity {
          position: absolute;
          bottom: 36px;
          right: 90px;
        }
      }
      .card-back {
        background-image: url('/cards/back.png');
        transform: ${(props) => (!props.canBeFlipped ? 'rotateY(180deg)' : 'none')};
        border-radius: 16px;
        &:hover {
          animation-name: ${(props) => (!props.flipped ? Pulse({ primaryColor: getRarityColor(props.rarity), secondaryColor: getRarityColor(props.rarity) }) : 'none')};
          animation-duration: 1s;
          animation-iteration-count: infinite;
        }
      }
    }
  }
`;

export default StyledCard;
