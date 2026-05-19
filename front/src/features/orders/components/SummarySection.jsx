import { ClipboardList } from 'lucide-react';
import { SectionCard } from './SectionCard';
import { SummaryRow } from './SummaryRow';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';

export const SummarySection = ({ order }) => {
  return (
    <SectionCard icon={ClipboardList} title="Summary">
      <div className="space-y-4">
        <SummaryRow label="Subtotal" value={formatCurrency(order.total)} />

        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-500">Payment Status</span>

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

        <div className="border-t border-zinc-100 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Total</span>

            <span className="text-2xl font-bold">
              {formatCurrency(order.total)}
            </span>
          </div>

          <p className="mt-2 text-xs text-zinc-400">
            Created on {formatDate(order.createdAt)}
          </p>
        </div>
      </div>
    </SectionCard>
  );
};
