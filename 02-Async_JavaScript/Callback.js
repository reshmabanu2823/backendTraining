function orderFood(callback) {
  console.log("Ordering food...");

  setTimeout(() => {
    callback("Food Delivered");
  }, 2000);
}

orderFood((message) => {
  console.log(message);
});