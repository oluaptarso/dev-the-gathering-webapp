import React, { ReactNode } from 'react';
import styled from 'styled-components';

type StyleProps = {
  flipped: boolean;
};

const StyledCard3DContainer = styled.div<StyleProps>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform-style: preserve-3d;
  transition: transform 450ms ease-out;
  transform: ${(props) => (props.flipped ? 'rotateY(180deg)' : 'none')};
`;

type Container3DProps = {
  flipped: boolean;
  children?: ReactNode;
};

export const Container3D = ({ flipped, children }: Container3DProps) => {
  return <StyledCard3DContainer flipped={flipped}>{children}</StyledCard3DContainer>;
};
