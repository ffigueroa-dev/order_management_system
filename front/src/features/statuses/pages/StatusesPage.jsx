import { useQuery } from '@/hooks/useQuery';
import { getStatuses } from '../api/getStatuses';
import { StatusItem } from '../components/StatusItem';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

export const StatusesPage = () => {
  const { data, error, isLoading } = useQuery({
    entity: 'statuses',
    queryFn: getStatuses,
  });
  if (isLoading) {
    return <Spinner/>;
  }
  if (error) {
    return <ErrorMessage title='Failed to load Statuses' message={error}/>;
  }
  return (
    <div className="flex gap-4 p-6 flex-wrap">
      {data.map((s) => (
        <StatusItem key={s.id} status={s} />
      ))}
    </div>
  );
};
