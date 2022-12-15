import { Reducer, useCallback, useContext, useEffect, useReducer } from 'react';
import { Button } from 'src/components/shared/button';
import { ApplicationContext } from 'src/contexts/application';
import { Card } from 'src/entities/card';
import { CardComponent } from 'src/components/application/shared/card/card';
import StyledCardAlbum from '../../shared/card-album/card-album.styled';
import { AuthContext } from 'src/contexts/auth';
import { isAnICentralizedAuthenticatedUser } from 'src/interfaces/user';
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_USER } from 'src/graphql/queries/user';
import Link from 'next/link';
import { GET_CARDS } from 'src/graphql/queries/card';
import { mergeWithResponseCard } from 'src/providers/dev-the-gathering-cards';
import CentralizedRevealCardsModal from '../reveal-cards-modal/reveal-cards-modal.component';
import LoadingContainer from 'src/components/shared/loading-container';
import Router from 'next/router';

interface CardAlbumState {
  canOpenBoosterPack: boolean;
  lastBoosterPackOpenedAt: number | null;
  emailVerified: boolean;
  openRevealModal: boolean;
  loading: boolean;
}

const CentralizedCardAlbum = () => {
  const user = useContext(AuthContext);
  const client = useApolloClient();
  const cards: Card[] = [];

  const [state, setState] = useReducer<Reducer<CardAlbumState, Partial<CardAlbumState>>>((state, newState) => ({ ...state, ...newState }), {
    canOpenBoosterPack: true,
    lastBoosterPackOpenedAt: null,
    emailVerified: true,
    openRevealModal: false,
    loading: true,
  });

  const { loading, error, data, refetch } = useQuery(GET_CARDS);

  if (data) {
    data.cards.forEach((card: Card) => cards.push(mergeWithResponseCard(card)));
    cards.sort((a: Card, b: Card) => a.number - b.number);
  }

  useEffect(() => {
    if (isAnICentralizedAuthenticatedUser(user)) {
      if (user.emailVerified) {
        fetchUserData();
      } else {
        setState({ canOpenBoosterPack: false, emailVerified: false, loading: false });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserData = useCallback(async () => {
    const response = await client.query({ query: GET_USER, fetchPolicy: 'no-cache' });
    if (response.data) {
      if (!response.data.user.canOpenBoosterPack) {
        setState({
          canOpenBoosterPack: false,
          lastBoosterPackOpenedAt: response.data.user.lastBoosterPackOpenedAt,
          emailVerified: isAnICentralizedAuthenticatedUser(user) ? user.emailVerified : true,
        });
      }
      setState({ loading: false });
    }
  }, [client, user]);

  const onOpenBoosterPack = useCallback(() => {
    setState({ openRevealModal: false, loading: true });
    refetch();
    fetchUserData();
  }, [fetchUserData, refetch]);
  return (
    <StyledCardAlbum>
      <CentralizedRevealCardsModal
        onClose={onOpenBoosterPack}
        show={state.openRevealModal}
      />

      <div
        className={`container mb-4 d-flex flex-column flex-sm-row ${
          !!state.lastBoosterPackOpenedAt ? 'justify-content-end align-items-end justify-content-sm-between' : 'align-items-end justify-content-end'
        } p-0`}
      >
        {!state.canOpenBoosterPack && state.lastBoosterPackOpenedAt && (
          <div className="booster-pack-already-opened-alert" role="alert">
            You have already opened your booster pack today. Please, come back tomorrow.
          </div>
        )}
        <Button
          className="open-booster-button"
          disabled={!state.canOpenBoosterPack || !state.emailVerified || loading || state.loading}
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
              {cards.length ? (
                cards.map((cardData, i) => <CardComponent key={`card-${cardData.id}-${i}`} data={cardData} />)
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
                <a
                  onClick={() => {
                    Router.reload();
                  }}
                >
                  click here.
                </a>
              </Link>
            </h5>
          </>
        )}
      </div>
    </StyledCardAlbum>
  );
};

export default CentralizedCardAlbum;
