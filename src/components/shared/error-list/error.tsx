import styled from 'styled-components';

type ErrorProps = {
  message: string;
};

const StyledError = styled.li`
  min-height: 24px;
`;

export const Error = (props: ErrorProps) => {
  return <StyledError>{props.message}</StyledError>;
};
