import { Card, CardContent } from '@/components/ui/Card';
import { Link } from 'react-router';

export const StatusItem = ({ status }) => {
  return (
    <Link to={`/statuses/${status.id}`}>
      <Card className="group overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md">
        <CardContent className="flex items-center justify-between gap-4 p-5">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="h-4 w-4 flex-shrink-0 rounded-full border border-black/10 shadow-sm"
              style={{
                backgroundColor: `${status.color}`,
              }}
            />

            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-zinc-900">
                {status.label}
              </h3>

              <p className="text-xs text-zinc-500">
                Status color
              </p>
            </div>
          </div>

          <div
            className="h-10 w-1 rounded-full transition-transform group-hover:scale-y-110"
            style={{
              backgroundColor: `${status.color}`,
            }}
          />
        </CardContent>
      </Card>
    </Link>
  );
};