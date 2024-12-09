import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { serviceTransactions } from '../../mockData/transactions'; // Import the named export
import { transactionCategories } from '../../mockData/categories'; // Import transaction categories
import './ServiceDetails.css';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { services, setServices } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedService, setEditedService] = useState(null);

  const service = services.find((s) => s.id === id);

  if (!service) {
    return <p>El servicio no existe.</p>;
  }

  // Filter transactions for the current service
  const transactions = serviceTransactions.filter(
    (transaction) => transaction.serviceId === parseInt(id, 10) // Ensure type match
  );

  // Helper function to find the category for a transaction type
  const findTransactionCategory = (type) =>
    transactionCategories.find((category) => category.id === type);

  const handleDelete = () => {
    const updatedServices = services.filter((s) => s.id !== id);
    setServices(updatedServices);
    navigate('/dashboard'); // Redirect to dashboard after deletion
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedService({ ...service });
  };

  const handleSave = () => {
    const updatedServices = services.map((s) =>
      s.id === id ? editedService : s
    );
    setServices(updatedServices);
    setIsEditing(false);
  };

  return (
    <div className="service-details-container">
      <h1>Detalles del Servicio</h1>
      {isEditing ? (
        <div>
          <label>
            Nombre:
            <input
              type="text"
              value={editedService.name}
              onChange={(e) =>
                setEditedService({ ...editedService, name: e.target.value })
              }
            />
          </label>
          <label>
            Costo:
            <input
              type="number"
              value={editedService.cost}
              onChange={(e) =>
                setEditedService({ ...editedService, cost: e.target.value })
              }
            />
          </label>
          <button onClick={handleSave}>Guardar Cambios</button>
        </div>
      ) : (
        <>
          <p><strong>Nombre:</strong> {service.name}</p>
          <p><strong>Costo:</strong> ${service.cost.toFixed(2)}</p>
          <p><strong>Descripción:</strong> {service.description}</p>
          <button onClick={handleEdit}>Editar</button>
        </>
      )}
      <button onClick={handleDelete} style={{ color: 'red' }}>
        Eliminar
      </button>
      <h2>Transacciones</h2>
      {transactions.length > 0 ? (
        <ul className="transaction-list">
          {transactions.map((transaction) => {
            const category = findTransactionCategory(transaction.type); // Get transaction category
            return (
              <li key={transaction.id} className="transaction-item">
                {category?.iconUrl && (
                  <img
                    src={category.iconUrl}
                    alt={category.name}
                    className="transaction-icon"
                  />
                )}
                <p><strong>Fecha:</strong> {transaction.date}</p>
                <p><strong>Monto:</strong> ${transaction.amount.toFixed(2)}</p>
                <p><strong>Descripción:</strong> {transaction.description}</p>
                <p><strong>Tipo:</strong> {category?.name || 'Sin Categoría'}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No hay transacciones para este servicio.</p>
      )}
    </div>
  );
};

export default ServiceDetails;
