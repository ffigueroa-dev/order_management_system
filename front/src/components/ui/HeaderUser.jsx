import {User} from 'lucide-react';

export const HeaderUser = ({
  firstName = '',
  lastName = '',
  type = '',
}) => {
  return (
    <div className='flex items-center gap-4'>
      <div className='w-11 h-11 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200'>
        <User size={18} className='text-zinc-700' />
      </div>

      <div className='text-right'>
        <p className='font-medium text-zinc-900'>{firstName + ' '+ lastName}</p>
        <p className='text-sm text-zinc-500'>{type}</p>
      </div>
    </div>
  );
};