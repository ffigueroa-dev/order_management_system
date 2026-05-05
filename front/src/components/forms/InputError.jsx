import { cn } from '@/utils/cn';

export const InputError = ({
  children,
  className,
  ...props
}) => {
  if (!children) return null;

  return (
    <span
      className={cn(
        'text-sm text-red-500',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};