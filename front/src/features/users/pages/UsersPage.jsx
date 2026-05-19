import { useEffect, useState } from 'react';
import { getUsers } from '../api/getUsers';
import { UserCard } from '../components/UserCard';

export const UsersPage = () => {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);

        const data = await getUsers();

        setUsers(data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            'An error occurred while fetching users',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="max-w-md border border-red-200 bg-red-50 rounded-2xl p-4">
          <h2 className="text-red-600 font-semibold mb-1">
            Failed to load users
          </h2>

          <p className="text-red-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }
  console.log(users);

  return (
    <div className="p-6 flex flex-wrap gap-4">
      {users && users.map((u) => <UserCard key={u.id} user={u} />)}
    </div>
  );
};
