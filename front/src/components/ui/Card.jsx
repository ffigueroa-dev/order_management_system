import { cn } from '@/utils/cn';

export const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white border border-zinc-200 rounded-2xl shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children, ...props }) => {
  return (
    <div className={cn('p-6 pb-4', className)} {...props}>
      {children}
    </div>
  );
};

export const CardContent = ({ className, children, ...props }) => {
  return (
    <div className={cn('px-6 pb-6', className)} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ className, children, ...props }) => {
  return (
    <div
      className={cn('px-6 py-4 border-t border-zinc-200', className)}
      {...props}
    >
      {children}
    </div>
  );
};