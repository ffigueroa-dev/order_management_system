import { cn } from "@/utils/cn";


export const Button = ({
  children,
  className,
  variant = 'primary',
  disabled = false,
  ...props
}) => {
  const variants = {
    primary:
      'bg-black text-white hover:bg-neutral-800',

    secondary:
      'bg-neutral-100 text-black hover:bg-neutral-200',

    danger:
      'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors',
        'disabled:pointer-events-none disabled:opacity-50',
        'focus:outline-none focus:ring-2 focus:ring-black/20',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};