import { useEffect, useState } from 'react';
import { ProductItem } from '../components/ProductItem';
import { getProducts } from '../api/getProducts';

export const ProductsPage = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            'An error occurred while fetching products',
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="max-w-md border border-red-200 bg-red-50 rounded-2xl p-4">
          <h2 className="text-red-600 font-semibold mb-1">
            Failed to load products
          </h2>

          <p className="text-red-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-wrap gap-4">
      {products && products.map((p) => <ProductItem product={p} key={p.id} />)}
    </div>
  );
};
