import { MapPinned, Send } from 'lucide-react';
import { SectionCard } from './SectionCard';
// import { Button } from '@/components/ui/Button';

export const DeliverySection = ({ client }) => {
  return (
    <SectionCard icon={MapPinned} title="Delivery Information">
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-zinc-900">
            {client.firstName} {client.lastName}
          </h3>

          <p className="text-sm text-zinc-500">{client.email}</p>
        </div>

        <div className="border-t border-zinc-100 pt-4">
          <div className="flex items-start gap-3">
            <MapPinned size={18} className="mt-0.5 text-zinc-500" />

            <div>
              <h4 className="font-medium text-zinc-900">Delivery Address</h4>

              <p className="text-sm text-zinc-500">{client.fullAddress}</p>
            </div>
          </div>
        </div>

        {/* <Button className="w-full gap-2">
          <Send size={16} />
          Navigate
        </Button> */}
      </div>
    </SectionCard>
  );
};
