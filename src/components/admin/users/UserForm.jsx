import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UserForm({ onUserSaved, editingUser }) {
  const [formData, setFormData] = useState({
    id: null,
    username: "",
    email: "",
    password: "",
    is_superuser: false,
  });

  useEffect(() => {
    if (editingUser) {
      setFormData({
        id: editingUser.id,
        username: editingUser.username,
        email: editingUser.email,
        password: "",
        is_superuser: editingUser.is_superuser,
      });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await axios.put(`http://127.0.0.1:8000/api/users/${formData.id}/`, formData);
      } else {
        await axios.post("http://127.0.0.1:8000/api/users/", formData);
      }
      setFormData({ id: null, username: "", email: "", password: "", is_superuser: false });
      onUserSaved();
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  return (
    <div className="userform-container">
      <h2>{formData.id ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit} className="userform">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>

        <div className="form-group">
          <label>Password {formData.id ? "(leave blank to keep unchanged)" : ""}</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            {...(formData.id ? {} : { required: true })}
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="is_superuser"
              checked={formData.is_superuser}
              onChange={handleChange}
            />
            Superuser
          </label>
        </div>

        <button type="submit">{formData.id ? "Update User" : "Add User"}</button>
      </form>

      {/* Embedded CSS */}
      <style>{`
        .userform-container {
          max-width: 500px;
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

        .userform {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .form-group input[type="text"],
        .form-group input[type="email"],
        .form-group input[type="password"] {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
        }

        .checkbox-group {
          flex-direction: row;
          align-items: center;
        }

        .userform button {
          padding: 10px;
          background: #007bff;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 10px;
        }

        .userform button:hover {
          background: #0056b3;
        }
      `}</style>
    </div>
  );
}
