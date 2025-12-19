export const auth = {
  isAuthenticated() {
    return localStorage.getItem("auth") === "true";
  },

  login() {
    localStorage.setItem("auth", "true");
  },

  logout() {
    localStorage.removeItem("auth");
  },
};
