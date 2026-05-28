import { Form } from '@/components/forms/Form';
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/ui/Modal';
import { useApiForm } from '@/hooks/useApiForm';
import { FormField } from '@/components/forms/FormField';
import { InputError } from '@/components/forms/InputError';
import { Button } from '@/components/ui/Button';
import { useEffect } from 'react';
import { updateStatusSchema } from '../schemas/updateStatus.schema';

export const UpdateStatusModal = ({
  status,
  isOpen,
  onClose,
  onUpdateStatus,
}) => {
  const {
    register,
    onSubmit,
    formError,
    reset,
    formState: { errors, isSubmitting },
  } = useApiForm({
    schema: updateStatusSchema,
    defaultValues: { label: status.label, color: status.color },
    submit: onUpdateStatus,
    onSuccess: () => {
      onClose();
    },

    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    if (!status || !isOpen) {
      return;
    }

    reset({
      label: status.label,
      color: status.color,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader title="Create Status" onClose={onClose} />
      <ModalContent>
        <Form className={'gap-5'} onSubmit={onSubmit}>
          <FormField
            error={errors.label}
            label={'Label'}
            name={'label'}
            register={register}
          />
          <FormField
            error={errors.color}
            label={'Color'}
            name={'color'}
            register={register}
            type="color"
            className="w-10 h-10 px-0 py-0 border-none"
          />
          {formError && <InputError>{formError}</InputError>}

          <ModalFooter className="px-0 pb-0">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Status'}
            </Button>
          </ModalFooter>
        </Form>
      </ModalContent>
    </Modal>
  );
};
