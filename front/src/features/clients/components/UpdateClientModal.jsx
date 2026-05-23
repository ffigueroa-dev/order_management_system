import { useEffect } from 'react';

import { Form } from '@/components/forms/Form';

import { Input } from '@/components/forms/Input';

import { InputError } from '@/components/forms/InputError';

import { InputLabel } from '@/components/forms/InputLabel';

import { Button } from '@/components/ui/Button';

import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/ui/Modal';

import { useApiForm } from '@/hooks/useApiForm';

import { updateClientSchema } from '../schemas/updateClient.schema';

export const UpdateClientModal = ({
  client,
  isOpen,
  onClose,
  onSubmitClient,
}) => {
  const {
    register,

    reset,

    onSubmit,

    formError,

    formState: { errors, isSubmitting },
  } = useApiForm({
    schema: updateClientSchema,

    defaultValues: {
      firstName: '',

      lastName: '',

      email: '',

      fullAddress: '',
    },

    submit: onSubmitClient,

    onSuccess: () => {
      onClose();
    },

    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    if (!client || !isOpen) {
      return;
    }

    reset({
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      fullAddress: client.fullAddress,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleClose = () => {
    reset({
      firstName: '',

      lastName: '',

      email: '',

      fullAddress: '',
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalHeader title="Edit Client" onClose={handleClose} />

      <ModalContent>
        <Form className="gap-5" onSubmit={onSubmit}>
          <div className="flex flex-col gap-1.5">
            <InputLabel htmlFor="firstName">First Name</InputLabel>

            <Input
              id="firstName"
              placeholder="Client first name"
              {...register('firstName')}
            />

            {errors.firstName && (
              <InputError>{errors.firstName.message}</InputError>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <InputLabel htmlFor="lastName">Last Name</InputLabel>

            <Input
              id="lastName"
              placeholder="Client last name"
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
            <InputLabel htmlFor="fullAddress">Full Address</InputLabel>

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

          <ModalFooter className="px-0 pb-0">
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Client'}
            </Button>
          </ModalFooter>
        </Form>
      </ModalContent>
    </Modal>
  );
};
