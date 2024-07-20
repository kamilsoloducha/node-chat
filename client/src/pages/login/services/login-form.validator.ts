import { validatePassword } from 'core/services/password.validator';
import { validateUserName } from 'core/services/user-name.validator';
import { FormikErrors } from 'formik';
import { LoginForm } from 'pages/login/models/login-form.model';

export function validateLoginForm(form: LoginForm): FormikErrors<LoginForm> {
  const errors = {} as FormikErrors<LoginForm>;

  const userNameError = validateUserName(form);
  if (userNameError) {
    errors.userName = userNameError;
  }

  const passwordError = validatePassword(form);
  if (passwordError) {
    errors.password = passwordError;
  }

  return errors;
}
