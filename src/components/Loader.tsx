export const Loader = () => {
  return (
    <div data-testid="loader" className="flex justify-center items-center mt-8">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-fuchsia-500 rounded-full animate-spin" />
    </div>
  );
};
