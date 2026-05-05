import { cn } from '@/utils/cn';

export const Form = ({
  children,
  className,
  ...props
}) => {
  return (
    <form
      className={cn(
        'flex flex-col gap-5 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </form>
  );
};