import { ReactElement } from 'react';

export function Message({ text, alignment, isFirst, isLast }: MessageProps): ReactElement {
  return (
    <div
      className={`p-2 text-m w-max bg-slate-500 
                  ${alignment === 'left' ? 'rounded-r-lg' : 'rounded-l-lg'}
                  ${isFirst ? 'rounded-t-lg' : ''}
                  ${isLast ? 'rounded-b-lg' : ''}
                  `}
    >
      <span className="whitespace-pre-line">{text}</span>
    </div>
  );
}

type MessageProps = {
  text: string;
  alignment: Alignment;
  isFirst: boolean;
  isLast: boolean;
};
