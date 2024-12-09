import React from 'react';
import { Link } from 'react-router-dom';
import './NewBenefit.css';

const NewBenefit = () => {
  return (
    <div className="new-benefit-container">
      <h1>Crear Nuevo Beneficio</h1>
      <div className="button-group">
        <Link to="/new-loan" className="benefit-button loan-button">
          Nuevo Préstamo
        </Link>
        <Link to="/new-service" className="benefit-button service-button">
          Nuevo Servicio
        </Link>
      </div>
    </div>
  );
};

export default NewBenefit;
