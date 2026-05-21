import { Card, CardContent } from '@/components/ui/Card';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';

export const ProductItem = ({ product }) => {
  return (
    <Card className="w-full max-w-sm transition-shadow hover:shadow-md">
      <CardContent className="flex flex-col gap-4 pt-6">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-zinc-900">
            {product.name}
          </h3>

          <p className="truncate text-sm text-zinc-500">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-zinc-900">
            {formatCurrency(product.price)}
          </span>

          
        </div>

        <div className="border-t pt-3 text-xs text-zinc-400">
          Created at{' '}
          {formatDate(product.createdAt)}
        </div>
      </CardContent>
    </Card>
  );
};