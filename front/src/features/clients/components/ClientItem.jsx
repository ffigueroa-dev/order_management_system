import { Card, CardContent } from '@/components/ui/Card';

import { formatDate } from '@/utils/formatDate';

export const ClientItem = ({ client }) => {
  return (
    <Card className="w-full max-w-sm transition-shadow hover:shadow-md">
      <CardContent className="flex flex-col gap-4 pt-6">
        <div className="space-y-1">
          <h3 className="truncate text-lg font-semibold text-zinc-900">
            {client.firstName} {client.lastName}
          </h3>

          <p className="truncate text-sm text-zinc-500">
            {client.email}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">
            Address
          </span>

          <p className="truncate text-sm text-zinc-700">
            {client.fullAddress}
          </p>
        </div>

        <div className="border-t pt-3 text-xs text-zinc-400">
          Created at{' '}
          {formatDate(client.createdAt)}
        </div>
      </CardContent>
    </Card>
  );
};