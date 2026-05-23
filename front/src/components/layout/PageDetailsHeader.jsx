import { ArrowLeft } from 'lucide-react';

import { useNavigate } from 'react-router';

export const PageDetailsHeader = ({
  title,
  description,
  backTo,
}) => {
  const navigate = useNavigate();

  return (
    <header className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(backTo)}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-zinc-100"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Dashboard
            </p>

            <h1 className="font-semibold text-zinc-900">
              {title}
            </h1>

            {description && (
              <p className="text-sm text-zinc-500">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};