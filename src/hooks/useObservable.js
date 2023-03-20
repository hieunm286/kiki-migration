import { useEffect, useState } from 'react';

export default function useObservable(o$) {
  const [value, setValue] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const subscription = o$.subscribe({
      next: (v) => setValue(v),
      error: (e) => {
        setError(e);
      },
    });
    return () => subscription.unsubscribe();
  }, []);

  return [value, error];
}
