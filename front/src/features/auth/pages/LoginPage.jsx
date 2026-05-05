import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/forms/Form';
import { Input } from '@/components/forms/Input';
import { InputError } from '@/components/forms/InputError';
import { InputLabel } from '@/components/forms/InputLabel';
import { Button } from '@/components/ui/Button';
import { loginSchema } from '../schemas/auth.schema';



export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
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

        <Button type="submit">Sign in</Button>
      </Form>
    </>
  );
};
