import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface FormFieldProps {
  name: string;
  label: string;
  inputType?: string;
}

export const FormField = ({ name, label, inputType }: FormFieldProps) => {
  const { register, formState } = useFormContext();
  const [touched, setTouched] = useState(false);

  return (
    <div className="my-4 flex flex-col gap-2">
      {touched ? (
        <label htmlFor={name} className="self-start text-sm text-gray-500">
          {label}
        </label>
      ) : (
        <span className="min-h-5"></span>
      )}
      <input
        id={name}
        type={inputType ?? 'text'}
        onFocus={() => setTouched(true)}
        placeholder={touched ? undefined : label}
        {...register(name, {
          valueAsNumber: inputType === 'number',
        })}
        className="text-foreground bg-background border-b-2 border-b-gray-300 py-2 outline-0 placeholder:text-gray-500 focus:border-b-2 focus:border-b-blue-700"
      />
      {formState.errors[name] ? (
        <span className="self-start text-red-800">
          {formState.errors[name]?.message?.toString()}
        </span>
      ) : (
        <span className="min-h-6" />
      )}
    </div>
  );
};
