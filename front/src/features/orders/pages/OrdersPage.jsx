import { useEffect, useState } from 'react';

import { getOrders } from '../api/getOrders';
import { OrderCard } from '../components/OrderCard';

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const data = await getOrders();

        setOrders(data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            'An error occurred while fetching orders',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-zinc-500">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="max-w-md border border-red-200 bg-red-50 rounded-2xl p-4">
          <h2 className="text-red-600 font-semibold mb-1">
            Failed to load orders
          </h2>

          <p className="text-red-500 text-sm">{error}</p>
        </div>
      </div>
    );
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
    <div className="p-6 flex flex-wrap gap-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};
