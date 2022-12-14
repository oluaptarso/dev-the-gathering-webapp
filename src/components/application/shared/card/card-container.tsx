import React, { ReactNode, useEffect } from 'react';
import styled from 'styled-components';

type StyleProps = {
  flipped: boolean;
  canBeFlipped: boolean;
};

const StyledCardContainer = styled.div<StyleProps>`
  height: 400px;
  width: 240px;
  position: relative;
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: transform 50ms;
  cursor: ${(props) => (!props.flipped && props.canBeFlipped ? 'pointer' : 'default')};
`;

type ContainerProps = {
  flipped: boolean;
  canBeFlipped?: boolean;
  children?: ReactNode;
  onClick: () => void;
};

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(({ flipped, onClick, children, canBeFlipped = false }, ref) => {
  return (
    <StyledCardContainer ref={ref} flipped={flipped} canBeFlipped={canBeFlipped} onClick={onClick}>
      {children}
    </StyledCardContainer>
  );
});

Container.displayName = 'Card.Container';

export { Container };
