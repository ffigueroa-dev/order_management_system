import { HeaderBrand } from './HeaderBrand';
import { HeaderUser } from './HeaderUser';

export const Header = ({ user }) => {
  return (
    <header className="w-full bg-zinc-100 border-b border-zinc-200 px-8 py-4 flex items-center justify-between">
      <HeaderBrand />

      <HeaderUser
        firstName={user?.firstName}
        lastName={user?.lastName}
        type={user?.type}
      />
    </header>
  );
};
