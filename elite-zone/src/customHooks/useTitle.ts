import { useEffect } from 'react';

const useTitle = (title = 'Elite Zone') => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    return () => {
      document.title = prevTitle;
    };
  }, []);
};
export default useTitle;
