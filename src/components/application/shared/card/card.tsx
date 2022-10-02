import { useEffect, useRef, useState } from 'react';
import { Card as CardEntity } from 'src/entities/card';
import StyledCard from './card.styled';

export const CardComponent = ({ data, canBeFlipped = false, onFlipped }: { data: CardEntity; canBeFlipped?: boolean; onFlipped?: () => void }) => {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const flipCard = () => {
    if (canBeFlipped && !flipped) {
      setFlipped(true);
      if (onFlipped) {
        onFlipped();
      }
    }
  };

  useEffect(() => {
    const currentRef = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const normalizedX = e.offsetX / 240;
      const normalizedY = e.offsetY / 400;

      if (currentRef) {
        currentRef.style.transform = `translate3d(${Math.cos(Math.PI * normalizedX) * 5}px, ${Math.cos(Math.PI * normalizedY) * 5}px, 0)`;
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (currentRef) {
        currentRef.style.transform = `none`;
      }
    };

    currentRef?.addEventListener('mousemove', handleMouseMove);
    currentRef?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      currentRef?.removeEventListener('mousemove', handleMouseMove);
      currentRef?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cardRef]);

  return (
    <StyledCard flipped={flipped} canBeFlipped={canBeFlipped} rarity={data.rarity} className="col-12 col-md-6 col-lg-4">
      <div ref={cardRef} className="card-container" onClick={flipCard}>
        <div className="card-3d-container">
          <div className="card-front">
            {data.number} - {data.name}
          </div>
          <div className="card-back"></div>
        </div>
      </div>
    </StyledCard>
  );
};
