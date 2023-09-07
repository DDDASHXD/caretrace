export const setUser = (user) => {
  /*const user = {
    username: username,
    password: password,
    valid: true,
  };*/
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearUser = () => {
  localStorage.removeItem("user");
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
