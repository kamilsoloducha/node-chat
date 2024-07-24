import { useEffectOnce } from 'core/hooks/useEffectOnce';
import { useUserStorage } from 'core/hooks/useUserStorage';
import { Chat } from 'pages/main/components/chat';
import { ReactElement } from 'react';
import { loadHistory } from 'store/chat/reducer';
import { useAppDispatch } from 'store/store';

export function MainPage(): ReactElement {
  const dispatch = useAppDispatch();
  const { get } = useUserStorage();
  const session = get();

  useEffectOnce(() => {
    dispatch(loadHistory());
  });

  return (
    <>
      <p>{session?.id}</p>
      <p>{session?.name}</p>
      <Chat />
    </>
  );
}
