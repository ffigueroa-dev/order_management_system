import { PageDetailsHeader } from '@/components/layout/PageDetailsHeader';
import { useQuery } from '@/hooks/useQuery';
import { useNavigate, useParams } from 'react-router';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { formatDate } from '@/utils/formatDate';
import { Button } from '@/components/ui/Button';
import { getUser } from '../api/getUser';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Spinner } from '@/components/ui/Spinner';
import { useModal } from '@/hooks/useModal';
import { DeleteUserModal } from '../components/DeleteUserModal';
import { deleteUser } from '../api/deleteUser';
import { useState } from 'react';
import { updateUser } from '../api/updateUser';
import { UpdateUserModal } from '../components/UpdateUserModal';

export const UserPage = () => {
  const { id } = useParams();
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const deleteModal = useModal();
  const updateModal = useModal();
  const {
    error,
    data: user,
    isLoading,
    setData: setUser,
  } = useQuery({ entity: 'User', queryFn: () => getUser(id) });

  const onDeleteUser = async () => {
    try {
      setIsDeleting(true);

      await deleteUser(user.id);
      deleteModal.close();
      navigate('/users');
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const onUpdateUser = async (values) => {
    const updatedUser = await updateUser(id, values);
    setUser(updatedUser);
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <ErrorMessage title="Failed to load user" message={error} />;
  }

  if (!user) {
    return null;
  }
  return (
    <div>
      <PageDetailsHeader
        backTo="/users"
        title={'User'}
        description={`${user.firstName}  ${user.lastName}`}
      />
      <section className="px-6">
        <Card>
          <CardContent className="flex flex-col gap-4 pt-6">
            <div className="space-y-1">
              <h3 className="truncate text-lg font-semibold text-zinc-900">
                {user.firstName} {user.lastName}
              </h3>

              <p className="truncate text-sm text-zinc-500">{user.email}</p>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                Type
              </span>

              <p className="truncate text-sm text-zinc-700">{user.type}</p>
            </div>

            <div className="border-t pt-3 text-xs text-zinc-400">
              Created at {formatDate(user.createdAt)}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="primary"
              className="w-full"
              onClick={updateModal.open}
            >
              Edit User
            </Button>

            <Button
              variant="danger"
              className="w-full"
              onClick={deleteModal.open}
            >
              Delete User
            </Button>
          </CardFooter>
        </Card>
      </section>
      <DeleteUserModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        user={user}
        isLoading={isDeleting}
        onConfirm={onDeleteUser}
      />
      <UpdateUserModal
        isOpen={updateModal.isOpen}
        onClose={updateModal.close}
        onSubmitUser={onUpdateUser}
        user={user}
      />
    </div>
  );
};
