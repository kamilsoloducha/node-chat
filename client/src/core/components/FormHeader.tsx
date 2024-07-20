import { ReactElement } from 'react';

export function FormHeader({ header }: { header: string }): ReactElement {
  return <div className="w-full text-3xl font-bold text-indigo-950 text-center py-10">{header}</div>;
}
