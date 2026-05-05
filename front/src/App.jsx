import { useEffect } from 'react';
import { RouterProvider } from 'react-router';

import { router } from '@/routes/router';

import { useAuthStore } from '@/features/auth/store/auth.store';

const App = () => {
  const loadSession = useAuthStore((state) => state.loadSession);
  useEffect(() => {
    loadSession();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;