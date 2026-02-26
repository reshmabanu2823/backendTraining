// Variables
let storeName = "Tech Store";

const products = [
  { name: "Laptop", price: 50000 },
  { name: "Mouse", price: 500 },
  { name: "Keyboard", price: 1500 },
  { name: "Monitor", price: 12000 }
];

// Arrow Function
const showStore = () => {
  console.log("Welcome to", storeName);
};

showStore();

// map → increase price with GST
const updatedPrices = products.map(product => {
  return {
    name: product.name,
    price: product.price * 1.18
  };
});

console.log(updatedPrices);

// filter expensive products
const expensiveProducts = products.filter(
  product => product.price > 2000
);

console.log(expensiveProducts);

// reduce → total store value
const totalValue = products.reduce(
  (total, product) => total + product.price,
  0
);

console.log("Total Store Value:", totalValue);