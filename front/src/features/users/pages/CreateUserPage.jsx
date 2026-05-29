import { PageDetailsHeader } from '@/components/layout/PageDetailsHeader';
import { useApiForm } from '@/hooks/useApiForm';
import { createUserSchema } from '../schemas/createUser.schema';
import { createUser } from '../api/createUser';
import { Form } from '@/components/forms/Form';
import { InputError } from '@/components/forms/InputError';
import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/forms/FormField';
import { useNavigate } from 'react-router';
import { ROLES } from '@/shared/constants/roles';

export const CreateUserPage = () => {
  const navigate = useNavigate();
  const {
    register,

    onSubmit,

    formError,

    formState: { errors, isSubmitting },
  } = useApiForm({
    schema: createUserSchema,
    defaultValues: {
      type: ROLES.DELIVERY,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
    onError: (e) => {
      console.log(e);
    },
    onSuccess: () => {
      navigate('/users');
    },
    submit: createUser,
  });

  return (
    <>
      <PageDetailsHeader
        backTo="/users"
        title={'Create User'}
        description={'Create a new user'}
      />
      <div className="px-6">
        <Form className="mx-auto " onSubmit={onSubmit}>
          <FormField
            error={errors.firstName}
            label={'First Name'}
            name={'firstName'}
            register={register}
          />
          <FormField
            error={errors.lastName}
            label={'Last Name'}
            name={'lastName'}
            register={register}
          />
          <FormField
            error={errors.email}
            label={'Email'}
            name={'email'}
            register={register}
          />
          <FormField
            error={errors.password}
            label={'Password'}
            name={'password'}
            register={register}
            type={'password'}
          />
          {formError && <InputError>{formError}</InputError>}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating user...' : 'Create user'}
          </Button>
        </Form>
      </div>
    </>
  );
};
