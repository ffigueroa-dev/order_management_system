import { useNavigate } from 'react-router';

import { useAuthStore } from '../store/auth.store';

import { loginSchema } from '../schemas/auth.schema';

import { login } from '../api/login';

import { useApiForm } from '@/hooks/useApiForm';

import { Form } from '@/components/forms/Form';

import { Input } from '@/components/forms/Input';

import { InputError } from '@/components/forms/InputError';

import { InputLabel } from '@/components/forms/InputLabel';

import { Button } from '@/components/ui/Button';

export const LoginPage = () => {
  const navigate = useNavigate();

  const authLogin = useAuthStore((state) => state.login);

  const {
    register,

    onSubmit,

    formError,

    formState: { errors, isSubmitting },
  } = useApiForm({
    schema: loginSchema,

    defaultValues: {
      email: '',
      password: '',
    },

    submit: login,

    onSuccess: (res) => {
      authLogin({
        user: res.user,

        token: res.token,
      });

      navigate('/');
    },

    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <>
      <div className="mb-12 flex w-full flex-col items-center justify-center">
        <h1 className="mt-6 text-3xl font-semibold text-foreground">Sign in</h1>

        <p className="text-muted-foreground">
          Enter your credentials to continue
        </p>
      </div>

      <Form className="mx-auto max-w-sm" onSubmit={onSubmit}>
        <div className="flex flex-col gap-1.5">
          <InputLabel htmlFor="email">Email</InputLabel>

          <Input
            id="email"
            placeholder="example@gmail.com"
            {...register('email')}
          />

          {errors.email && <InputError>{errors.email.message}</InputError>}
        </div>

        <div className="flex flex-col gap-1.5">
          <InputLabel htmlFor="password">Password</InputLabel>

          <Input id="password" type="password" {...register('password')} />

          {errors.password && (
            <InputError>{errors.password.message}</InputError>
          )}
        </div>

        {formError && <InputError>{formError}</InputError>}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>
      </Form>
    </>
  );
};
