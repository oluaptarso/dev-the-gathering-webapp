import { Pulse } from 'src/styles/animations';
import { Flex } from 'src/styles/mixins/flex';
import { Glass } from 'src/styles/mixins/glass';
import styled from 'styled-components';

const StyledCardAlbum = styled.div`
  width: 100%;

  .content {
    ${Glass};
    border-radius: 5px;
    padding: var(--bs-gutter-x);
    z-index:1;
  }

  .booster-pack-already-opened-alert {
    width: 100%;
    margin-right: 1rem;
    height: 60px;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-name: ${Pulse({color:'#ffeeba', inset: true})};
    animation-timing-function: linear;
    border: 1px solid #ffeeba;
    color:#ffdf7e;
    opacity:0.8;
    ${Flex({alignItems: 'center', direction: 'column', justifyContent: 'center'})};
    border-radius: 10px;
  }
`;

export default StyledCardAlbum;
