export const buildProductOrders = (
  products,
  dbProducts,
) => {
  const productMap = new Map(
    dbProducts.map((product) => [product.id, product]),
  );
  
  return products.map((product) => {
    const dbProduct = productMap.get(
      product.productId,
    );

    const unitPrice = Number(dbProduct.price);

    const subtotal =
      unitPrice * product.quantity;

    return {
      productId: product.productId,
      quantity: product.quantity,
      unitPrice,
      subtotal,
    };
  });
};