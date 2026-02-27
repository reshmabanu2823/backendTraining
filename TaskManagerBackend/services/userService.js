const users = require("../data/users");

function authenticateUser(userId) {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      const user = users.find(u => u.id === userId);

      if (user && user.loggedIn)
        resolve(user);
      else
        reject("Authentication Failed");

    }, 1000);

  });
}

module.exports = authenticateUser;