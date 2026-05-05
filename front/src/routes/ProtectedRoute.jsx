import { Navigate } from 'react-router';

import { useAuthStore } from '@/features/auth/store/auth.store';

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};