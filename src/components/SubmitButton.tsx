import { Loader } from '@/components/Loader';

export const SubmitButton = ({ isSubmitting, label }: { isSubmitting: boolean; label: string }) => {
  return (
    <button
      data-testid="submit-button"
      disabled={isSubmitting}
      className="mt-4 flex w-44 cursor-pointer flex-row items-center gap-4 self-end rounded-[8px] border-2 border-fuchsia-500 p-4 font-bold text-fuchsia-500 hover:border-blue-700 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-fuchsia-500 disabled:hover:text-fuchsia-500"
      type="submit"
    >
      {!isSubmitting && <span className="text-2xl">+</span>}

      {isSubmitting && (
        <div className="mx-auto mt-[-2rem]">
          <Loader />
        </div>
      )}

      {!isSubmitting && <span>{label}</span>}
    </button>
  );
};
