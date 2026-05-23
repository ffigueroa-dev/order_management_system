import { PageDetailsHeader } from '@/components/layout/PageDetailsHeader';
import { useQuery } from '@/hooks/useQuery';
import { useParams } from 'react-router';
import { getClient } from '../api/getCLient';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { formatDate } from '@/utils/formatDate';
import { Button } from '@/components/ui/Button';
import { updateClient } from '../api/updateClient';
import { useState } from 'react';
import { UpdateClientModal } from '../components/UpdateClientModal';

export const ClientPage = () => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const openUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const onUpdateClient = async (values) => {
    console.log(values);
    alert('aaaaaaaaj');
    const updatedClient = await updateClient(id, values);
    setClient(updatedClient);
  };

  const { id } = useParams();
  const {
    error,
    data: client,
    isLoading,
    setData: setClient
  } = useQuery({ entity: 'CLient', queryFn: () => getClient(id) });
  const onEdit = openUpdateModal;
  const openDeleteModal = () => {};
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div className="p-6">
        <div className="max-w-md rounded-2xl border border-red-200 bg-red-50 p-4">
          <h2 className="mb-1 font-semibold text-red-600">
            Failed to load client
          </h2>

          <p className="text-sm text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!client) {
    return null;
  }
  return (
    <div>
      <PageDetailsHeader
        backTo="/clients"
        title={'Client'}
        description={`${client.firstName}  ${client.lastName}`}
      />
      <section className="px-6">
        <Card>
          <CardContent className="flex flex-col gap-4 pt-6">
            <div className="space-y-1">
              <h3 className="truncate text-lg font-semibold text-zinc-900">
                {client.firstName} {client.lastName}
              </h3>

              <p className="truncate text-sm text-zinc-500">{client.email}</p>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                Address
              </span>

              <p className="truncate text-sm text-zinc-700">
                {client.fullAddress}
              </p>
            </div>

            <div className="border-t pt-3 text-xs text-zinc-400">
              Created at {formatDate(client.createdAt)}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 sm:flex-row">
            <Button variant="primary" className="w-full" onClick={onEdit}>
              Edit Client
            </Button>

            <Button
              variant="danger"
              className="w-full"
              onClick={openDeleteModal}
            >
              Delete Client
            </Button>
          </CardFooter>
        </Card>
      </section>
      <UpdateClientModal client={client} isOpen={isUpdateModalOpen} onClose={closeUpdateModal} onSubmitClient={onUpdateClient}/>
    </div>
  );
};
