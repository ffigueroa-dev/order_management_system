import { getOrders } from '../api/getOrders';
import { OrderCard } from '../components/OrderCard';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useQuery } from '@/hooks/useQuery';

export const OrdersPage = () => {
  const navigate = useNavigate();
  const {
    error,
    isLoading,
    data: orders,
  } = useQuery({ entity: 'Orders', queryFn: getOrders });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage title="Failed to load orders" message={error} />;
  }

  if (orders.length === 0) {
    return (
      <div className="p-6">
        <div className="max-w-md border border-zinc-200 bg-white rounded-2xl p-4">
          <h2 className="font-semibold text-zinc-800 mb-1">No orders found</h2>

          <p className="text-zinc-500 text-sm">
            There are currently no registered orders.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="Orders"
        description="Manage your orders"
        actions={
          <Button onClick={() => navigate('/orders/create')}>
            <Plus size={18} />
            Create Order
          </Button>
        }
      />

      <div className="p-6 flex flex-wrap gap-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </>
  );
};
