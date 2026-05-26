export const ErrorMessage = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred.',
}) => {
  return (
    <div className="p-6">
      <div className="max-w-md rounded-2xl border border-red-200 bg-red-50 p-4">
        <h2 className="mb-1 font-semibold text-red-600">{title}</h2>

        <p className="text-sm text-red-500">{message}</p>
      </div>
    </div>
  );
};