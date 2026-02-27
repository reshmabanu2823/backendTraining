const products = require("../data/products");

function getProducts() {
  return new Promise(resolve => {

    setTimeout(() => {
      resolve(products);
    }, 1000);

  });
}

module.exports = getProducts;