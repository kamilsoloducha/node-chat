import { ChatMessage } from 'core/models/chat-history-item';
import { Message } from 'pages/main/components/message/message';
import { MessageInfo } from 'pages/main/components/messageInfo/messageInfo';
import { Fragment, ReactElement } from 'react';

export function MessagesSet({ senderId, messages, alignment }: MessagesSetProps): ReactElement {
  const isLeft = alignment === 'left';
  return (
    <div className={`relative flex w-full flex-col flex-wrap ${isLeft ? 'content-start justify-start' : 'content-end items-end'} pb-1`}>
      {isLeft ? (
        <>
          <img
            className="absolute left-[-40px] mr-2"
            src="./avatar.svg"
            width="32px"
            height="32px"
          />
        </>
      ) : (
        <></>
      )}
      <MessageInfo
        alignment={alignment}
        senderId={senderId}
        timeStamp={new Date(messages[0].timeStamp)}
      />
      {messages.map((item, index, array) => {
        let position: Position = 'middle';
        position = index === 0 ? 'first' : position;
        position = index === array.length - 1 ? 'last' : position;
        return (
          <Fragment key={index}>
            <div className="mb-px">
              <Message
                text={item.text}
                alignment={alignment}
                isFirst={index === 0}
                isLast={index === array.length - 1}
              />
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

type MessagesSetProps = {
  senderId: string;
  messages: ChatMessage[];
  alignment: Alignment;
};
