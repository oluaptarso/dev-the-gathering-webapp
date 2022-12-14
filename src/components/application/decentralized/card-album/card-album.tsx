import { Reducer, useContext, useEffect, useReducer } from 'react';
import { Button } from 'src/components/shared/button';
import { ApplicationContext } from 'src/contexts/application';
import { Card } from 'src/entities/card';
import { CardComponent } from 'src/components/application/shared/card/card';
import StyledCardAlbum from '../../shared/card-album/card-album.styled';
import { AuthContext } from 'src/contexts/auth';
import { useQuery } from '@apollo/client';
import { GET_CARDS_BY_OWNER } from 'src/graphql/queries/card';
import { mergeWithResponseCard } from 'src/providers/dev-the-gathering-cards';
import LoadingContainer from 'src/components/shared/loading-container';
import DecentralizedRevealCardsModal from '../reveal-cards-modal/reveal-cards-modal.component';

interface CardAlbumState {  
  cards: Card[];
  openRevealModal: boolean;
  loading: boolean;
}

const DecentralizedCardAlbum = () => {
  const user = useContext(AuthContext);
  const application = useContext(ApplicationContext);

  const [state, setState] = useReducer<Reducer<CardAlbumState, Partial<CardAlbumState>>>((state, newState) => ({ ...state, ...newState }), {
    cards: [],
    openRevealModal: false,
    loading: true,
  });

  const fetchUserData = async () => {
    
  };

  const { loading, error, data, refetch } = useQuery(GET_CARDS_BY_OWNER, {
    variables: { owner : user?.id },
  });

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

  // if (!isAnIAuthenticationService(application.authenticationService))
  return (
    <StyledCardAlbum>
      <DecentralizedRevealCardsModal
        onClose={() => {
          setState({ openRevealModal: false, loading: false });          
          refetch();
        }}
        show={state.openRevealModal}
      />

      <div className='container mb-4 d-flex justify-content-end p-0'>        
        <Button
          disabled={state.loading}
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

        {state.loading || loading ? (
            <LoadingContainer />
          ) : (
            <div className="row">
              {state.cards.length ? (
                state.cards.map((cardData, i) => <CardComponent key={`card-${cardData.id}-${i}`} data={cardData} />)
              ) : (
                <h5 className="mt-5">You dont have any card yet.</h5>
              )}
            </div>
          )}
      </div>
    </StyledCardAlbum>
  );
};

export default DecentralizedCardAlbum;
