import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export const Input = forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition-colors',
        'placeholder:text-neutral-400',
        'focus:border-black',
        'disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400',
        className,
      )}
      {...props}
    />
  );
});
