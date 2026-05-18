import { NavLink } from 'react-router';

export const SidebarOption = ({ name, path, icon: Icon }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => {
        const baseClasses =
          'flex items-center gap-3 rounded-xl px-4 py-3 transition-colors duration-200';

        const activeClasses = isActive
          ? 'bg-zinc-900 text-white'
          : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900';

        return `${baseClasses} ${activeClasses}`;
      }}
    >
      <Icon size={20} />

      <span className="font-medium">{name}</span>
    </NavLink>
  );
};