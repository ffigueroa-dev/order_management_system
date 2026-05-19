import { Card, CardContent, CardHeader } from '@/components/ui/Card';

export const SectionCard = ({ icon: Icon, title, children, headerRight }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <Icon size={18} />

          <h2 className="font-semibold text-zinc-900">{title}</h2>
        </div>

        {headerRight}
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
};
