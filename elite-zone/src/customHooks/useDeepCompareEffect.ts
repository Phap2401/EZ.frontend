import { useEffect, useRef, DependencyList } from 'react';
import _isEqual from 'lodash/isEqual';

type EffectCallback = () => void;

// Deep compare useEffect dependencies

const useDeepCompareEffect = (callback: EffectCallback, dependencies: DependencyList) => {
  const previousDependencies = useRef<DependencyList | null>(null);

  useEffect(() => {
    if (
      previousDependencies.current === null ||
      !_isEqual(previousDependencies.current, dependencies)
    ) {
      callback();
    }
    previousDependencies.current = dependencies;
  }, [callback, dependencies]);
};

export default useDeepCompareEffect;
