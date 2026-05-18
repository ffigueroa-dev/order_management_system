import { cn } from '@/utils/cn';

export const Badge = ({ className, children, ...props }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};