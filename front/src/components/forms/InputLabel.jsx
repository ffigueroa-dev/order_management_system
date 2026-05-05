import { cn } from '@/utils/cn';

export const InputLabel = ({
  children,
  className,
  ...props
}) => {
  return (
    <label
      className={cn(
        'text-sm font-medium text-neutral-700',
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
};