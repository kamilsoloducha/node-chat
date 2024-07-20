import { ReactElement } from 'react';

export function SignUpButton({ icon, alt, label, onClick }: SignUpButtonProps): ReactElement {
  return (
    <button
      className="w-full rounded-md flex align-middle items-center flex-row justify-center border-2 border-gray-200 border-solid p-1 hover:bg-gray-200"
      onClick={onClick}
    >
      <img
        src={icon}
        alt={alt}
        className="w-5 h-5 m-2"
      ></img>
      {label}
    </button>
  );
}

export type SignUpButtonProps = {
  icon: string;
  alt: string | undefined;
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
};
