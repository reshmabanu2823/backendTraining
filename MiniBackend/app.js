const loginUser = require("./services/authService");
const getProducts = require("./services/productService");
const placeOrder = require("./services/orderService");

async function orderController() {

  try {

    const user = await loginUser(1);
    console.log("Logged in:", user.name);

    const productList = await getProducts();

    const order = placeOrder([1,3], productList);

    const { items, totalAmount } = order;

    const finalOrder = {
      user: user.name,
      ...order,
      status: "Order Placed"
    };

    console.log(finalOrder);

  } catch (error) {
    console.log(error);
  }

}

orderController();