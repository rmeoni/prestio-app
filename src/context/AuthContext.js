import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  // Helper functions to validate services and loans
  const validateService = (service) => ({
    ...service,
    cost: Number(service.cost) || 0, // Ensure cost is a number
    categoryId: service.categoryId || 'Unknown',
    description: service.description || 'No description',
  });

  const validateLoan = (loan) => ({
    ...loan,
    amount: Number(loan.amount) || 0, // Ensure amount is a number
    term: Number(loan.term) || 0, // Ensure term is a number
    interestRate: Number(loan.interestRate) || 0, // Ensure interest rate is a number
    paymentDate: loan.paymentDate || null, // Ensure paymentDate is null if missing
    categoryId: loan.categoryId || 'Unknown',
  });

  // Initialize state with validation
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem('isAuthenticated')) || false
  );

  const [services, setServices] = useState(() => {
    const storedServices = JSON.parse(localStorage.getItem('services'));
    const defaultServices = [
      {
        id: '201',
        name: 'Servicio A',
        cost: 100,
        description: 'Descripción del Servicio A',
        paymentDate: '2024-12-15',
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
    ];

    // Validate stored services or fallback to default
    return (storedServices || defaultServices).map(validateService);
  });

  const [loans, setLoans] = useState(() => {
    const storedLoans = JSON.parse(localStorage.getItem('loans'));
    const defaultLoans = [
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
    ];

    // Validate stored loans or fallback to default
    return (storedLoans || defaultLoans).map(validateLoan);
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    localStorage.setItem('services', JSON.stringify(services));
    localStorage.setItem('loans', JSON.stringify(loans));
  }, [isAuthenticated, services, loans]);

  // Authentication functions
  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('services');
    localStorage.removeItem('loans');
  };

  // Add service with validation
  const addService = (service) => {
    setServices((prevServices) => [...prevServices, validateService(service)]);
  };

  // Add loan with validation
  const addLoan = (loan) => {
    setLoans((prevLoans) => [...prevLoans, validateLoan(loan)]);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        services,
        addService,
        setServices,
        loans,
        addLoan,
        setLoans,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
