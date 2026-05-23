import { useEffect } from 'react';

import { updateProductSchema } from '../schemas/updateProduct.schema';

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

export const UpdateProductModal = ({
  product,
  isOpen,
  onClose,
  onSubmitProduct,
}) => {
  const {
    register,

    reset,

    onSubmit,

    formError,

    setValue,

    formState: { errors, isSubmitting },
  } = useApiForm({
    schema: updateProductSchema,

    defaultValues: {
      name: '',

      description: '',

      price: 0,
    },

    submit: onSubmitProduct,

    onSuccess: () => {
      onClose();
    },

    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    if (!product) {
      return;
    }

    setValue('name', product.name);

    setValue(
      'description',
      product.description,
    );

    setValue(
      'price',
      Number(product.price),
    );
  }, [product, setValue]);

  const handleClose = () => {
    reset();

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
    >
      <ModalHeader
        title="Edit Product"
        onClose={handleClose}
      />

      <ModalContent>
        <Form
          className="gap-5"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col gap-1.5">
            <InputLabel htmlFor="name">
              Name
            </InputLabel>

            <Input
              id="name"
              placeholder="Product name"
              {...register('name')}
            />

            {errors.name && (
              <InputError>
                {errors.name.message}
              </InputError>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <InputLabel htmlFor="description">
              Description
            </InputLabel>

            <Input
              id="description"
              placeholder="Product description"
              {...register('description')}
            />

            {errors.description && (
              <InputError>
                {errors.description.message}
              </InputError>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <InputLabel htmlFor="price">
              Price
            </InputLabel>

            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register('price', {
                valueAsNumber: true,
              })}
            />

            {errors.price && (
              <InputError>
                {errors.price.message}
              </InputError>
            )}
          </div>

          {formError && (
            <InputError>{formError}</InputError>
          )}

          <ModalFooter className="px-0 pb-0">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? 'Updating...'
                : 'Update Product'}
            </Button>
          </ModalFooter>
        </Form>
      </ModalContent>
    </Modal>
  );
};