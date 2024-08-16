import { useUserStorage } from 'core/hooks/useUserStorage';
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

export function LogoutPage(): ReactElement {
  const { remove } = useUserStorage();

  remove();

  return <Navigate to={'/login'} />;
}
