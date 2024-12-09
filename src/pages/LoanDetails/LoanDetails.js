import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loanTransactions } from '../../mockData/transactions'; // Import the named export
import { transactionCategories } from '../../mockData/categories'; // Import transaction categories
import './LoanDetails.css';

const LoanDetails = () => {
  const { id } = useParams(); // Get loan ID from the URL
  const { loans } = useAuth();

  const loan = loans.find((loan) => loan.id === id);

  if (!loan) {
    return <p>El préstamo no existe.</p>;
  }

  // Filter transactions for the current loan
  const transactions = loanTransactions.filter(
    (transaction) => transaction.loanId === parseInt(id, 10) // Ensure type match
  );

  // Helper function to find the category for a transaction type
  const findTransactionCategory = (type) =>
    transactionCategories.find((category) => category.id === type);

  return (
    <div className="loan-details-container">
      <h1>Detalles del Préstamo</h1>
      <p><strong>Nombre:</strong> {loan.name}</p>
      <p><strong>Monto:</strong> ${loan.amount.toFixed(2)}</p>
      <p><strong>Plazo:</strong> {loan.term} meses</p>
      <p><strong>Estado:</strong> {loan.status}</p>
      <p><strong>Fecha de Inicio:</strong> {loan.startDate}</p>
      <p><strong>Tasa de Interés:</strong> {loan.interestRate}%</p>
      <p><strong>Descripción:</strong> Este es un detalle de ejemplo para el préstamo {loan.name}.</p>
      
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
                <p><strong>Tipo:</strong> {category?.name || 'Sin Categoría'}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No hay transacciones disponibles para este préstamo.</p>
      )}
    </div>
  );
};

export default LoanDetails;
