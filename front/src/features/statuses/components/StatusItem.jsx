import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

import { Edit2, Trash2 } from 'lucide-react';

import { Link } from 'react-router';
import { useModal } from '@/hooks/useModal';
import { DeleteStatusModal } from './DeleteStatusModal';
import { useState } from 'react';
import { deleteStatus } from '../api/deleteStatus';
import { UpdateStatusModal } from './UpdateStatusModal';
import { updateStatus } from '../api/updateStatus';

export const StatusItem = ({ status, refetch }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteModal = useModal();
  const updateModal = useModal();

  const openDeleteModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    deleteModal.open();
  };
  const openUpdateModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateModal.open();
  };

  const onDeleteConfirm = async () => {
    try {
      setIsDeleting(true);

      await deleteStatus(status.id);
      refetch();

      deleteModal.close();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const onUpdateStatus = async (data) => {
    await updateStatus(status.id, data);
    refetch();
  };

  return (
    <>
      <Link to={`/statuses/${status.id}`}>
        <Card className="group overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md">
          <CardContent className={'p-4 space-y-2'}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className="h-4 w-4 flex-shrink-0 rounded-full border border-black/10 shadow-sm"
                  style={{
                    backgroundColor: status.color,
                  }}
                />

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-zinc-900">
                    {status.label}
                  </h3>

                  <p className="text-xs text-zinc-500">Status color</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div
                  className="h-10 w-1 rounded-full transition-transform group-hover:scale-y-110"
                  style={{
                    backgroundColor: status.color,
                  }}
                />
              </div>
            </div>
            <div className="flex w-full gap-2 pt-2">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={openUpdateModal}
              >
                <Edit2 size={16} />
              </Button>

              <Button
                variant="danger"
                className="flex-1"
                onClick={openDeleteModal}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </Link>
      <DeleteStatusModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={onDeleteConfirm}
        status={status}
        isLoading={isDeleting}
      />
      <UpdateStatusModal
        isOpen={updateModal.isOpen}
        onClose={updateModal.close}
        status={status}
        onUpdateStatus={onUpdateStatus}
      />
    </>
  );
};
