function placeOrder(productIds, productList) {

  const selectedProducts =
    productList.filter(product =>
      productIds.includes(product.id)
    );

  const totalAmount =
    selectedProducts.reduce(
      (total, item) => total + item.price,
      0
    );

  return {
    items: selectedProducts,
    totalAmount
  };
}

module.exports = placeOrder;