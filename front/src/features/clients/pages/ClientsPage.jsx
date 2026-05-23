import { useNavigate } from 'react-router';

import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { useQuery } from '@/hooks/useQuery';
import { getClients } from '../api/getClients';
import { ClientItem } from '../components/ClientItem';

export const ClientsPage = () => {
  const {
    data: clients,
    isLoading,
    error,
  } = useQuery({ entity: 'Clients', queryFn: getClients });
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="max-w-md border border-red-200 bg-red-50 rounded-2xl p-4">
          <h2 className="text-red-600 font-semibold mb-1">
            Failed to load products
          </h2>

          <p className="text-red-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Clients"
        description="Manage your clients"
        actions={
          <Button onClick={() => navigate('/clients/create')}>
            <Plus size={18} />
            Create Client
          </Button>
        }
      />

      <div className="p-6 flex flex-wrap gap-4">
        {clients && clients.map((c) => <ClientItem client={c} key={c.id} />)}
      </div>
    </div>
  );
};
