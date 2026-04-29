export const calculateOrderTotal = (
  productOrders,
) => {
  return productOrders.reduce(
    (total, product) => total + product.subtotal,
    0,
  );
};