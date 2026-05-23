export const PageHeader = ({ title, description, actions }) => {
  return (
    <header className="p-6 ">
      <div className="p-6 flex flex-col gap-4 border-b border-zinc-200 bg-white sm:flex-row sm:items-center sm:justify-between rounded-lg">
        <div className="space-y-1">
          <p className="text-sm font-medium uppercase tracking-wide text-zinc-400">
            Dashboard
          </p>

          <h1 className="text-3xl font-bold text-zinc-900">{title}</h1>

          {description && (
            <p className="text-sm text-zinc-500">{description}</p>
          )}
        </div>

        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </header>
  );
};
