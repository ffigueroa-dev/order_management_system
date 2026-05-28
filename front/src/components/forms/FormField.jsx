import { Input } from './Input';
import { InputError } from './InputError';
import { InputLabel } from './InputLabel';

export const FormField = ({
  label,
  name,
  register,
  error,
  regisetrOptions,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <InputLabel htmlFor={name}>
        {label}
      </InputLabel>

      <Input
        id={name}
        {...register(name, regisetrOptions)}
        {...props}
      />

      {error && (
        <InputError>
          {error.message}
        </InputError>
      )}
    </div>
  );
};