import { useRef, useEffect } from 'react';

export const useAvoidFirstRender = () => {
  const firstRender = useRef(false);

  useEffect(() => {
    firstRender.current = true;
  }, []);

  return firstRender.current;
};
