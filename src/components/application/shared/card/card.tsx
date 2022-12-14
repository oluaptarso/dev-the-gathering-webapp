import { useRef, useState } from 'react';
import { Card as CardEntity } from 'src/entities/card';
import { Container3D } from './card-3d-container';
import { CardBack } from './card-back';
import { Container } from './card-container';
import { CardFront } from './card-front';
import { CardRarityEnum } from 'src/enums/card-rarity.enum';
import { Flex } from 'src/styles/mixins/flex';
import styled, { css } from 'styled-components';
import { useMouseEvents } from 'src/hooks/useMouseEvents';

const StyledCard = styled.div`
  ${Flex({ alignItems: 'center', justifyContent: 'center' })}
  padding:calc(var(--bs-gutter-x) * .5);
  margin: 0;
`;

export const CardComponent = ({ data, canBeFlipped = false, onFlipped }: { data: CardEntity; canBeFlipped?: boolean; onFlipped?: () => void }) => {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const flipCard = () => {
    if (canBeFlipped && !flipped) {
      setFlipped(true);
      if (onFlipped) {
        onFlipped();
      }
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    const normalizedX = e.offsetX / 240;
    const normalizedY = e.offsetY / 400;

    if (e.currentTarget) {
      (e.currentTarget  as HTMLElement).style.transform = `translate3d(${Math.cos(Math.PI * normalizedX) * 5}px, ${Math.cos(Math.PI * normalizedY) * 5}px, 0)`;
    }
  };

  const handleMouseLeave = (e: MouseEvent) => {
    if (e.currentTarget) {
      (e.currentTarget as HTMLElement).style.transform = `none`;
    }
  };

  useMouseEvents({ onMove: handleMouseMove, onLeave: handleMouseLeave, target: cardRef });

  const normalizedRarity = +CardRarityEnum[data.rarity];

  return (
    <StyledCard className="col-12 col-md-6 col-lg-4">
      <Container flipped={flipped} canBeFlipped={canBeFlipped} ref={cardRef} onClick={flipCard}>
        <Container3D flipped={flipped}>
          <CardFront card={data} flipped={flipped} canBeFlipped={canBeFlipped} />
          <CardBack flipped={flipped} canBeFlipped={canBeFlipped} rarity={normalizedRarity} />
        </Container3D>
      </Container>
    </StyledCard>
  );
};
