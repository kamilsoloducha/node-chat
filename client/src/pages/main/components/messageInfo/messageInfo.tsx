import { ReactElement } from 'react';

export function MessageInfo({ alignment, senderId, timeStamp }: MessageInfoProps): ReactElement {
  return (
    <div>
      {alignment === 'left' ? <>{senderId}</> : <></>} {new Date(timeStamp).toLocaleTimeString()}
    </div>
  );
}

type MessageInfoProps = {
  alignment: Alignment;
  senderId: string;
  timeStamp: Date;
};
