export type RegisterForm = {
  userName: string;
  password: string;
  passwordConfirmation: string;
};

export const registerFormInitialValues: RegisterForm = {
  userName: '',
  password: '',
  passwordConfirmation: '',
};
