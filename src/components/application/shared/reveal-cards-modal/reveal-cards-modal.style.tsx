import { TransitionStatus } from 'react-transition-group';
import { Flex } from 'src/styles/mixins/flex';
import styled from 'styled-components';

export type StyledRevealCardsModalProps = {
  state: TransitionStatus;
};

const StyledRevealCardsModal = styled.div<StyledRevealCardsModalProps>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  ${Flex({ alignItems: 'center', justifyContent: 'center' })}
  transition: all 0.5s ease-out;
  opacity: ${({ state }) => (state === 'entered' ? 1 : 0)};
  display: ${({ state }) => (state === 'exited' ? 'none' : 'flex')};

  .backdrop {
    background: linear-gradient(to bottom, rgba(12, 33, 67, 1) 0%, rgba(12, 33, 67, 1) 76%, rgba(56, 12, 92, 1) 100%);
    width: 100%;
    height: 100%;
    position: fixed;
  }

  .modal-content {
    background: linear-gradient(167deg, rgba(11, 30, 62, 1) 0%, rgba(18, 45, 90, 1) 33%, rgba(143, 82, 245, 1) 66%, rgba(56, 251, 219, 1) 100%);
    min-height: 400px;
    width: 80vw;
    box-shadow: 0px 0px 20px 10px rgb(139, 81, 240, 0.5);
    border: 3px solid #7e4de0;
    border-radius: 10px;
    ${Flex({ alignItems: 'center', justifyContent: 'flex-start' })}
    transition: transform ${({ state }) => (state === 'entered' ? '0.3s 0.2s' : '0s')} ease-in-out, opacity ${({ state }) => (state === 'entered' ? '0.3s' : '0s')} ease-out;
    transform: ${({ state }) => (state === 'entered' ? 'scale(1) translateY(0%);' : 'scale(0.9) translateY(20%)')};
    opacity: ${({ state }) => (state === 'entered' ? '1' : '0')};
    overflow-y: auto;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    max-width: 1060px;

    .cards-container {
      margin: 0 auto;
      max-width: 960px;
    }
    .cards-modal-footer {
      ${Flex({ justifyContent: 'center' })};
    }
  }
`;

export default StyledRevealCardsModal;
