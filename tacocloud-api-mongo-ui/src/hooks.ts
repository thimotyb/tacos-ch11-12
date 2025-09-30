import { useEffect, useState } from 'react';
import { Observable, Subject } from 'rxjs';

export const useObservable = <T>(observable: Observable<T>, initial: T): T => {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    const subscription = observable.subscribe(setValue);
    return () => subscription.unsubscribe();
  }, [observable]);

  return value;
};

export const useSubject = <T>(subject: Subject<T>, initial: T): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    const subscription = subject.subscribe(setValue);
    return () => subscription.unsubscribe();
  }, [subject]);

  const next = (nextValue: T) => subject.next(nextValue);

  return [value, next];
};
