import styled from 'styled-components';
import { Error } from './error';

type StyledErrorListProps = {
  textAlign?: string;
};

const StyledErrorList = styled.ul<StyledErrorListProps>`
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'left')};
  list-style: none;
  padding-left: 0.5rem;
  color: #ff81ac;
`;

type ErrorListProps = {
  errors: (string | undefined)[];
  textAlign?: string;
};

export const ErrorList = (props: ErrorListProps) => {
  const keyBase = +new Date();
  return (
    <StyledErrorList textAlign={props.textAlign}>
      {props.errors.map((error, i) => {
        if (error) {
          return <Error key={`${keyBase}-${i}`} message={error} />;
        }
      })}
    </StyledErrorList>
  );
};
