import React from 'react';
import styled from 'styled-components';
import { CardRarityEnum } from 'src/enums/card-rarity.enum';
import { Pulse } from 'src/styles/animations';

type StyleProps = {
  flipped: boolean;
  canBeFlipped: boolean;
  rarity: CardRarityEnum;
};

const StyledCardBack = styled.div<StyleProps>`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  background-image: url('/cards/back.png');
  transform: ${(props) => (!props.canBeFlipped ? 'rotateY(180deg)' : 'none')};
  border-radius: 16px;
  &:hover {
    animation-name: ${(props) => (!props.flipped ? Pulse({ primaryColor: `var(--rarity-color-${props.rarity})`, secondaryColor: `var(--rarity-color-${props.rarity})` }) : 'none')};
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }
`;

type CardBackProps = {
  flipped: boolean;
  canBeFlipped: boolean;
  rarity: CardRarityEnum;
};

export const CardBack = ({ flipped, canBeFlipped, rarity }: CardBackProps) => {
  return <StyledCardBack flipped={flipped} canBeFlipped={canBeFlipped} rarity={rarity} />;
};
