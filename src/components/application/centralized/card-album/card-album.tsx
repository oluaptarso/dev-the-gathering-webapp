import { useCallback, useState } from 'react';
import { Button } from 'src/components/shared/button';
import { Card } from 'src/entities/card';
import { CardComponent } from 'src/components/application/shared/card/card';
import StyledCardAlbum from '../../shared/card-album/card-album.styled';
import { useQuery } from '@apollo/client';
import { GET_CARDS } from 'src/graphql/queries/card';
import { mergeWithResponseCard } from 'src/providers/dev-the-gathering-cards';
import CentralizedRevealCardsModal from '../reveal-cards-modal/reveal-cards-modal.component';
import LoadingContainer from 'src/components/shared/loading-container';
import { useUser } from 'src/hooks/useUser';
import CardAlbumEmailNotVerified from './card-album-email-not-verified';
import InformationParagraph from 'src/components/shared/information-paragraph';

const CentralizedCardAlbum = () => {
  const cards: Card[] = [];

  const [openRevealModal, setOpenRevealModal] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_CARDS);

  if (data) {
    data.cards.forEach((card: Card) => cards.push(mergeWithResponseCard(card)));
    cards.sort((a: Card, b: Card) => a.number - b.number);
  }

  const { loading: userLoading, canOpenBoosterPack, lastBoosterPackOpenedAt, emailVerified, refetchUserData } = useUser();

  const onOpenBoosterPack = useCallback(() => {
    setOpenRevealModal(false);
    refetch();
    refetchUserData();
  }, [refetchUserData, refetch]);

  return (
    <StyledCardAlbum>
      <CentralizedRevealCardsModal onClose={onOpenBoosterPack} show={openRevealModal} />
      <div
        className={`container mb-4 d-flex flex-column flex-sm-row ${
          !canOpenBoosterPack && lastBoosterPackOpenedAt ? 'justify-content-end align-items-end justify-content-sm-between' : 'align-items-end justify-content-end'
        } p-0`}
      >
        {!canOpenBoosterPack && lastBoosterPackOpenedAt && (
          <div className="booster-pack-already-opened-alert" role="alert">
            You have already opened your booster pack today. Please, come back tomorrow.
          </div>
        )}
        <Button
          className="open-booster-button"
          disabled={!canOpenBoosterPack || !emailVerified || loading || userLoading}
          onClick={() => {
            setOpenRevealModal(true);
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

        {userLoading || loading ? (
          <LoadingContainer />
        ) : !emailVerified ? (
          <CardAlbumEmailNotVerified />
        ) : (
          <div className="row">
            {cards.length ? (
              cards.map((cardData, i) => <CardComponent key={`card-${i}`} data={cardData} />)
            ) : (
              <InformationParagraph className="mt-5">You dont have any card yet.</InformationParagraph>
            )}
          </div>
        )}
      </div>
    </StyledCardAlbum>
  );
};

export default CentralizedCardAlbum;
