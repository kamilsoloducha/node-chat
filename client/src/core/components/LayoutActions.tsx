import { useUserStorage } from 'core/hooks/useUserStorage';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

export function LayoutActions(): ReactElement {
  const { get } = useUserStorage();
  const session = get();
  const navigate = useNavigate();

  if (session) {
    return (
      <div className="flex content-center">
        <button
          className="pr-3"
          onClick={() => navigate('/logout')}
        >
          Logout
        </button>
      </div>
    );
  } else {
    return <div></div>;
  }
}
