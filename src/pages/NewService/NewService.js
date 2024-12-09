import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './NewService.css';

const NewService = () => {
  const [serviceName, setServiceName] = useState('');
  const [serviceCost, setServiceCost] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [newServiceId, setNewServiceId] = useState(null);
  const { addService } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!serviceName || !serviceCost) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const newService = {
      id: Math.floor(Math.random() * 1000).toString(),
      name: serviceName,
      cost: serviceCost,
      description: `Descripción de ${serviceName}`,
    };

    addService(newService); // Add service to global state
    setNewServiceId(newService.id);

    setSuccessMessage(`¡El servicio "${serviceName}" ha sido agregado con un costo de $${serviceCost}!`);
    setServiceName('');
    setServiceCost('');
  };

  return (
    <div className="new-service-container">
      <h1>Nuevo Servicio</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="service-name">Nombre del Servicio</label>
          <input
            type="text"
            id="service-name"
            placeholder="Ingrese el nombre del servicio"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="service-cost">Costo del Servicio</label>
          <input
            type="number"
            id="service-cost"
            placeholder="Ingrese el costo del servicio"
            value={serviceCost}
            onChange={(e) => setServiceCost(e.target.value)}
          />
        </div>
        <button type="submit" className="primary-button">Agregar Servicio</button>
      </form>

      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
          <p>
            <Link to={`/service-details/${newServiceId}`}>Ver Detalles del Servicio</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default NewService;
