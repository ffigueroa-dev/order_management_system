import { Outlet } from 'react-router';

export const DashboardLayout = () => {
  return (
    <div>
      {/* <aside>Sidebar</aside> */}

      <main>
        <Outlet />
      </main>
    </div>
  );
};