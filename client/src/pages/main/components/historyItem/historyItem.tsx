import { ReactElement } from 'react';

export function HistoryItem({ chatId, chatName, isSelected, onSelected }: HistoryItemProps): ReactElement {
  return (
    <div
      className={`flex h-fit  border-4 border-solid border-blue-500 rounded-lg m-2 bg-blue-200 justify-start items-center cursor-pointer hover:bg-blue-300 ${isSelected ? 'bg-blue-500' : ''}`}
      onClick={() => onSelected(chatId)}
    >
      <img
        className="m-2"
        src="./avatar.svg"
        width="32px"
        height="32px"
      />
      {chatName}
    </div>
  );
}

type HistoryItemProps = {
  chatId: string;
  chatName: string;
  isSelected: boolean;

  onSelected: (chatId: string) => void;
};
