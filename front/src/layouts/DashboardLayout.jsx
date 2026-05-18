import { Header } from '@/components/ui/Header';
import { Sidebar } from '@/components/ui/Sidebar';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { Outlet } from 'react-router';

const HEADER_HEIGHT = '73px';
const SIDEBAR_WIDTH = '260px';

export const DashboardLayout = () => {
  const session = useAuthStore((state) => state.user);

  return (
    <div className="bg-zinc-50">
      {/* HEADER */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header user={session} />
      </div>

      {/* SIDEBAR */}
      <Sidebar header_height={HEADER_HEIGHT} sidebar_width={SIDEBAR_WIDTH} />

      {/* CONTENT */}
      <main
        className="overflow-y-auto p-6"
        style={{
          marginTop: HEADER_HEIGHT,
          marginLeft: SIDEBAR_WIDTH,
          height: `calc(100vh - ${HEADER_HEIGHT})`,
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};
