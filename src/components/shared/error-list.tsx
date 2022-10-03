import styled from "styled-components";

type ErrorListProps = {
  centerText?: boolean
}

export const ErrorList = styled.ul<ErrorListProps>`
  text-align: ${props => props.centerText ? 'center' : 'left'};
  list-style: none;
  padding-left: 0.5rem;
  color: #ff81ac;

  li {
    min-height: 24px;
  }
`;
