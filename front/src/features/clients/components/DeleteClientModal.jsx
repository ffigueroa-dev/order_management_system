// features/products/components/DeleteProductModal.jsx

import { Button } from '@/components/ui/Button';

import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/ui/Modal';

export const DeleteClientModal = ({
  client,
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title="Delete Client"
        onClose={onClose}
      />

      <ModalContent>
        <div className="space-y-3">
          <p className="text-sm text-zinc-600">
            Are you sure you want to delete this
            client?
          </p>

          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="font-medium text-red-700">
              {client?.firstName} {client?.lastName}
            </p>

            <p className="mt-1 text-sm text-red-600">
              This action cannot be undone.
            </p>
          </div>
        </div>
      </ModalContent>

      <ModalFooter>
        <Button
          variant="secondary"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>

        <Button
          variant="danger"
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading
            ? 'Deleting...'
            : 'Delete Client'}
        </Button>
      </ModalFooter>
    </Modal>
  );
};