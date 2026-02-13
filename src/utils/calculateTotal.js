export const calculateCartTotal = (cart = []) => {
  return cart.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );
};
