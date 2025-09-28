// src/api/userApi.jsx


// Fetch all users
export async function fetchUsers() {
  const response = await fetch("http://127.0.0.1:8000/api/users/");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return await response.json();
}

// Create a new user
export async function createUser(userData) {
  const response = await fetch("http://127.0.0.1:8000/api/users/create/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Failed to create user");
  }
  return await response.json();
}

// Update an existing user
export async function updateUser(id, userData) {
  const response = await fetch(`http://127.0.0.1:8000/api/users/update/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Failed to update user");
  }
  return await response.json();
}

// Delete a user
export async function deleteUser(id) {
  const response = await fetch(`http://127.0.0.1:8000/api/users/delete/${id}/`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
  return true;
}
