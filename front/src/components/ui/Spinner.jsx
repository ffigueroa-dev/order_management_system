export const Spinner = () => {
  return (
    <div role="status" className="flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-gray-200 border-b-blue-500 rounded-full animate-spin" />

      <span className="sr-only">Loading...</span>
    </div>
  );
};