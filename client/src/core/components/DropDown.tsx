import React from 'react';
import { ReactElement, useEffect, useRef, useState } from 'react';

export type DropDownProps<TItem> = {
  triggerTemplate: ReactElement;
  itemTemplateFactory: (item: TItem) => ReactElement;
  items: TItem[];
};

export function DropDown<TItem>({ triggerTemplate, itemTemplateFactory, items }: DropDownProps<TItem>): ReactElement {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false),
  });

  return (
    <div
      ref={dropdownRef}
      className="relative w-auto"
    >
      <div onClick={() => setIsOpen((x) => !x)}>{triggerTemplate}</div>
      {isOpen && (
        <div className="absolute w-max z-50">
          {items.map((item, index) => {
            return <React.Fragment key={index}>{itemTemplateFactory(item)}</React.Fragment>;
          })}
        </div>
      )}
    </div>
  );
}

interface OutsideClickHandlerProps {
  ref: React.RefObject<HTMLElement>;
  handler: () => void;
}

const useOutsideClick = ({ ref, handler }: OutsideClickHandlerProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler]);
};

export default useOutsideClick;
