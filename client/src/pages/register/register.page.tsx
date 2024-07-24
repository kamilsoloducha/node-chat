import { RegisterForm } from 'pages/register/components/registationForm';
import { ReactElement } from 'react';

export function RegisterPage(): ReactElement {
  document.title = 'Chatteria - Sign In';

  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-full h-full flex justify-center items-center lg:w-2/3 lg:max-w-3xl">
        <RegisterForm />
      </div>
    </div>
  );
}
