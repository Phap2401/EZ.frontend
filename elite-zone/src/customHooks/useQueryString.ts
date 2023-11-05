import { useSearchParams } from 'react-router-dom';

// Get and set query param in current URL

const useQueryString = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsObject = Object.fromEntries([...searchParams]);
  return [searchParamsObject, setSearchParams];
};

export default useQueryString;
