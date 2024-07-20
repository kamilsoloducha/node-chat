import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

export function Root(): ReactElement {
  return (
    <>
      <div className="w-full h-screen bg-zinc-100 ">
        <Outlet />
      </div>
    </>
  );
}
