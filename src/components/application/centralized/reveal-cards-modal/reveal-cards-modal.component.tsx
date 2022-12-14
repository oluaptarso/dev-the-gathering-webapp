import { Reducer, useEffect, useReducer, useRef } from 'react';
import { Card } from 'src/entities/card';
import StyledRevealCardsModal from '../../shared/reveal-cards-modal/reveal-cards-modal.style';
import { Transition } from 'react-transition-group';
import { Button } from 'src/components/shared/button';
import { useApolloClient } from '@apollo/client';
import { OPEN_BOOSTER_PACK } from 'src/graphql/mutations.ts/card';
import { mergeWithResponseCard } from 'src/providers/dev-the-gathering-cards';
import { CardComponent } from '../../shared/card/card';
import { Scrollbars } from 'react-custom-scrollbars';
import LoadingContainer from 'src/components/shared/loading-container';

interface RevealCardsModalState {
  animate: boolean;
  cards: Card[];
  revealedCards: number;
  loading: boolean;
}

const CentralizedRevealCardsModal = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  const [state, setState] = useReducer<Reducer<RevealCardsModalState, Partial<RevealCardsModalState>>>((state, newState) => ({ ...state, ...newState }), {
    animate: show,
    cards: [],
    revealedCards: 0,
    loading: true,
  });

  const client = useApolloClient();

  const openBoosterPack = async () => {
    const response = await client.mutate({ mutation: OPEN_BOOSTER_PACK, fetchPolicy: 'no-cache' });
    const cards: Card[] = [];
    response.data.openBoosterPack.forEach((card: any) => {
      //card.rarity = enumFromStringValue(CardRarityEnum, card.rarity) || CardRarityEnum.COMMON;
      cards.push(mergeWithResponseCard(card));
    });
    
    setState({ cards: cards, loading: false });
  };

  const cardFlipped = () => {
    setState({ revealedCards: state.revealedCards + 1 });
  };

  useEffect(() => {
    if (show) {
      setState({ animate: show, loading: true });
      openBoosterPack();
    } else {
      setState({ animate: show, loading: true, cards: [], revealedCards: 0 });
    }
  }, [show]);

  const nodeRef = useRef(null);

  return (
    <Transition in={state.animate} nodeRef={nodeRef} timeout={500} onExited={onClose}>
      {(animateState) => (
        // state change: exited -> entering -> entered -> exiting -> exited
        <StyledRevealCardsModal ref={nodeRef} state={animateState}>
          <div className="backdrop"></div>
          <div className="modal-content">
            {state.loading ? (
              <LoadingContainer />
            ) : (
              <Scrollbars style={{ maxHeight: 'calc(100vh - 210px)', minHeight: '570px' }} autoHide={true}>
                <h2>Reveal your cards!</h2>
                <div className="cards-container row">
                  {state.cards.length &&
                    state.cards.map((cardData, i) => <CardComponent key={`card-${cardData.id}-${i}`} canBeFlipped={true} data={cardData} onFlipped={cardFlipped} />)}
                </div>
                <div className="cards-modal-footer mt-4">
                  {state.revealedCards > 0 && state.revealedCards == state.cards.length && (
                    <Button
                      onClick={() => {
                        setState({ animate: false });
                      }}
                    >
                      Done!
                    </Button>
                  )}
                </div>
              </Scrollbars>
            )}
          </div>
        </StyledRevealCardsModal>
      )}
    </Transition>
  );
};

export default CentralizedRevealCardsModal;
