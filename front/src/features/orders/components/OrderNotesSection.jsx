import { Card, CardContent } from '@/components/ui/Card';
import { AlertTriangle } from 'lucide-react';

export const OrderNotesSection = ({ notes }) => {
  if (!notes) return null;

  return (
    <Card className="border-yellow-300 bg-yellow-50">
      <CardContent className="flex gap-3 pt-6">
        <AlertTriangle size={18} className="mt-0.5 text-yellow-600" />

        <div>
          <h3 className="font-medium text-yellow-800">Important Note</h3>

          <p className="mt-1 text-sm text-yellow-700">{notes}</p>
        </div>
      </CardContent>
    </Card>
  );
};
