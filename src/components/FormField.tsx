import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
}

export const FormField = (props: FormFieldProps) => {
  const { register, formState } = useFormContext();
  const [touched, setTouched] = useState(false);

  return (
    <div className="my-4 flex gap-2 flex-col">
      {touched ? (
        <label
          htmlFor={props.name}
          className="text-gray-500 self-start text-sm"
        >
          {props.label}
        </label>
      ) : (
        <span className="min-h-5"></span>
      )}
      <input
        id={props.name}
        type={props.type ?? "text"}
        onFocus={() => setTouched(true)}
        placeholder={touched ? undefined : props.label}
        {...register(props.name, {
          valueAsNumber: props.type === "number",
        })}
        className="py-2 text-foreground bg-background outline-0 border-b-2 border-b-gray-300 placeholder:text-gray-500 focus:border-b-2 focus:border-b-blue-700"
      />
      {formState.errors[props.name] ? (
        <span className="text-red-800 self-start">
          {formState.errors[props.name]?.message?.toString()}
        </span>
      ) : (
        <span className="min-h-6" />
      )}
    </div>
  );
};
