import ReactLoading from 'react-loading';
import { Flex } from 'src/styles/mixins/flex';
import styled from 'styled-components';

const StyledLoadingContainer = styled.div`
  ${Flex({ justifyContent: 'center', alignItems: 'center', flexGrow: 1 })}
  div {
    ${Flex({ justifyContent: 'center' })}
  }
`;

const LoadingContainer = () => {
  return (
    <StyledLoadingContainer>
      <ReactLoading type="cylon" color="white" height={128} width={128} />
    </StyledLoadingContainer>
  );
};

export default LoadingContainer;
