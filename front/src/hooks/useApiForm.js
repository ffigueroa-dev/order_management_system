import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

export const useApiForm = ({
  schema,
  defaultValues,
  submit,
  onSuccess,
  onError,
}) => {
  const [formError, setFormError] = useState(null);

  const form = useForm({
    resolver: zodResolver(schema),

    defaultValues,
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      setFormError(null);

      const response = await submit(values);

      onSuccess?.(response);

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Something went wrong';

      setFormError(message);

      onError?.(error);
    }
  });

  return {
    ...form,

    formError,

    onSubmit,
  };
};