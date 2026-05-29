import { CalendarDays, Mail, User } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/Card';

import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/utils/formatDate';
import { Link } from 'react-router';

const typeStyles = {
  owner: {
    background: '#dbeafe',
    color: '#2563eb',
  },

  delivery: {
    background: '#dcfce7',
    color: '#16a34a',
  },
};

export const UserCard = ({ user }) => {
  const badgeStyle = typeStyles[user.type] || typeStyles.owner;

  return (
    <Link to={`/users/${user.id}`}>
      <Card className="transition-shadow hover:shadow-md max-w-sm">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100">
                <User size={24} className="text-zinc-600" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-zinc-900">
                  {user.firstName} {user.lastName}
                </h2>

                <div className="mt-1 flex items-center gap-2 text-sm text-zinc-500">
                  <Mail size={14} />

                  {user.email}
                </div>
              </div>
            </div>

            <Badge
              className="capitalize border-0 text-xs"
              style={{
                backgroundColor: badgeStyle.background,
                color: badgeStyle.color,
              }}
            >
              <div
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: badgeStyle.color,
                }}
              />

              {user.type}
            </Badge>
          </div>

          <div className="mt-6 flex items-center gap-2 border-t border-zinc-100 pt-4 text-sm text-zinc-500">
            <CalendarDays size={14} />
            Created on {formatDate(user.createdAt)}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
