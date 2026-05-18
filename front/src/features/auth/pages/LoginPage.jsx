import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';

import { useAuthStore } from '../store/auth.store';
import { loginSchema } from '../schemas/auth.schema';
import { login } from '../api/login';

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
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const [formError, setFormError] = useState(false);

  const onSubmit = async (data) => {
    try {
      setFormError(false);

      const res = await login(data);

      authLogin({
        user: res.user,
        token: res.token,
      });
      navigate('/');
    } catch (error) {
      console.error(error);

      setFormError(true);
    }
  };

  return (
    <>
      <div className="w-full flex justify-center items-center flex-col mb-12">
        <h1 className="mt-6 text-3xl font-semibold text-foreground">Sign in</h1>

        <p className="text-muted-foreground">
          Enter your credentials to continue
        </p>
      </div>

      <Form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
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
        {formError && (
          <InputError>
            Incorrect email or password. Please try again later
          </InputError>
        )}
        <Button type="submit">Sign in</Button>
      </Form>
    </>
  );
};
