import Link from 'next/link';
import { ReactNode } from 'react';
import { Pulse } from 'src/styles/animations';
import styled from 'styled-components';

const StyledLinkButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  color: #fff;
  width: 220px;
  margin: 0 0.5rem;
  border: 1px solid #38fbdb;
  border-radius: 10px 0;
  height: 60px;
  cursor: pointer;
  font-size: 18px;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-name: ${Pulse({ inset: true })};
  animation-timing-function: linear;
  text-decoration: none;

  &:hover {
    color: #fff;
    animation-duration: 0.5s;
  }
  &:focus-visible {
    outline: none;
    animation-duration: 0.5s;
  }
`;

export type StyledButtonProps = {
  secondary?: boolean;
  children?: ReactNode;
  $loading: boolean;
};
//StyledComponent<"button", any, {}, never>
const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  color: #fff;
  width: 220px;
  border: 1px solid ${(props) => (props.secondary ? '#ff7fab' : '#38fbdb')};
  border-radius: 10px 0;
  height: 60px;
  cursor: pointer;
  font-size: 18px;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-name: ${(props) => (props.secondary ? Pulse({ color: '#ff7fab', inset: true }) : Pulse({ inset: true }))};
  animation-timing-function: linear;
  text-decoration: none;
  background: transparent;

  &:hover {
    color: #fff;
    animation-duration: 0.5s;
  }
  &:focus-visible {
    outline: none;
    animation-duration: 0.5s;
  }

  &:disabled {
    animation-duration: 2.5s;
    opacity: 0.6;
    cursor: default;
  }

  ${(props) => (props.$loading ? 'animation-duration: 0.3s !important' : '')};
`;

interface LinkButtonProps {
  children: ReactNode | ReactNode[];
  href: string;
}

export interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  secondary?: boolean;
  loading?: boolean;
}

export const Button = ({ onClick, disabled, children, className, secondary, type = 'button', loading = false }: React.PropsWithChildren<ButtonProps>) => {
  return (
    <StyledButton secondary={secondary} onClick={onClick} className={className} disabled={disabled} $loading={loading} type={type}>
      {children}
    </StyledButton>
  );
};

const LinkButton = ({ children, href }: LinkButtonProps) => {
  return (
    <Link href={href}>
      <StyledLinkButton>{children}</StyledLinkButton>
    </Link>
  );
};

export default LinkButton;
