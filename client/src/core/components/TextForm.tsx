import { FormikErrorMessage } from 'core/components/FormikErrorMessage';
import { FormikValues, useFormik } from 'formik';
import { ReactElement } from 'react';

export function TextForm<TFormModel extends FormikValues>({ formik, propertyName, label, placeholder, type }: TextFormProps<TFormModel>): ReactElement {
  const onBlur = (event: React.FocusEvent) => {
    formik.setFieldTouched(event.target.id, true, true);
  };

  const isInvalid = formik.touched[propertyName] && !!formik.errors[propertyName];

  return (
    <div className="w-full flex flex-col my-2">
      <label className="text-slate-800 font-semibold">{label}</label>
      <input
        className={`border border-slate-200 p-2 ${isInvalid ? 'border-red-600' : ''}`}
        id={propertyName}
        name={propertyName}
        type={type}
        onChange={formik.handleChange}
        onBlur={onBlur}
        value={formik.values[propertyName]}
        placeholder={placeholder}
        autoComplete="off"
        disabled={formik.isSubmitting}
      />
      <FormikErrorMessage<TFormModel>
        propertyName={propertyName}
        errors={formik.errors}
        touches={formik.touched}
      />
    </div>
  );
}

export type TextFormProps<TFormModel extends FormikValues> = {
  formik: FormikType<TFormModel>;
  propertyName: keyof TFormModel & string;
  label: string;
  placeholder?: string;
  type: 'text' | 'password';
};

type FormikType<TFormModel extends FormikValues> = ReturnType<typeof useFormik<TFormModel>>;
