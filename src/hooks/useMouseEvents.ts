import { useEffect, RefObject } from 'react';

type UseMouseEventsProps = {
  onMove: (e: MouseEvent) => void;
  onLeave: (e: MouseEvent) => void;
  target: RefObject<HTMLElement>;
};

export const useMouseEvents = ({ onMove, onLeave, target }: UseMouseEventsProps) => {
  useEffect(() => {
    const currentRef = target.current;
    if (currentRef) {
      currentRef.addEventListener('mousemove', onMove);
      currentRef.addEventListener('mouseleave', onLeave);

      return () => {
        currentRef.removeEventListener('mousemove', onMove);
        currentRef.removeEventListener('mouseleave', onLeave);
      };
    }
  }, []);
};
