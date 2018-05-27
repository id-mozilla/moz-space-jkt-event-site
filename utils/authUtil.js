import Cookie from "js-cookie";

export const setToken = token => {
  if (process.isServer) {
    return;
  }

  window.localStorage.setItem("token", token);
  Cookie.set("jwt", token);
};

export const unsetToken = () => {
  if (process.isServer) {
    return;
  }
  window.localStorage.removeItem("token");
  Cookie.remove("jwt");
};

export default {
  setToken,
  unsetToken
}