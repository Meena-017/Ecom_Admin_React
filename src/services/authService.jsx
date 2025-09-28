import api from "../api/api";

export const login = async (email, password) => {
  const res = await api.post("login/", { email, password });
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const signup = async (name, email, password) => {
  return api.post("signup/", { name, email, password });
};

export const logout = () => {
  localStorage.removeItem("token");
};
