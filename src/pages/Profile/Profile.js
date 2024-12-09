import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'Andrea López',
    email: 'user@example.com',
    password: 'password',
    dpi: '987654321',
    photo: 'https://via.placeholder.com/150', // Default photo URL
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedUser(user); // Reset edited data when toggling
  };

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h1>Perfil</h1>
      <div className="profile-card">
        <img
          src={user.photo}
          alt={`Foto de ${user.name}`}
          className="profile-photo"
        />
        {isEditing ? (
          <div>
            <label>
              URL de la Foto:
              <input
                type="text"
                value={editedUser.photo}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, photo: e.target.value })
                }
              />
            </label>
            <label>
              Nombre:
              <input
                type="text"
                value={editedUser.name}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, name: e.target.value })
                }
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={editedUser.email}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, email: e.target.value })
                }
              />
            </label>
            <label>
              Contraseña:
              <input
                type="password"
                value={editedUser.password}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, password: e.target.value })
                }
              />
            </label>
            <label>
              DPI:
              <input
                type="text"
                value={editedUser.dpi}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, dpi: e.target.value })
                }
              />
            </label>
            <button onClick={handleSave}>Guardar Cambios</button>
            <button onClick={handleEditToggle}>Cancelar</button>
          </div>
        ) : (
          <div>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Contraseña:</strong> {user.password}</p>
            <p><strong>DPI:</strong> {user.dpi}</p>
            <button onClick={handleEditToggle}>Editar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
