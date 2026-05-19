import { Badge } from '@/components/ui/Badge';
import { SectionCard } from './SectionCard';
import { ProductItem } from './ProductItem';
import { Package } from 'lucide-react';

export const ProductsSection = ({ products }) => {
  return (
    <SectionCard
      icon={Package}
      title="Products"
      headerRight={
        <Badge className="bg-zinc-100 text-zinc-600">
          {products.length} items
        </Badge>
      }
    >
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </SectionCard>
  );
};
