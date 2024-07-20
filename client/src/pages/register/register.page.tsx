import { RegisterForm } from 'pages/register/components/registationForm';
import { ReactElement } from 'react';

export function RegisterPage(): ReactElement {
  document.title = 'Chatteria - Sign In';

  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-1/3">
        <RegisterForm />
      </div>
    </div>
  );
}
