export const Loader = () => {
  return (
    <div data-testid="loader" className="mt-8 flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-fuchsia-500" />
    </div>
  );
};
