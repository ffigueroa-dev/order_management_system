import { createBrowserRouter } from 'react-router';

import { AuthLayout } from '@/layouts/AuthLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';

import { LoginPage } from '@/features/auth/pages/LoginPage';

import { OrdersPage } from '@/features/orders/pages/OrdersPage';

import { ProtectedRoute } from './ProtectedRoute';
import { OrderDetailPage } from '@/features/orders/pages/OrderDetailPage';
import { UsersPage } from '@/features/users/pages/UsersPage';
import { ProductsPage } from '@/features/products/pages/ProductsPage';
import { ProductPage } from '@/features/products/pages/ProductPage';
import { CreateProductPage } from '@/features/products/pages/CreateProductPage';

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

  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        path: '/',
        element: <OrdersPage />,
      },
      {
        path: '/orders/:id',
        element: <OrderDetailPage />,
      },
      {
        path: '/users',
        element: <UsersPage />,
      },
      {
        path: '/products',
        element: <ProductsPage />,
      },
      {
        path: '/products/create',
        element: <CreateProductPage />,
      },
      {
        path: '/products/:id',
        element: <ProductPage />,
      },
    ],
  },
]);
