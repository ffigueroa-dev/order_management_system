import { Button } from '@/components/ui/Button';

import { Trash2 } from 'lucide-react';

export const ProductListTable = ({
  fields,
  products,
  onRemove,
}) => {
  const findProduct = (productId) =>
    products.find(
      (product) => product.id === productId,
    );

  if (fields.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200">
      <table className="w-full">
        <thead className="bg-zinc-50">
          <tr>
            <th className="p-3 text-left text-sm">
              Product
            </th>

            <th className="p-3 text-center text-sm">
              Qty
            </th>

            <th className="w-16" />
          </tr>
        </thead>

        <tbody>
          {fields.map((field, index) => {
            const product = findProduct(
              field.productId,
            );

            if (!product) {
              return null;
            }

            return (
              <tr
                key={field.id}
                className="border-t"
              >
                <td className="p-3">
                  <div>
                    <p className="font-medium">
                      {product.name}
                    </p>

                    <p className="text-xs text-zinc-500">
                      ${product.price}
                    </p>
                  </div>
                </td>

                <td className="p-3 text-center">
                  {field.quantity}
                </td>

                <td className="p-3">
                  <Button
                    type="button"
                    variant="danger"
                    className="h-8 w-8 p-0"
                    onClick={() =>
                      onRemove(index)
                    }
                  >
                    <Trash2 size={14} />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};