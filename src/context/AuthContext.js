import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [services, setServices] = useState([
    {
      id: '201',
      name: 'Servicio A',
      cost: 100,
      description: 'Descripción del Servicio A',
      paymentDate: '2024-12-15', // Next payment date
      categoryId: '1',
    },
    {
      id: '202',
      name: 'Servicio B',
      cost: 200,
      description: 'Descripción del Servicio B',
      paymentDate: '2024-12-20',
      categoryId: '2',
    },
    {
      id: '203',
      name: 'Servicio C',
      cost: 300,
      description: 'Descripción del Servicio C',
      paymentDate: '2024-12-25',
      categoryId: '3',
    },
    {
      id: '204',
      name: 'Servicio D',
      cost: 90,
      description: 'Descripción del Servicio C',
      paymentDate: '2024-12-25',
      categoryId: '4',
    },
  ]);
  const [loans, setLoans] = useState([
    {
      id: '101',
      name: 'Préstamo A',
      amount: 5000,
      term: 12,
      status: 'Activo',
      startDate: '2024-01-15',
      interestRate: 5.0,
      paymentDate: '2024-12-10',
      categoryId: '1',
    },
    {
      id: '102',
      name: 'Préstamo B',
      amount: 3000,
      term: 6,
      status: 'Finalizado',
      startDate: '2023-06-10',
      interestRate: 4.5,
      paymentDate: null,
      categoryId: '2',
    },
    {
      id: '103',
      name: 'Préstamo C',
      amount: 10000,
      term: 24,
      status: 'Activo',
      startDate: '2024-03-01',
      interestRate: 6.0,
      paymentDate: '2024-12-15',
      categoryId: '3',
    },
    {
      id: '104',
      name: 'Préstamo D',
      amount: 5000,
      term: 24,
      status: 'Activo',
      startDate: '2023-03-01',
      interestRate: 6.0,
      paymentDate: '2025-12-01',
      categoryId: '4',
    },
  ]);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const addService = (service) => {
    setServices((prevServices) => [...prevServices, service]);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      services,
      addService,
      setServices,
      loans,
      setLoans,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
