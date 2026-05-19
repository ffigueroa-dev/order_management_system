import { ShoppingCart, Users } from 'lucide-react';

import { SidebarOption } from './SidebarOption';

export const Sidebar = ({
  header_height,
  sidebar_width,
}) => {
  return (
    <aside
      className='fixed left-0 border-r border-zinc-200 bg-white p-4'
      style={{
        top: header_height,
        width: sidebar_width,
        height: `calc(100vh - ${header_height})`,
      }}
    >
      <nav className='flex flex-col gap-2'>
        <SidebarOption
          name='Orders'
          path='/'
          icon={ShoppingCart}
        />
        <SidebarOption
          name='Users'
          path='/users'
          icon={Users}
        />
      </nav>
    </aside>
  );
};