import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthCode.css';

const AuthCode = () => {
  const [authCode, setAuthCode] = useState(['', '', '', '']);
  const [generatedCode, setGeneratedCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Generate a new 4-digit code every 60 seconds
    const generateCode = () => {
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedCode(code);
    };

    generateCode(); // Initial code generation
    const interval = setInterval(generateCode, 60000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const handleChange = (index, value) => {
    if (isNaN(value) || value.length > 1) return; // Only allow single numeric values

    const newCode = [...authCode];
    newCode[index] = value;
    setAuthCode(newCode);

    // Automatically move to the next input
    if (value !== '' && index < 3) {
      document.getElementById(`digit-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredCode = authCode.join('');
    if (enteredCode === generatedCode) {
      navigate('/dashboard'); // Redirect to dashboard on successful code entry
    } else {
      alert('Código incorrecto. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="auth-code-container">
      <img src="/images/ImageAuth.svg" alt="Pattern Background" />
      <h1>Código De Autenticación</h1>
      <p class="large">Ingresa el código de autenticación enviado:</p>
      <form onSubmit={handleSubmit}>
        <div className="code-inputs">
          {authCode.map((digit, index) => (
            <input
              key={index}
              id={`digit-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          ))}
        </div>
        <p class="large">Código actual: <strong>{generatedCode}</strong></p>
        <p>(El código se actualiza cada 60 segundos)</p>
        <button class="primary-button" type="submit">Verificar</button>
      </form>
      <div class="certificates">
        <img id="security-certificates" src="/images/certificates.png" alt="Security Certificates" />
        <img src="/images/LogoSmall.svg" alt="Prestio Logo" />
      </div>
    </div>
  );
};

export default AuthCode;
