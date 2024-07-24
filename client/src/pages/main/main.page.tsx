import { useEffectOnce } from 'core/hooks/useEffectOnce';
import { ReactElement } from 'react';
import { loadHistory } from 'store/chat/reducer';
import { useAppDispatch } from 'store/store';

export function MainPage(): ReactElement {
  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    dispatch(loadHistory());
  });

  return <>Main page</>;
}
