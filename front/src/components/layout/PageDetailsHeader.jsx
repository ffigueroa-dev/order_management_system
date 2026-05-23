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
      <div className="flex items-start gap-4 rounded-lg border border-zinc-200 bg-white p-6">
        <button
          onClick={() => navigate(backTo)}
          className="mt-1 rounded-lg p-2 transition-colors hover:bg-zinc-100"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="space-y-1">
          <p className="text-sm font-medium uppercase tracking-wide text-zinc-400">
            Dashboard
          </p>

          <h1 className="text-3xl font-bold text-zinc-900">
            {title}
          </h1>

          {description && (
            <p className="text-sm text-zinc-500">
              {description}
            </p>
          )}
        </div>
      </div>
    </header>
  );
};