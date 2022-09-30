import { Flex } from 'src/styles/mixins/flex';
import styled from 'styled-components';

const StyledMainContent = styled.main`
  ${Flex({ flexGrow: 1, direction: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' })};
  min-height: calc(100vh - 57px);
  padding: 4rem 1rem;
  color: white;

  div {
    ${Flex({ direction: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' })};
    max-width: 800px;

    @media (max-width: 600px) {
      width: 100%;
      flex-direction: column;
    }
  }
`;

export default StyledMainContent;