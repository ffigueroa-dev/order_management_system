import { Button } from '@/components/ui/Button';

import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/ui/Modal';

export const DeleteStatusModal = ({
  status,
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader title="Delete Status" onClose={onClose} />

      <ModalContent>
        <div className="space-y-3">
          <p className="text-sm text-zinc-600">
            Are you sure you want to delete this status?
          </p>

          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <div className="flex gap-4 items-center">
              <div
                className="h-4 w-4 flex-shrink-0 rounded-full border border-black/10 shadow-sm"
                style={{
                  backgroundColor: status.color,
                }}
              />
              <p className="font-medium text-red-700">{status?.label}</p>
            </div>

            <p className="mt-1 text-sm text-red-600">
              This action cannot be undone.
            </p>
          </div>
        </div>
      </ModalContent>

      <ModalFooter>
        <Button variant="secondary" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>

        <Button variant="danger" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? 'Deleting...' : 'Delete Status'}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
