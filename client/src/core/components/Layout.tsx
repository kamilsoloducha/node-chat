import { LayoutActions } from 'core/components/LayoutActions';
import { LayoutHeader } from 'core/components/LayoutHeader';
import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

export function Layout(): ReactElement {
  return (
    <div className="flex flex-col content-between w-screen h-screen max-h-screen">
      <div
        style={{ height: '5%' }}
        className="flex justify-between w-full"
      >
        <LayoutHeader />
        <LayoutActions />
      </div>
      <div
        style={{ height: '95%' }}
        className="relative flex"
      >
        <Outlet />
      </div>
    </div>
  );
}
