import { Form } from '@/components/forms/Form';
import { Input } from '@/components/forms/Input';
import { InputError } from '@/components/forms/InputError';
import { InputLabel } from '@/components/forms/InputLabel';
import { PageDetailsHeader } from '@/components/layout/PageDetailsHeader';
import { Button } from '@/components/ui/Button';
import { useApiForm } from '@/hooks/useApiForm';
import { useNavigate } from 'react-router';
import { createClient } from '../api/createClient';
import { createClientSchema } from '../schemas/createClient.schema';

export const CreateClientPage = () => {
  const navigate = useNavigate();

  const {
    register,

    onSubmit,

    formError,

    formState: { errors, isSubmitting },
  } = useApiForm({
    schema: createClientSchema,

    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      fullAddress: '',
    },

    submit: createClient,

    onSuccess: () => {
      navigate('/clients');
    },

    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <div>
      <PageDetailsHeader
        backTo="/clients"
        title={'Create Client'}
        description={'Create a new client'}
      />
      <div className="px-6">
        <Form className="mx-auto " onSubmit={onSubmit}>
          <div className="flex flex-col gap-1.5">
            <InputLabel htmlFor="firstName">Name</InputLabel>

            <Input
              id="firstName"
              placeholder="Client name"
              {...register('firstName')}
            />

            {errors.firstName && (
              <InputError>{errors.firstName.message}</InputError>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <InputLabel htmlFor="lastName">Last name</InputLabel>

            <Input
              id="lastName"
              placeholder="Last name"
              {...register('lastName')}
            />

            {errors.lastName && (
              <InputError>{errors.lastName.message}</InputError>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <InputLabel htmlFor="email">Email</InputLabel>

            <Input id="email" placeholder="Email" {...register('email')} />

            {errors.email && <InputError>{errors.email.message}</InputError>}
          </div>
          <div className="flex flex-col gap-1.5">
            <InputLabel htmlFor="fullAddress">Full address</InputLabel>

            <Input
              id="fullAddress"
              placeholder="Full address"
              {...register('fullAddress')}
            />

            {errors.fullAddress && (
              <InputError>{errors.fullAddress.message}</InputError>
            )}
          </div>

          {formError && <InputError>{formError}</InputError>}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating client...' : 'Create client'}
          </Button>
        </Form>
      </div>
    </div>
  );
};
