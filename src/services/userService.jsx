// src/services/userService.jsx
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../api/userApi";

// Get all users
export const getAllUsers = async () => {
  return await fetchUsers();
};

// Add a new user
export const addUser = async (userData) => {
  return await createUser(userData);
};

// Edit user
export const editUser = async (id, userData) => {
  return await updateUser(id, userData);
};

// Delete user
export const removeUser = async (id) => {
  return await deleteUser(id);
};
