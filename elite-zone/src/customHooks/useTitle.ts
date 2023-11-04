import { useEffect } from 'react';

const useTitle = (title = 'Golden Gate Restaurants') => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    return () => {
      document.title = prevTitle;
    };
  }, []);
};
export default useTitle;
