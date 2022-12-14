import React from 'react';
import styled from 'styled-components';
import { Card as CardEntity } from 'src/entities/card';
import { CardRarityEnum } from 'src/enums/card-rarity.enum';
import { Pulse, GlitchWithInterval } from 'src/styles/animations';

type StyleProps = {
  flipped: boolean;
  canBeFlipped: boolean;
  rarity: CardRarityEnum;
  imgSrc?: string;
  foil: boolean;
};

const StyledCardFront = styled.div<StyleProps>`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  background-image: ${(props) => (!!props.imgSrc ? `url(${props.imgSrc})` : 'none')};
  transform: ${(props) => (props.canBeFlipped ? 'rotateY(180deg)' : 'none')};
  font-size: 17px;
  border-radius: 16px;
  animation-name: ${(props) => (props.foil ? Pulse({ primaryColor: `var(--rarity-color-${props.rarity})`, secondaryColor: 'gold' }) : 'none')};
  animation-duration: 1s;
  animation-iteration-count: infinite;

  .foil-glitch {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-image: ${(props) => (!!props.imgSrc ? `url(${props.imgSrc})` : 'none')};
    animation: ${(props) => (props.foil ? GlitchWithInterval : 'none')} 6s linear infinite alternate;
  }

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
`;

type CardFrontProps = {
  card: CardEntity;
  flipped: boolean;
  canBeFlipped: boolean;
};

export const CardFront = ({ card, flipped, canBeFlipped }: CardFrontProps) => {
  return (
    <StyledCardFront flipped={flipped} canBeFlipped={canBeFlipped} rarity={card.rarity} imgSrc={card.imgSrc} foil={card.foil}>
      <div className="level">{card.level}</div>
      <div className="quantity">{card.quantity > 0 ? `+${card.quantity}` : ''}</div>
      {card.foil && (
        <div className="foil-glitch">
          <div className="level">{card.level}</div>
          <div className="quantity">{card.quantity > 0 ? `+${card.quantity}` : ''}</div>
        </div>
      )}
    </StyledCardFront>
  );
};
