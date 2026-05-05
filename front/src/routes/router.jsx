import { createBrowserRouter } from 'react-router';

import { AuthLayout } from '@/layouts/AuthLayout';

import { LoginPage } from '@/features/auth/pages/LoginPage';

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
]);