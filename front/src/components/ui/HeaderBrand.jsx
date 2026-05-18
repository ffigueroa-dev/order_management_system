import { Van } from 'lucide-react';

export const HeaderBrand = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
        <Van className="text-white" />
      </div>

      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Order Panel</h1>

        <p className="text-sm text-zinc-500">Order Management System</p>
      </div>
    </div>
  );
};
