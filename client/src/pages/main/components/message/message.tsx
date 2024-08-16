import { ReactElement } from 'react';

export function Message({ text, alignment, position = 'middle' }: MessageProps): ReactElement {
  return (
    <div className={`p-2 text-m w-max bg-slate-500 ${alignment === 'left' ? 'rounded-r-lg' : 'rounded-l-lg'} ${position === 'first' ? 'rounded-t-lg' : ''}`}>
      <span className="whitespace-pre-line">{text}</span>
    </div>
  );
}

type MessageProps = {
  text: string;
  position?: Position;
  alignment: Alignment;
};
