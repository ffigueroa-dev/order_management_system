import { useForm, useFieldArray } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/forms/Input';
import { InputLabel } from '@/components/forms/InputLabel';
import { InputError } from '@/components/forms/InputError';
import { ComboboxField } from '@/components/forms/ComboboxField';

import { ProductListTable } from './ProductListTable';

export const ProductSelectorField = ({ control, products, error }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });

  const selectorForm = useForm({
    defaultValues: {
      productId: '',
      quantity: 1,
    },
  });

  const selectedProductId = selectorForm.watch('productId');

  const quantity = selectorForm.watch('quantity');

  const handleAddProduct = () => {
    if (!selectedProductId) {
      return;
    }

    if (!quantity || quantity <= 0) {
      return;
    }

    append({
      productId: selectedProductId,
      quantity: Number(quantity),
    });

    selectorForm.reset({
      productId: '',
      quantity: 1,
    });
  };

  return (
    <div className="space-y-4">
      <InputLabel>Products</InputLabel>

      <div className="flex gap-3">
        <div className="flex-1">
          <ComboboxField
            control={selectorForm.control}
            name="productId"
            options={products}
            placeholder="Select a product"
            getOptionValue={(product) => product.id}
            searchBy={(product) => `${product.name} ${product.description}`}
            renderOption={(product) => (
              <div>
                <p className="font-medium">{product.name}</p>

                <p className="text-xs text-zinc-500">${product.price}</p>
              </div>
            )}
          />
        </div>

        <Input
          type="number"
          min={1}
          className="w-24"
          {...selectorForm.register('quantity', {
            valueAsNumber: true,
            min: 1,
          })}
        />

        <Button
          type="button"
          onClick={handleAddProduct}
          disabled={!selectedProductId || quantity <= 0}
        >
          Add
        </Button>
      </div>

      <ProductListTable fields={fields} products={products} onRemove={remove} />

      {error && <InputError>{error.message}</InputError>}
    </div>
  );
};
