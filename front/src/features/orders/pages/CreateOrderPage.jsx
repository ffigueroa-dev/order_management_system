import { PageDetailsHeader } from '@/components/layout/PageDetailsHeader';
import { useNavigate } from 'react-router';
import { createOrderSchema } from '../schemas/createOrder.schema';
import { useApiForm } from '@/hooks/useApiForm';
import { createOrder } from '../api/createOrder';
import { Form } from '@/components/forms/Form';
import { useQuery } from '@/hooks/useQuery';
import { getClients } from '@/features/clients/api/getClients';
import { ComboboxField } from '@/components/forms/ComboboxField';
import { getUsers } from '@/features/users/api/getUsers';
import { getStatuses } from '@/features/statuses/api/getStatuses';
import { getProducts } from '@/features/products/api/getProducts';
import { ProductSelectorField } from '../components/ProductSelectorField';
import { InputError } from '@/components/forms/InputError';
import { Button } from '@/components/ui/Button';
import { useEffect } from 'react';
import { FormField } from '@/components/forms/FormField';

export const CreateOrderPage = () => {
  const navigate = useNavigate();
  const {
    register,

    onSubmit,

    formError,
    control,
    formState: { errors, isSubmitting },
  } = useApiForm({
    schema: createOrderSchema,
    defaultValues: {
      clientId: '',
      statusId: '',
      userId: '',
      notes: '',
      products: [],
    },
    onError: (e) => {
      console.log(e);
    },
    onSuccess: () => {
      navigate('/orders');
    },
    submit: createOrder,
  });
  const clients = useQuery({ entity: 'Clients', queryFn: getClients });
  const users = useQuery({ entity: 'Users', queryFn: getUsers });
  const statuses = useQuery({ entity: 'Statuses', queryFn: getStatuses });
  const products = useQuery({ entity: 'Products', queryFn: getProducts });

  return (
    <>
      <PageDetailsHeader
        backTo="/"
        title={'Create Order'}
        description={'Create a new order'}
      />
      <Form onSubmit={onSubmit}>
        {!clients.isLoading && (
          <ComboboxField
            control={control}
            name="clientId"
            label="Client"
            options={clients.data || []}
            error={errors.clientId}
            searchBy={(client) => client.email}
            getOptionValue={(client) => client.id}
            renderOption={(client) => (
              <div>
                <p className="font-medium">
                  {client.firstName} {client.lastName}
                </p>

                <p className="text-xs text-zinc-500">{client.email}</p>
              </div>
            )}
          />
        )}
        {!users.isLoading && (
          <ComboboxField
            control={control}
            name="userId"
            label="Assigned Delivery"
            options={users.data || []}
            error={errors.userId}
            searchBy={(user) => user.email}
            getOptionValue={(user) => user.id}
            renderOption={(user) => (
              <div>
                <p className="font-medium">
                  {user.firstName} {user.lastName}
                </p>

                <p className="text-xs text-zinc-500">
                  {user.email} • {user.type}
                </p>
              </div>
            )}
          />
        )}
        {!statuses.isLoading && (
          <ComboboxField
            control={control}
            name="statusId"
            label="Initial Status"
            options={statuses.data || []}
            error={errors.statusId}
            searchBy={(status) => status.label}
            getOptionValue={(status) => status.id}
            renderOption={(status) => (
              <div className="flex items-center gap-3">
                <div
                  className="h-4 w-4 rounded-full border border-black/10"
                  style={{
                    backgroundColor: status.color,
                  }}
                />

                <span>{status.label}</span>
              </div>
            )}
          />
        )}
        <FormField
          error={errors.notes}
          label={'Notes'}
          name={'notes'}
          register={register}
          type={'notes'}
        />
        {!products.isLoading && (
          <ProductSelectorField
            control={control}
            products={products.data || []}
            error={errors.products}
          />
        )}

        {formError && <InputError>{formError}</InputError>}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating order...' : 'Create order'}
        </Button>
      </Form>
    </>
  );
};
