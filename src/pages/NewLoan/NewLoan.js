import React, { useState } from 'react';
import './NewLoan.css';

const NewLoan = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = (e) => {
    e.preventDefault();

    if (!loanAmount || !loanTerm) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    if (loanAmount <= 0 || loanTerm <= 0) {
      setError('El monto del préstamo y el plazo deben ser mayores a 0.');
      return;
    }

    setError('');
    const interestRate = 0.05; // Example interest rate
    const payment = (loanAmount * (1 + interestRate)) / loanTerm;
    setMonthlyPayment(payment.toFixed(2));
  };

  return (
    <div className="new-loan-container">
      <h1>Nuevo Préstamo</h1>
      <form onSubmit={handleCalculate}>
        <div className="form-group">
          <label htmlFor="loan-amount">Monto del Préstamo</label>
          <input
            type="number"
            id="loan-amount"
            placeholder="Ingrese el monto del préstamo"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="loan-term">Plazo (meses)</label>
          <input
            type="number"
            id="loan-term"
            placeholder="Ingrese el plazo en meses"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="primary-button">Calcular</button>
      </form>
      {monthlyPayment && (
        <div className="result">
          <h3>Cuota Mensual:</h3>
          <h1>${monthlyPayment}</h1>
        </div>
      )}
    </div>
  );
};

export default NewLoan;
