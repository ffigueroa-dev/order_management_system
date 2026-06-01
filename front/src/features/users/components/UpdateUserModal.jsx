import { useEffect } from 'react';

import { Form } from '@/components/forms/Form';

import { InputError } from '@/components/forms/InputError';

import { Button } from '@/components/ui/Button';

import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/ui/Modal';

import { useApiForm } from '@/hooks/useApiForm';

import { updateUserSchema } from '../schemas/updaetUser.schema';
import { FormField } from '@/components/forms/FormField';
import { ROLES } from '@/shared/constants/roles';

export const UpdateUserModal = ({ user, isOpen, onClose, onSubmitUser }) => {
  const {
    register,

    reset,

    onSubmit,

    formError,

    formState: { errors, isSubmitting },
  } = useApiForm({
    schema: updateUserSchema,

    defaultValues: {
      firstName: '',

      lastName: '',

      email: '',
    },

    submit: onSubmitUser,

    onSuccess: () => {
      onClose();
    },

    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    if (!user || !isOpen) {
      return;
    }

    reset({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleClose = () => {
    reset({
      firstName: '',

      lastName: '',

      email: '',
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalHeader title="Edit User" onClose={handleClose} />

      <ModalContent>
        <Form className="gap-5" onSubmit={onSubmit}>
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

          {formError && <InputError>{formError}</InputError>}

          <ModalFooter className="px-0 pb-0">
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update User'}
            </Button>
          </ModalFooter>
        </Form>
      </ModalContent>
    </Modal>
  );
};
