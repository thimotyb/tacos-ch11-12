import { errors$ } from '../store';
import { useObservable } from '../hooks';

export const ErrorBanner = () => {
  const error = useObservable(errors$, null);

  if (!error) {
    return null;
  }

  return <div className="error">{error}</div>;
};
