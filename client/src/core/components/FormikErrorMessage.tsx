import { FormikErrors, FormikTouched } from 'formik';
import { ReactNode } from 'react';

export function FormikErrorMessage<TFormModel>({ errors, touches, propertyName }: FormikErrorMessageProps<TFormModel>): ReactNode {
  const error = errors[propertyName] ?? '';
  return <>{error && touches[propertyName] ? <div className="text-red-600 text-sm">{error.toString()}</div> : null}</>;
}

type FormikErrorMessageProps<TFormModel> = {
  errors: FormikErrors<TFormModel>;
  touches: FormikTouched<TFormModel>;
  propertyName: keyof TFormModel;
};
