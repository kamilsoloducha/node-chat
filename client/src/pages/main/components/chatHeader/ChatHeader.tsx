import { DropDown } from 'core/components/DropDown';
import { useUserStorage } from 'core/hooks/useUserStorage';
import { ChatName } from 'pages/main/components/chatName/ChatName';
import { ReactElement } from 'react';
import { addToFavourite } from 'store/chat/reducer';
import { useAppDispatch } from 'store/store';

type ChatHeaderProps = {
  id: string;
  name: string;
};

export function ChatHeader({ id, name }: ChatHeaderProps): ReactElement {
  const userId = useUserStorage().get()?.id!;
  const dispach = useAppDispatch();

  const dropDownActions: DropDownModel[] = [
    {
      label: 'Invite',
      action: () => console.log('Invite'),
    },
    {
      label: 'Add to favorite',
      action: () => {
        dispach(addToFavourite({ chatId: id, userId }));
      },
    },
  ];

  return (
    <div className="w-full flex flex-row justify-between p-3 bg-blue-500 text-lg">
      <ChatName
        name={name}
        chatId={id}
      />
      <DropDown<DropDownModel>
        triggerTemplate={
          <img
            className="m-2  cursor-pointer rounded-full"
            src="./three-dots.svg"
            width="32px"
            height="32px"
          />
        }
        itemTemplateFactory={(item) => (
          <div
            onClick={() => item.action()}
            className="bg-slate-400 hover:bg-slate-300 cursor-pointer"
          >
            {item.label}
          </div>
        )}
        items={dropDownActions}
      />
    </div>
  );
}

type DropDownModel = {
  label: string;
  action: () => void;
};
