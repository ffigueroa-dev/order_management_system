import { getUsers } from '../api/getUsers';
import { UserCard } from '../components/UserCard';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useQuery } from '@/hooks/useQuery';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

export const UsersPage = () => {
  const navigate = useNavigate();

  const {
    data: users,
    error,
    isLoading,
  } = useQuery({ entity: 'Users', queryFn: getUsers });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage message={error} title="Failed to load users" />;
  }

  return (
    <>
      <PageHeader
        title="Users"
        description="Manage your users"
        actions={
          <Button onClick={() => navigate('/users/create')}>
            <Plus size={18} />
            Create User
          </Button>
        }
      />
      <div className="p-6 flex flex-wrap gap-4">
        {users && users.map((u) => <UserCard key={u.id} user={u} />)}
      </div>
    </>
  );
};
