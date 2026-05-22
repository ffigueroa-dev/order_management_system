import { ArrowLeft } from 'lucide-react';
import { NavLink } from 'react-router';

export const ProductHeader = ({ product }) => {
  return (
    <div className="flex items-center justify-between w-full max-w-2xl mb-6">
      <div className="flex items-center gap-3">
        <NavLink to={'/products'} className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-zinc-100">
          <ArrowLeft size={18} />
        </NavLink>

        <div>
          <p className="text-xs uppercase tracking-wide text-zinc-500">Product</p>

          <h1 className="font-semibold text-zinc-900">
            {product.name}
          </h1>
        </div>
      </div>
    </div>
  );
};