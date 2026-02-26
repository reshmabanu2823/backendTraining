function orderFood() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Food Delivered");
    }, 2000);
  });
}

orderFood()
  .then(msg => console.log(msg));