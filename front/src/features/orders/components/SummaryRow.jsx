export const SummaryRow = ({ label, value }) => {
  return (
    <div className='flex items-center justify-between text-sm'>
      <span className='text-zinc-500'>
        {label}
      </span>

      <span className='font-medium text-zinc-900'>
        {value}
      </span>
    </div>
  );
};