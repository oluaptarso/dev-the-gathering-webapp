import { Reducer, useContext, useEffect, useReducer, useState } from 'react';
import { Button } from 'src/components/shared/buttons';
import { ApplicationContext } from 'src/contexts/application';
import { Card } from 'src/entities/card';
import { CardComponent } from 'src/components/application/shared/card/card';
import { isAnIAuthenticationService } from 'src/interfaces/authentication.service';
import StyledCardAlbum from './card-album.styled';
import { AuthContext } from 'src/contexts/auth';
import { isAnICentralizedAuthenticatedUser } from 'src/interfaces/user';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { GET_USER } from 'src/graphql/queries/user';
import Link from 'next/link';
import { GET_CARDS } from 'src/graphql/queries/card';
import ReactLoading from 'react-loading';
import DevTheGatheringCards, { mergeWithResponseCard } from 'src/providers/dev-the-gathering-cards';
import { CardRarityEnum } from 'src/enums/card-rarity.enum';
import { OPEN_BOOSTER_PACK } from 'src/graphql/mutations.ts/card';
import RevealCardsModal from '../reveal-cards-modal/reveal-cards-modal.component';
import LoadingContainer from 'src/components/shared/loading-container';
import Router from 'next/router';

interface CardAlbumState {
  canOpenBoosterPack: boolean;
  lastBoosterPackOpenedAt: number | null;
  emailVerified: boolean;
  cards: Card[];
  openRevealModal: boolean;
  loading: boolean;
}

const CardAlbum = () => {
  const user = useContext(AuthContext);
  const application = useContext(ApplicationContext);
  const client = useApolloClient();

  const [state, setState] = useReducer<Reducer<CardAlbumState, Partial<CardAlbumState>>>((state, newState) => ({ ...state, ...newState }), {
    canOpenBoosterPack: true,
    lastBoosterPackOpenedAt: null,
    emailVerified: true,
    cards: [],
    openRevealModal: false,
    loading: true,
  });

  const fetchUserData = async () => {
    const response = await client.query({ query: GET_USER, fetchPolicy: 'no-cache' });
    if (response.data) {
      if (!response.data.user.canOpenBoosterPack) {
        setState({
          canOpenBoosterPack: false,
          lastBoosterPackOpenedAt: response.data.user.lastBoosterPackOpenedAt,
          emailVerified: isAnICentralizedAuthenticatedUser(user) ? user.emailVerified : true,
        });
      }
    }
  };

  const { loading, error, data, refetch } = useQuery(GET_CARDS);

  useEffect(() => {
    if (isAnICentralizedAuthenticatedUser(user)) {
      if (user.emailVerified) {
        fetchUserData();
      } else {
        setState({ canOpenBoosterPack: false, emailVerified: false });
      }
    }
  }, []);

  useEffect(() => {

    if (data) {
      let cards: Card[] = [];
      data.cards.forEach((card: Card) => {
        cards.push(mergeWithResponseCard(card));
      });

      cards = cards.sort((a, b) => {
        return a.number - b.number;
      });

      setState({ cards: cards, loading: false });
    }
  }, [loading, error, data]);

  // only load if has an application.
  if (!application) return <></>;

  const numberOfCards = +(process.env.NEXT_PUBLIC_NUMBER_OF_CARDS || 0);
  const mockCards: Card[] = [];

  for (let i = 0; i < numberOfCards; i++) {
    mockCards.push(new Card());
  }

  // if (!isAnIAuthenticationService(application.authenticationService))
  return (
    <StyledCardAlbum>
      <RevealCardsModal
        onClose={() => {
          setState({ openRevealModal: false, loading: true });          
          refetch();
          fetchUserData();
        }}
        show={state.openRevealModal}
      />

      <div className={`container mb-4 d-flex ${!!state.lastBoosterPackOpenedAt ? 'justify-content-between' : 'justify-content-end'} p-0`}>
        {!state.canOpenBoosterPack && state.lastBoosterPackOpenedAt && (
          <div className="booster-pack-already-opened-alert" role="alert">
            You already have opened your booster pack today, please, come back tomorrow.
          </div>
        )}
        <Button
          disabled={!state.canOpenBoosterPack || !state.emailVerified}
          onClick={() => {
            setState({ openRevealModal: !state.openRevealModal });
          }}
        >
          Open Booster Pack
        </Button>
      </div>
      <div className="container content">
        <div className="row mt-4 mb-4">
          <div className="col-12">
            <h2>My Collection</h2>
          </div>
        </div>

        {state.emailVerified ? (
          state.loading || loading ? (
            <LoadingContainer />
          ) : (
            <div className="row">
              {state.cards.length ? (
                state.cards.map((cardData, i) => <CardComponent key={`card-${cardData.id}-${i}`} data={cardData} />)
              ) : (
                <h5 className="mt-5">You dont have any card yet.</h5>
              )}
            </div>
          )
        ) : (
          <>
            <h5 className="mt-5">
              To start collecting your cards, please verify your email, <br />
              if you are having trouble finding the verification email in your inbox, please check your spam.
            </h5>
            <h5 className="mb-5 mt-4">
              If you verified your email, please refresh the page or{' '}
              <Link href={'#'}>
                <a onClick={()=> {Router.reload()}}>click here.</a>
              </Link>
            </h5>
          </>
        )}
      </div>
    </StyledCardAlbum>
  );
};

export default CardAlbum;
