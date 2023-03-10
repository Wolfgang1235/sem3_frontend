import URL from "../settings";

const handleHttpErrors = async (res) => {
  if (!res.ok) {
    return await Promise.reject({ status: res.status, fullError: res.json() });
  }
  if (res.status === 204) {
    return;
  }
  console.log(res);
  return await res.json();
};

function apiFacade() {
  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };

  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  const setRoles = (roles) => {
    localStorage.setItem("roles", roles);
  };

  const getRoles = () => {
    console.log(localStorage.getItem("roles"));

    return localStorage.getItem("roles")
      ? localStorage.getItem("roles").split(",")
      : [];
  };

  const setUsername = (username) => {
    return localStorage.setItem("username", username);
  };

  const getUsername = () => {
    return localStorage.getItem("username");
  };

  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("roles");
    localStorage.removeItem("username");
  };

  const parseJwt = async (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const login = async (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });

    return await fetch(URL + "login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
        return parseJwt(res.token);
      })
      .then((response) => {
        setRoles(response.roles);
        setUsername(response.name);
        window.localStorage.setItem("isLoggedIn", true);
      });
  };

  const createUser = async (user, callback) => {
    const options = makeOptions("POST", true, user);
    return await fetch(URL + "users/", options)
      .then(handleHttpErrors)
      .then((data) => callback(data));
  };

  const putUser = async (user, userId, callback) => {
    const options = makeOptions("PUT", true, user);
    return await fetch(URL + "users/" + userId, options)
      .then(handleHttpErrors)
      .then((data) => callback(data));
  };

  const deleteUser = async (userId, callback) => {
    const options = makeOptions("DELETE", true);
    return await fetch(URL + "users/" + userId, options)
      .then(handleHttpErrors)
      .then(() => callback(userId));
  };

  const getUsers = async (callback) => {
    const options = makeOptions("GET", true);

    return await fetch(URL + "users/", options)
      .then(handleHttpErrors)
      .then((data) => callback(data));
  };

  const postRental = async (rental, callback) => {
    const options = makeOptions("POST", true, rental);

    return await fetch(URL + "users/rentals/", options)
    .then(handleHttpErrors)
    .then((data) => callback(data));
  };

  const getTenants = async (callback) => {
    const options = makeOptions("GET", true);

    return await fetch(URL + "tenants/", options)
    .then(handleHttpErrors)
    .then((data) => callback(data));
  };

  const getHouses = async (callback) => {
    const options = makeOptions("GET", true);

    return await fetch(URL + "houses/", options)
    .then(handleHttpErrors)
    .then((data) => callback(data));
  };

  const getRentals = async (callback) => {
    const options = makeOptions("GET", true);

    return await fetch(URL + "rentals/", options)
    .then(handleHttpErrors)
    .then((data) => callback(data));
  };

  const putRental = async (rental, rentalId, callback) => {
    const options = makeOptions("PUT", true, rental);

    return await fetch(URL + "users/rentals/" + rentalId, options)
    .then(handleHttpErrors)
    .then((data) => callback(data));
  };

  const deleteRental = async (rentalId, callback) => {
    const options = makeOptions("DELETE", true);

    return await fetch(URL + "users/rentals/" + rentalId, options)
    .then(handleHttpErrors)
    .then(() => callback(rentalId));
  };

  const getRentalsByUser = async (callback) => {
    const options = makeOptions("GET", true);

    return await fetch(URL + "users/user-rentals", options)
    .then(handleHttpErrors)
    .then((data) => callback(data));
  };

  const getTenantsByHouseId = async (houseId, callback) => {
    const options = makeOptions("GET", true);

    return await fetch(URL + "users/tenants/" + houseId, options)
    .then(handleHttpErrors)
    .then((data) => callback(data));
  }

  const fetchData = async () => {
    const options = makeOptions("GET", true);
    const roles = getRoles();

    if (roles.includes("admin")) {
      return await fetch(URL + "users/me", options).then(handleHttpErrors);
    }

    if (roles.includes("user")) {
      return await fetch(URL + "users/me", options).then(handleHttpErrors);
    }
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
      console.log(getToken());
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    getUsername,
    createUser,
    putUser,
    deleteUser,
    getRoles,
    getUsers,
    postRental,
    getHouses,
    getTenants,
    getRentals,
    putRental,
    deleteRental,
    getRentalsByUser,
    getTenantsByHouseId,
  };
}
const facade = apiFacade();
export default facade;
