import { X } from 'lucide-react';

import { cn } from '@/utils/cn';

export const Modal = ({
  children,
  isOpen,
  onClose,
  className,
}) => {
  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className={cn(
          'w-full max-w-md rounded-2xl border border-zinc-200 bg-white shadow-xl',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export const ModalHeader = ({
  title,
  onClose,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-start justify-between border-b border-zinc-200 p-6',
        className,
      )}
    >
      <h2 className="text-xl font-semibold text-zinc-900">
        {title}
      </h2>

      <button
        onClick={onClose}
        className="rounded-lg p-2 transition-colors hover:bg-zinc-100"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export const ModalContent = ({
  children,
  className,
}) => {
  return (
    <div className={cn('p-6', className)}>
      {children}
    </div>
  );
};

export const ModalFooter = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col-reverse gap-3 border-t border-zinc-200 p-6 sm:flex-row sm:justify-end',
        className,
      )}
    >
      {children}
    </div>
  );
};