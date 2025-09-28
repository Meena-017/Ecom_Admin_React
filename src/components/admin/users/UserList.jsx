// src/components/admin/users/UserList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ username: "", email: "", is_superuser: false });

  // Fetch users from backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/users/");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/${id}/`);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // Open edit modal
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      is_superuser: user.is_superuser,
    });
  };

  // Update user
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/users/${editingUser.id}/`, formData);
      fetchUsers();
      setEditingUser(null);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <div className="userlist-container">
      <h2>User List</h2>
      <table className="userlist-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.is_superuser ? "Superuser" : "Normal User"}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-users">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editingUser && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit User</h3>
            <form onSubmit={handleUpdate}>
              <label>Username:</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
              <label>Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <label>
                <input
                  type="checkbox"
                  checked={formData.is_superuser}
                  onChange={(e) => setFormData({ ...formData, is_superuser: e.target.checked })}
                />{" "}
                Superuser
              </label>
              <div className="modal-buttons">
                <button type="submit">Update</button>
                <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Embedded CSS */}
      <style>{`
        .userlist-container {
          max-width: 900px;
          margin: 20px auto;
          padding: 20px;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border-radius: 8px;
          font-family: sans-serif;
        }

        h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        .userlist-table {
          width: 100%;
          border-collapse: collapse;
        }

        .userlist-table th, .userlist-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: center;
        }

        .userlist-table th {
          background: #f4f4f4;
          font-weight: bold;
        }

        .userlist-table tr:nth-child(even) {
          background: #fafafa;
        }

        .userlist-table tr:hover {
          background: #f1f1f1;
        }

        .edit-btn {
          background: #ffc107;
          border: none;
          color: #fff;
          padding: 5px 10px;
          margin-right: 5px;
          border-radius: 4px;
          cursor: pointer;
        }

        .edit-btn:hover { background: #e0a800; }

        .delete-btn {
          background: #dc3545;
          border: none;
          color: #fff;
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
        }

        .delete-btn:hover { background: #b02a37; }

        .no-users { font-style: italic; color: #888; }

        /* Modal styling */
        .modal {
          position: fixed;
          top: 0; left: 0; right:0; bottom:0;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          width: 400px;
          max-width: 90%;
        }

        .modal-content h3 {
          margin-top: 0;
        }

        .modal-content form {
          display: flex;
          flex-direction: column;
        }

        .modal-content label {
          margin: 10px 0 5px;
        }

        .modal-content input[type="text"],
        .modal-content input[type="email"] {
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }

        .modal-buttons {
          margin-top: 15px;
          display: flex;
          justify-content: flex-end;
        }

        .modal-buttons button {
          margin-left: 10px;
          padding: 8px 12px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
        }

        .modal-buttons button[type="submit"] {
          background: #28a745;
          color: #fff;
        }

        .modal-buttons button[type="button"] {
          background: #6c757d;
          color: #fff;
        }
      `}</style>
    </div>
  );
}
