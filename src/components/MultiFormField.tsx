import { useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

interface MultiFormFieldProps {
  name: string;
  label: string;
  topLabel: string;
  addButtonLabel: string;
}

export const MultiFormField = ({
  name,
  label,
  topLabel,
  addButtonLabel,
}: MultiFormFieldProps) => {
  const { control, register, formState, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  const value = watch(name);

  const touched = formState.touchedFields[name];
  const isSubmitted = formState.isSubmitted;
  const error = formState.errors[name];

  const showError = (touched && Object.keys(touched).length > 0) || isSubmitted;

  return (
    <div className="my-4 flex flex-col gap-2">
      <label className="text-blue-700 font-bold self-start">{topLabel}</label>

      {value.map((_: string, index: number) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            placeholder={label}
            {...register(`${name}.${index}` as const)}
            className="flex-1 py-2 text-foreground bg-background outline-0 border-b-2 border-b-gray-300 placeholder:text-gray-500 focus:border-b-2 focus:border-b-blue-700"
          />
          {fields.length > 1 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-500 hover:cursor-pointer p-4"
            >
              ✖
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        data-testid="add-ingredient-button"
        disabled={value[value.length - 1] === ""}
        onClick={() => append("")}
        className="flex flex-row items-center gap-4 p-2 border-2 border-fuchsia-500 rounded-[8px] mt-4 text-fuchsia-500 font-bold self-start cursor-pointer hover:text-blue-700 hover:border-blue-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-fuchsia-500 disabled:hover:text-fuchsia-500"
      >
        <p>{addButtonLabel}</p>
      </button>

      {showError && error ? (
        <span className="text-red-800 self-start">
          {error.root?.message?.toString()}
        </span>
      ) : (
        <span className="min-h-6" />
      )}
    </div>
  );
};
