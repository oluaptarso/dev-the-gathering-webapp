import { Flex } from 'src/styles/mixins/flex';
import styled from 'styled-components';

const StyledMainContent = styled.main`
  ${Flex({ flexGrow: 1, direction: 'column', justifyContent: 'flex-start', alignItems: 'center', textAlign: 'center' })};
  min-height: calc(100vh - 57px);
  padding: 2rem 1rem;
  color: white;
`;

export default StyledMainContent;