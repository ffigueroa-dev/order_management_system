import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { getProduct } from '../api/getProduct';

import { DeleteProductModal } from '../components/DeleteProductModal';

import { Button } from '@/components/ui/Button';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/Card';

import { formatDate } from '@/utils/formatDate';

import { formatCurrency } from '@/utils/formatCurrency';

import { ProductHeader } from '../components/ProductHeader';
import { deleteProduct } from '../api/deleteProduct';

export const ProductPage = () => {
  const [product, setProduct] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const onEdit = () => {};

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const onDeleteConfirm = async () => {
    try {
      setIsDeleting(true);

      await deleteProduct(id);
      navigate('/products');

      closeDeleteModal();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProduct(id);

        setProduct(product);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            'An error occurred while fetching product',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex w-full justify-center p-6">
        <div>Loading product...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="max-w-md rounded-2xl border border-red-200 bg-red-50 p-4">
          <h2 className="mb-1 font-semibold text-red-600">
            Failed to load product
          </h2>

          <p className="text-sm text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <>
      <section className="flex w-full flex-col items-center justify-center p-6">
        <ProductHeader product={product} />

        <Card className="w-full max-w-2xl">
          <CardHeader className="space-y-2">
            <h1 className="truncate text-3xl font-bold text-zinc-900">
              {product.name}
            </h1>

            <p className="break-words text-zinc-600">{product.description}</p>
          </CardHeader>

          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-sm text-zinc-500">Price</span>

              <span className="text-4xl font-bold text-zinc-900">
                {formatCurrency(product.price)}
              </span>
            </div>

            <div className="grid gap-4 text-sm text-zinc-500 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <span className="font-medium text-zinc-700">Created At</span>

                <span>{formatDate(product.createdAt)}</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-medium text-zinc-700">Updated At</span>

                <span>{formatDate(product.updatedAt)}</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 sm:flex-row">
            <Button variant="primary" className="w-full" onClick={onEdit}>
              Edit Product
            </Button>

            <Button
              variant="danger"
              className="w-full"
              onClick={openDeleteModal}
            >
              Delete Product
            </Button>
          </CardFooter>
        </Card>
      </section>

      <DeleteProductModal
        product={product}
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={onDeleteConfirm}
        isLoading={isDeleting}
      />
    </>
  );
};
