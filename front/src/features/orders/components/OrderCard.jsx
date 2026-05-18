import { Badge } from '@/components/ui/Badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/Card';

export const OrderCard = ({ order }) => {
  const formattedDate = new Date(order.createdAt).toLocaleDateString(
    'es-AR',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
  );

  return (
    <Card className='w-full max-w-md'>
      <CardHeader className='flex items-start justify-between border-b border-zinc-200'>
        <div>
          <p className='text-sm text-zinc-400'>Orden</p>

          <h2 className='text-2xl font-bold text-zinc-800'>
            #{order.id.slice(0, 8).toUpperCase()}
          </h2>
        </div>

        <Badge
          className='bg-violet-100 text-violet-700'
          style={{
            backgroundColor: `${order.status.color}20`,
            color: order.status.color,
          }}
        >
          <div
            className='w-2 h-2 rounded-full'
            style={{ backgroundColor: order.status.color }}
          />

          {order.status.label}
        </Badge>
      </CardHeader>

      <CardContent className='space-y-6 pt-6'>
        <section>
          <p className='text-sm text-zinc-400 mb-1'>Cliente</p>

          <h3 className='text-2xl font-semibold text-zinc-900'>
            {order.client.firstName} {order.client.lastName}
          </h3>

          <p className='text-zinc-500'>{order.client.email}</p>
        </section>

        <section>
          <p className='text-sm text-zinc-400 mb-1'>Direccion</p>

          <p className='text-xl text-zinc-800'>
            {order.client.fullAddress}
          </p>
        </section>

        {order.notes && (
          <section className='bg-amber-50 border border-amber-200 rounded-xl p-4'>
            <p className='text-sm text-amber-500 mb-2'>Notas</p>

            <p className='text-amber-800'>{order.notes}</p>
          </section>
        )}

        <section className='grid grid-cols-2 gap-4'>
          <div>
            <p className='text-sm text-zinc-400 mb-1'>Repartidor</p>

            <p className='font-semibold text-zinc-800'>
              {order.user.firstName} {order.user.lastName}
            </p>
          </div>

          <div>
            <p className='text-sm text-zinc-400 mb-1'>Tipo</p>

            <p className='font-semibold text-zinc-800 capitalize'>
              {order.user.type}
            </p>
          </div>

          <div className='col-span-2'>
            <p className='text-sm text-zinc-400 mb-1'>Fecha</p>

            <p className='font-semibold text-zinc-800'>
              {formattedDate}
            </p>
          </div>
        </section>
      </CardContent>

      <CardFooter className='flex items-center justify-between'>
        <p className='text-zinc-400 text-lg'>Total</p>

        <p className='text-4xl font-bold text-zinc-900'>
          ${Number(order.total).toFixed(2)}
        </p>
      </CardFooter>
    </Card>
  );
};