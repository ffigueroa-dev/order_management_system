import { formatCurrency } from '@/utils/formatCurrency';

export const ProductItem = ({ product }) => {
  return (
    <div className="flex items-start justify-between border-b border-zinc-100 py-4 last:border-none">
      <div className="flex gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold">
          {product.ProductOrder.quantity}x
        </div>

        <div>
          <h4 className="font-medium text-zinc-900">{product.name}</h4>

          <p className="text-sm text-zinc-500">
            {formatCurrency(product.ProductOrder.unitPrice)} each
          </p>
        </div>
      </div>

      <span className="font-semibold text-zinc-900">
        {formatCurrency(product.ProductOrder.subtotal)}
      </span>
    </div>
  );
};
