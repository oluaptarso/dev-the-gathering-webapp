import React from 'react';
import styled from 'styled-components';
import { cardFrontBackSharedStyle } from './card';
import { CardRarityEnum } from 'src/enums/card-rarity.enum';
import { Pulse } from 'src/styles/animations';

type StyleProps = {
  flipped: boolean;
  canBeFlipped: boolean;
  rarity: CardRarityEnum;
};

const StyledCardBack = styled.div<StyleProps>`
  ${cardFrontBackSharedStyle};
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
