import React from 'react';
import './LogoutConfirmation.css';

const LogoutConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <div className="logout-confirmation-container">
      <div className="logout-prompt">
        <h2>¿Estás seguro que quieres cerrar tu sesión?</h2>
        <p>
          Es posible que tengas que volver a ingresar tu usuario y contraseña para volver a iniciar sesión.
        </p>
        <div className="logout-buttons">
          <button className="cancel-button" onClick={onCancel}>
            Regresar
          </button>
          <button className="logout-button" onClick={onConfirm}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation;
