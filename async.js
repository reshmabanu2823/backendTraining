// Simulating Backend Operations

function loginUser() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("User Logged In");
    }, 1000);
  });
}

function fetchProfile() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Profile Data");
    }, 1500);
  });
}

function fetchPosts() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("User Posts");
    }, 2000);
  });
}

// Async Controller (like backend route)
async function userDashboard() {

  const login = await loginUser();
  console.log(login);

  const profile = await fetchProfile();
  console.log(profile);

  const posts = await fetchPosts();
  console.log(posts);

}

userDashboard();