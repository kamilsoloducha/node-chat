import { validatePassword } from 'core/services/password.validator';
import { validateUserName } from 'core/services/user-name.validator';
import { FormikErrors } from 'formik';
import { RegisterForm } from 'pages/register/models/register-form.model';

export function validateRegisterForm(form: RegisterForm): FormikErrors<RegisterForm> {
  const errors = {} as FormikErrors<RegisterForm>;

  const userNameError = validateUserName(form);
  if (userNameError) {
    errors.userName = userNameError;
  }

  const passwordError = validatePassword(form);
  if (passwordError) {
    errors.password = passwordError;
  }

  if (!form.passwordConfirmation) {
    errors.passwordConfirmation = 'Field is required.';
  } else {
    if (form.password !== form.passwordConfirmation) {
      errors.passwordConfirmation = 'Password confirmation does not match.';
    }
  }
  return errors;
}
