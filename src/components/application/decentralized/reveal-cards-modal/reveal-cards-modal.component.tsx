import { Reducer, useContext, useEffect, useReducer, useRef } from 'react';
import { Card } from 'src/entities/card';
import StyledRevealCardsModal from '../../shared/reveal-cards-modal/reveal-cards-modal.style';
import { Transition } from 'react-transition-group';
import { Button } from 'src/components/shared/buttons';
import { mergeWithResponseCard } from 'src/providers/dev-the-gathering-cards';
import { CardComponent } from '../../shared/card/card';
import { Scrollbars } from 'react-custom-scrollbars';
import LoadingContainer from 'src/components/shared/loading-container';
import { ErrorList } from 'src/components/shared/error-list/error-list';
import { ApplicationContext } from 'src/contexts/application';
import Spacer from 'src/components/shared/spacer';
import { BigNumber } from 'ethers';
import { AuthContext } from 'src/contexts/auth';
import { CardRarityEnum } from 'src/enums/card-rarity.enum';

interface RevealCardsModalState {
  animate: boolean;
  cards: Card[];
  revealedCards: number;
  loading: boolean;
  hasError: boolean;
  waitingCards: boolean;
  errorMessage: string;
}

let _cards: Card[] = [];

const DecentralizedRevealCardsModal = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  const [state, setState] = useReducer<Reducer<RevealCardsModalState, Partial<RevealCardsModalState>>>((state, newState) => ({ ...state, ...newState }), {
    animate: show,
    cards: [],
    revealedCards: 0,
    loading: true,
    hasError: false,
    waitingCards: false,
    errorMessage: '',
  });

  const application = useContext(ApplicationContext);
  const user = useContext(AuthContext);

  useEffect(() => {
    if (show) {
      setState({ animate: show, loading: true });
      openBoosterPack();
    } else {
      setState({ animate: show, cards: [], revealedCards: 0, loading: true, hasError: false, waitingCards: false, errorMessage: '' });
    }
  }, [show]);

  useEffect(() => {
    if (application && typeof application.devTheGatheringService.getContract === 'function') {
      const contract = application.devTheGatheringService.getContract();
      if (contract) {
        contract.on('CardCreated', cardCreatedOrUpdated);
        contract.on('CardUpdated', cardCreatedOrUpdated);

        return () => {
          contract.off('CardCreated', cardCreatedOrUpdated);
          contract.off('CardUpdated', cardCreatedOrUpdated);
        };
      }
    }
  }, []);

  const nodeRef = useRef(null);

  if (!application) return <></>;

  const cardCreatedOrUpdated = (
    id: BigNumber,
    externalId: BigNumber,
    owner: string,
    rarity: CardRarityEnum,
    foil: boolean,
    quantity: BigNumber,
    level: BigNumber,
    created: boolean,
    createdAt: BigNumber,
    updatedAt: BigNumber
  ) => {
    if (user) {
      if (owner.toLowerCase() == user.id.toLowerCase()) {
        const card = new Card();
        card.id = id.toNumber().toString();
        card.externalId = externalId.toNumber();
        card.ownerId = owner;
        card.rarity = rarity;
        card.foil = foil;
        card.quantity = quantity.toNumber();
        card.level = level.toNumber();
        card.createdAt = createdAt.toNumber();
        card.updatedAt = updatedAt.toNumber();
        const cardToPush = mergeWithResponseCard(card);
        _cards.push(cardToPush);
        if (_cards.length == 3) {
          setState({ cards: _cards, waitingCards: false });
          _cards = [];
        }
      }
    }
  };

  const cardFlipped = () => {
    setState({ revealedCards: state.revealedCards + 1 });
  };

  const openBoosterPack = async () => {
    try {
      if (typeof application.devTheGatheringService.getContract === 'function') {
        const contract = application.devTheGatheringService.getContract();
        if (contract) {
          const boosterPrice = await contract.boosterPrice();
          const response = await contract.openBoosterPack({ value: boosterPrice });
          setState({ loading: false, waitingCards: true });
        }
      }
    } catch (error: any) {
      console.log(JSON.parse(JSON.stringify(error)));

      if (error && error.reason) {
        setState({ hasError: true, loading: false, errorMessage: `The following error occurred opening the booster pack: ${error.reason}` });
      } else if (error && error.data && error.data.message) {
        const message = error.data.message.indexOf('insufficient funds for gas') > -1 ? 'Not enough balance.' : error.data.message;
        setState({ hasError: true, loading: false, errorMessage: `The following error occurred opening the booster pack: ${message}` });
      } else {
        setState({ hasError: true, loading: false, errorMessage: 'Generic error' });
      }
    }
  };

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
              <Scrollbars style={{ maxHeight: 'calc(100vh - 210px)', minHeight: '570px', display: 'flex' }} className="scrollbar-content" autoHide={true}>
                {state.hasError ? (
                  <>
                    <h2>Something went wrong :(</h2>
                    <ErrorList textAlign='center' errors={[state.errorMessage]} />
                    <Spacer />
                    <div className="cards-modal-footer mt-4">
                      <Button
                        onClick={() => {
                          setState({ animate: false });
                        }}
                      >
                        Close
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    {state.waitingCards ? (
                      <>
                        <h2>Waiting until your requisition is completed.</h2>
                        <LoadingContainer />
                      </>
                    ) : (
                      <>
                        <h2>Click to reveal your cards!</h2>
                        <div className="cards-container row">
                          {!!state.cards.length &&
                            state.cards.map((cardData, i) => <CardComponent key={`card-${cardData.id}-${i}`} canBeFlipped={true} data={cardData} onFlipped={cardFlipped} />)}
                        </div>
                      </>
                    )}
                    <div className="cards-modal-footer mt-4">
                      <Button
                        disabled={(state.revealedCards > 0 && state.revealedCards != state.cards.length) || state.waitingCards}
                        onClick={() => {
                          setState({ animate: false });
                        }}
                      >
                        Done!
                      </Button>
                    </div>
                  </>
                )}
              </Scrollbars>
            )}
          </div>
        </StyledRevealCardsModal>
      )}
    </Transition>
  );
};

export default DecentralizedRevealCardsModal;
