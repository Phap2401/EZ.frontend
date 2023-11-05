import { Suspense } from 'react';
import LinearLoader from './LinearLoader';

const LazyLoadComponent = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<LinearLoader />}>
      <Component {...props} />
    </Suspense>
  );

export default LazyLoadComponent;
