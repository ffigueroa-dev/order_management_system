import { Badge } from '@/components/ui/Badge';
import { ArrowLeft } from 'lucide-react';
import { NavLink } from 'react-router';

export const OrderHeader = ({ order }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <NavLink to={'/'} className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-zinc-100">
          <ArrowLeft size={18} />
        </NavLink>

        <div>
          <p className="text-xs uppercase tracking-wide text-zinc-500">Order</p>

          <h1 className="font-semibold text-zinc-900">
            #{order.id.slice(0, 8).toUpperCase()}
          </h1>
        </div>
      </div>

      <Badge
        className="gap-2 border-0"
        style={{
          backgroundColor: `${order.status.color}20`,
          color: order.status.color,
        }}
      >
        <div
          className="h-2 w-2 rounded-full"
          style={{
            backgroundColor: order.status.color,
          }}
        />

        {order.status.label}
      </Badge>
    </div>
  );
};
