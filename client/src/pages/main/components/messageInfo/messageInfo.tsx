import { ReactElement } from 'react';

export function MessageInfo({ alignment, senderId, timeStamp }: MessageInfoProps): ReactElement {
  return (
    <div className="text-xs">
      {alignment === 'left' ? <>User Name</> : <></>} {toFriendlyDateTime(timeStamp)}
    </div>
  );
}

type MessageInfoProps = {
  alignment: Alignment;
  senderId: string;
  timeStamp: Date;
};

function toFriendlyDateTime(date: number | Date): string {
  date = new Date(date);
  let timeFormatOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
  if (date.isToday()) {
    return date.toLocaleTimeString(navigator.language, timeFormatOptions);
  } else if (date.isYesterday()) {
    return 'Yesterday ' + date.toLocaleTimeString(navigator.language, timeFormatOptions);
  } else if (date.isSameWeek()) {
    return date.toLocaleDateString(navigator.language, { ...timeFormatOptions, weekday: 'long' });
  }
  return date.toLocaleDateString(navigator.language, { ...timeFormatOptions, day: '2-digit', month: '2-digit' });
}
