import { AxiosError } from 'axios';
import { FormHeader } from 'core/components/FormHeader';
import { SignUpButton } from 'core/components/SignUpButton';
import { TextForm } from 'core/components/TextForm';
import { UserSession, useUserStorage } from 'core/hooks/useUserStorage';
import { login, LoginRequest } from 'core/http/user-http-client.service';
import { useFormik } from 'formik';
import { loginFormInitialValues, LoginForm as LoginFormModel } from 'pages/login/models/login-form.model';
import { validateLoginForm } from 'pages/login/services/login-form.validator';
import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function LoginForm(): ReactElement {
  const [requestError, setRequestError] = useState<string | undefined>('');
  const navigate = useNavigate();
  const { set } = useUserStorage();

  const onLoginFormSubmit = async (form: LoginFormModel) => {
    const loginRequest: LoginRequest = { ...form };
    const loginResponse = await login(loginRequest);

    if (loginResponse.isSuccessful) {
      const session: UserSession = {
        id: loginResponse.userId?.toString(),
        token: loginResponse.accessToken,
        name: '',
        expirationDate: new Date(),
      };
      set(session);
      navigate('/chat');
    } else {
      setRequestError(loginResponse.errorMessage);
    }
  };

  const formik = useFormik({ initialValues: loginFormInitialValues, onSubmit: onLoginFormSubmit, validate: validateLoginForm, validateOnBlur: true });

  return (
    <>
      <div className="w-full h-fit bg-white rounded-3xl shadow-lg px-20 pb-20">
        <FormHeader header="Log In" />
        <p className="w-full text-center text-gray-500">Welcome! Login with your account:</p>
        <form
          className="px-3"
          onSubmit={formik.handleSubmit}
        >
          <TextForm<LoginFormModel>
            formik={formik}
            label="Name"
            propertyName="userName"
            placeholder="Enter your name"
            type="text"
          />
          <TextForm<LoginFormModel>
            formik={formik}
            label="Password"
            propertyName="password"
            placeholder="Enter your password"
            type="password"
          />
          <input
            className={`w-full rounded-md flex align-middle items-center p-2 bg-blue-600 text-white hover:bg-blue-500 cursor-pointer my-5 disabled:bg-gray-600 disabled:cursor-default`}
            type="submit"
            value="Submit form"
            disabled={formik.isSubmitting || (!formik.isValid && Object.entries(formik.touched).every((x) => x))}
          />
          {requestError && <div className="text-red-600">{requestError}</div>}
        </form>

        <p className="w-full text-center text-gray-500">or:</p>

        <div className="px-3 flex gap-1 flex-col my-2">
          <SignUpButton
            icon="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
            alt="Google"
            label="Log in with Google"
            onClick={() => {}}
          />
          <SignUpButton
            icon="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook_colored_svg_copy-256.png"
            alt="Facebook"
            label="Log in with Facebook"
            onClick={() => {}}
          />
        </div>
        <p className="w-full text-center text-gray-500 my-4">
          Not have an account yet?{' '}
          <a
            className="text-blue-500"
            href="/register"
          >
            Sign up
          </a>
          .
        </p>
      </div>
    </>
  );
}
