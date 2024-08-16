import './main.scss';
import { useEffectOnce } from 'core/hooks/useEffectOnce';
import { Chat } from 'pages/main/components/chat';
import { History } from 'pages/main/components/history';
import { ReactElement, useState } from 'react';
import { loadHistory } from 'store/chat/reducer';
import { useAppDispatch } from 'store/store';

export function MainPage(): ReactElement {
  const dispatch = useAppDispatch();
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);

  useEffectOnce(() => {
    dispatch(loadHistory());
  });

  return (
    <div className="relative flex w-full overflow-hidden">
      <div
        className={`bg-blue-400  ${!isHistoryOpen ? 'w-full' : 'w-3/4'}`}
        style={{ transition: 'width 0.5s ease' }}
      >
        <Chat />
      </div>

      <div
        className={` relative flex bg-red-600  ${!isHistoryOpen ? 'w-0' : 'w-1/4 history-container'}`}
        style={{ transition: 'width 0.5s ease' }}
      >
        <button
          className="absolute w-7 z-20 bg-transparent left-[-28px] top-0"
          onClick={() => setIsHistoryOpen((x) => !x)}
        >
          <img
            className="p-1 cursor-pointer bg-red-500/50 "
            src={isHistoryOpen ? './right.svg' : './left.svg'}
            width="32px"
            height="32px"
          />
        </button>
        <div className="relative w-full flex flex-row">
          <div className="flex-grow">
            <History />
          </div>
        </div>
      </div>
    </div>
  );
}
