import { useQuery } from '@/hooks/useQuery';
import { getStatuses } from '../api/getStatuses';
import { StatusItem } from '../components/StatusItem';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { CreateStatusModal } from '../components/CreateStatusModal';
import { useModal } from '@/hooks/useModal';
import { createStatus } from '../api/createStatus';

export const StatusesPage = () => {
  const { data, error, isLoading, refetch } = useQuery({
    entity: 'statuses',
    queryFn: getStatuses,
  });

  const createModal = useModal();
  
  const onCreateProduct = async (data) => {
    await createStatus(data);
    refetch();
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <ErrorMessage title="Failed to load Statuses" message={error} />;
  }
  return (
    <>
      <PageHeader
        title="Products"
        description="Manage your products"
        actions={
          <Button onClick={createModal.open}>
            <Plus size={18} />
            Create Status
          </Button>
        }
      />
      <div className="flex gap-4 p-6 flex-wrap">
        {data.map((s) => (
          <StatusItem key={s.id} status={s} refetch={refetch}/>
        ))}
      </div>
      <CreateStatusModal
        isOpen={createModal.isOpen}
        onClose={createModal.close}
        onCreateProduct={onCreateProduct}
      />
    </>
  );
};
