import Link from 'next/link';
import { ReactNode } from 'react';
import { Pulse } from 'src/styles/animations';
import styled from 'styled-components';

const StyledButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  color: #fff;
  width: 220px;
  margin: 0 0.5rem;
  border: 1px solid #38fbdb;
  border-radius: 10px 0 10px 0;
  height: 60px;
  cursor: pointer;
  font-size: 18px;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-name: ${Pulse};
  animation-timing-function: linear;
  text-decoration: none;

  &:hover {
    color: #fff;
    animation-duration: 0.5s;
  }
`;

interface ButtonProps {
  children: ReactNode | ReactNode[];
  href: string;
}

const Button = ({ children, href }: ButtonProps) => {
  return (
    <Link href={href}>
      <StyledButton>{children}</StyledButton>
    </Link>
  );
};

export default Button;
