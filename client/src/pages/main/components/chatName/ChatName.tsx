import { useAppDispatch } from 'store/store';
import './ChatName.scss';
import { ReactElement, useRef, useState } from 'react';
import { updateChatName } from 'store/chat/reducer';

type ChatNameProps = {
  chatId: string;
  name: string;
};

export function ChatName({ name, chatId }: ChatNameProps): ReactElement {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(name);

  const saveChatName = (newName: any) => {
    setIsEditing(false);
    dispatch(updateChatName({ chatId, chatName: newName }));
  };

  return (
    <div className="chat-name-container flex items-center">
      <img
        className="m-2"
        src="./avatar.svg"
        width="32px"
        height="32px"
      />
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveChatName(label);
          }}
        >
          <input
            autoFocus={true}
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onBlur={() => setIsEditing(false)}
          />
        </form>
      ) : (
        <>
          <b>{label}</b>
          <button onClick={() => setIsEditing(true)}>
            <img
              className="m-2"
              src="./edit.svg"
              width="24px"
              height="24px"
            />
          </button>
        </>
      )}
    </div>
  );
}
