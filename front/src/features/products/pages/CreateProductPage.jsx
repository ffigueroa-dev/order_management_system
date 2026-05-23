import { Form } from '@/components/forms/Form';
import { Input } from '@/components/forms/Input';
import { InputError } from '@/components/forms/InputError';
import { InputLabel } from '@/components/forms/InputLabel';
import { PageDetailsHeader } from '@/components/layout/PageDetailsHeader';
import { Button } from '@/components/ui/Button';
import { useApiForm } from '@/hooks/useApiForm';
import { useNavigate } from 'react-router';
import { productSchema } from '../schemas/product.schema';
import { createProduct } from '../api/createProduct';

export const CreateProductPage = () => {
  const navigate = useNavigate();

  const {
    register,

    onSubmit,

    formError,

    formState: { errors, isSubmitting },
  } = useApiForm({
    schema: productSchema,

    defaultValues: {
      name: '',
      description: '',
      price: 0,
    },

    submit: createProduct,

    onSuccess: () => {
      navigate('/products');
    },

    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <div>
      <PageDetailsHeader
        backTo="/products"
        title={'Create Product'}
        description={'Create a new product'}
      />
      <div className="px-6">
        <Form className="mx-auto " onSubmit={onSubmit}>
          <div className="flex flex-col gap-1.5">
            <InputLabel htmlFor="name">name</InputLabel>

            <Input id="name" placeholder="Product name" {...register('name')} />

            {errors.name && <InputError>{errors.name.message}</InputError>}
          </div>

          <div className="flex flex-col gap-1.5">
            <InputLabel htmlFor="description">Description</InputLabel>

            <Input
              id="description"
              placeholder="Product description"
              {...register('description')}
            />

            {errors.description && (
              <InputError>{errors.description.message}</InputError>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <InputLabel htmlFor="price">Price</InputLabel>

            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register('price', {
                valueAsNumber: true,
              })}
            />

            {errors.price && <InputError>{errors.price.message}</InputError>}
          </div>

          {formError && <InputError>{formError}</InputError>}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating product...' : 'Create Product'}
          </Button>
        </Form>
      </div>
    </div>
  );
};
