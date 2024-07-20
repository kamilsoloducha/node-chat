import { LoginForm } from 'pages/login/components/LoginForm';
import { ReactElement } from 'react';

export function LoginPage(): ReactElement {
  document.title = 'Chatteria - Log In';

  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-1/3">
        <LoginForm />
      </div>
    </div>
  );
}
