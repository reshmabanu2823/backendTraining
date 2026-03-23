const users = require("../data/users");

function loginUser(userId) {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      const user = users.find(u => u.id === userId);

      if (user && user.isLoggedIn)
        resolve(user);
      else
        reject("User not logged in");

    }, 1000);

  });
}

module.exports = loginUser;