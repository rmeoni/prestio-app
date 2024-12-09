import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css'

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'user@example.com' && password === 'password123!') {
      login(); // Authenticate user
      navigate('/auth-code'); // Redirect to authentication code page
    } else {
      setError('Correo o contraseña incorrectos.');
    }
  };

  return (
    <div id="login">
      <img src="/images/ImageLogin.svg" alt="Pattern Background" />
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email"><p className="large">Correo Electrónico</p></label>
          <input
            type="email"
            id="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password"><p className="large">Contraseña</p></label>
          <input
            type="password"
            id="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: '#E3A4A5' }}>{error}</p>}
        <button type="submit" className="primary-button ">Iniciar Sesión</button>
      </form>
      <div className="certificates">
        <img id="security-certificates" src="/images/certificates.png" alt="Security Certificates" />
        <img src="/images/LogoSmall.svg" alt="Prestio Logo" />
      </div>
    </div>
  );
};

export default Login;
