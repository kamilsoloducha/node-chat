import { AxiosError } from 'axios';
import { FormHeader } from 'core/components/FormHeader';
import { SignUpButton } from 'core/components/SignUpButton';
import { TextForm } from 'core/components/TextForm';
import { UserSession, useUserStorage } from 'core/hooks/useUserStorage';
import { login, LoginRequest, register, RegisterRequest } from 'core/http/user-http-client.service';
import { useFormik } from 'formik';
import { registerFormInitialValues, RegisterForm as RegisterFormModel } from 'pages/register/models/register-form.model';
import { validateRegisterForm } from 'pages/register/services/registration-form.validator';
import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function RegisterForm(): ReactElement {
  const [requestError, setRequestError] = useState<string | undefined>('');
  const navigate = useNavigate();
  const { set } = useUserStorage();

  const onRegisterFormSubmit = async (form: RegisterFormModel) => {
    const registerRequest: RegisterRequest = { ...form };
    try {
      await register(registerRequest);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          setRequestError(error.response?.data?.message);
        } else {
          setRequestError(error.message);
        }
        return;
      }
    }

    const loginRequest: LoginRequest = { ...form };
    try {
      const loginResponse = await login(loginRequest);
      const session: UserSession = {
        id: loginResponse.data.userId + '',
        token: loginResponse.data.accessToken,
        name: '',
        expirationDate: new Date(),
      };
      set(session);
      navigate('/chat');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setRequestError(error.message);
        return;
      }
    }
  };

  const formik = useFormik({ initialValues: registerFormInitialValues, onSubmit: onRegisterFormSubmit, validate: validateRegisterForm, validateOnBlur: true });

  return (
    <>
      <div className="w-full h-fit bg-white rounded-3xl shadow-lg px-20 pb-20">
        <FormHeader header="Sign In" />
        <p className="w-full text-center text-gray-500">Welcome! Create a new account with:</p>
        <form
          className="px-3"
          onSubmit={formik.handleSubmit}
        >
          <TextForm<RegisterFormModel>
            formik={formik}
            label="Name"
            propertyName="userName"
            placeholder="Enter your name"
            type="text"
          />
          <TextForm<RegisterFormModel>
            formik={formik}
            label="Password"
            propertyName="password"
            placeholder="Enter your password"
            type="password"
          />
          <TextForm<RegisterFormModel>
            formik={formik}
            label="Retype Password"
            propertyName="passwordConfirmation"
            placeholder="Enter your password again"
            type="password"
          />
          <input
            className={`w-full rounded-md flex align-middle items-center p-2 bg-blue-600 text-white hover:bg-blue-500 cursor-pointer my-5 disabled:bg-gray-600 disabled:cursor-default`}
            type="submit"
            value="Submit form"
            disabled={formik.isSubmitting || (!formik.isValid && Object.entries(formik.touched).every((x) => x))}
          />
          {requestError && <div>{requestError}</div>}
        </form>

        <p className="w-full text-center text-gray-500">or:</p>

        <div className="px-3 flex gap-1 flex-col my-2">
          <SignUpButton
            icon="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
            alt="Google"
            label="Sign up with Google"
            onClick={() => {}}
          />
          <SignUpButton
            icon="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook_colored_svg_copy-256.png"
            alt="Facebook"
            label="Sign up with Facebook"
            onClick={() => {}}
          />
        </div>
        <p className="w-full text-center text-gray-500 my-4">
          Already have an account?{' '}
          <a
            className="text-blue-500"
            href="/login"
          >
            Log In
          </a>
        </p>
      </div>
    </>
  );
}
