import { useParams } from 'react-router';
import { DeliverySection } from '../components/DeliverySection';
import { OrderActions } from '../components/OrderAction';
import { OrderHeader } from '../components/OrderHeader';
import { OrderNotesSection } from '../components/OrderNotesSection';
import { ProductsSection } from '../components/ProductSection';
import { SummarySection } from '../components/SummarySection';
import { useEffect, useState } from 'react';
import { getOrder } from '../api/getOrder';

export const OrderDetailPage = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      const data = await getOrder(id);

      setOrder(data);

      setIsLoading(false);
    };
    getData();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order Not Found</div>;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4 pb-10">
      <OrderHeader order={order} />

      <OrderNotesSection notes={order.notes} />

      <DeliverySection client={order.client} />

      <ProductsSection products={order.products} />

      <SummarySection order={order} />

      <OrderActions />
    </div>
  );
};
