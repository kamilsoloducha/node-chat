import { ReactElement } from 'react';

export function ChatSearch(): ReactElement {
  return (
    <form className="relative w-full p-2">
      <input
        type="search"
        className="w-full rounded-sm"
      />
      <button className="absolute right-2">
        <img
          src="./send.svg"
          alt="Icon description"
          width="24px"
          height="24px"
        ></img>
      </button>
    </form>
  );
}
