import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loanCategories, serviceCategories } from '../../mockData/categories';
import './Dashboard.css';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [view, setView] = useState('loans'); // Default to Loans
  const { loans, services } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Sync view with navigation state or fallback to default
  useEffect(() => {
    if (location.state?.view) {
      setView(location.state.view);
    }
  }, [location.state]);

  // Helper function to find category details
  const findCategory = (categories, id) =>
    categories.find((category) => category.id === id);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setSearchResults([]);
      return;
    }

    // Search loans and services by name
    const loanMatches = loans.filter((loan) =>
      loan.name.toLowerCase().includes(query)
    );
    const serviceMatches = services.filter((service) =>
      service.name.toLowerCase().includes(query)
    );

    // Combine results
    setSearchResults([...loanMatches, ...serviceMatches]);
  };

  const handleResultClick = (result) => {
    if (result.amount) {
      // Navigate to Loan Details
      navigate(`/loan-details/${result.id}`);
    } else {
      // Navigate to Service Details
      navigate(`/service-details/${result.id}`);
    }
    setSearchQuery(''); // Clear search query
    setSearchResults([]); // Clear results
  };

  const renderLoans = () => (
    <div>
      <h2>Resumen de Préstamos</h2>
      {loans.length > 0 ? (
        <ul className="item-list" id="summary-item">
          {loans.map((loan) => {
            const category = findCategory(loanCategories, loan.categoryId); // Get loan category
            return (
              <Link to={`/loan-details/${loan.id}`} className="list-item-link">
                <li key={loan.id}>
                  <p className='bold'>{category?.name || 'Sin Categoría'}</p>
                  {category?.iconUrl && (
                    <img
                      src={category.iconUrl}
                      alt={category.name}
                      className="category-icon"
                    />
                  )}
                  <p className="large">${loan.amount.toFixed(2)}</p>
                  <p>{new Date(loan.paymentDate).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}</p>
                </li>
              </Link>
            );
          })}
        </ul>
      ) : (
        <p>No hay préstamos disponibles.</p>
      )}
      <h2>Próximos Pagos de Préstamos</h2>
      {loans.filter((loan) => loan.paymentDate).length > 0 ? (
        <ul className="item-list">
          {loans
            .filter((loan) => loan.paymentDate)
            .map((loan) => {
              const category = findCategory(loanCategories, loan.categoryId);
              return (
                <li key={loan.id}>
                  {category?.iconUrl && (
                    <img
                      src={category.iconUrl}
                      alt={category.name}
                      className="category-icon"
                    />
                  )}
                  <p><strong>Préstamo:</strong> {loan.name}</p>
                  <p><strong>Fecha de Pago:</strong> {loan.paymentDate}</p>
                  <p><strong>Monto:</strong> ${(loan.amount / loan.term).toFixed(2)}</p>
                  <Link to={`/loan-details/${loan.id}`}>Ver Detalles</Link>
                </li>
              );
            })}
        </ul>
      ) : (
        <p>No hay próximos pagos de préstamos.</p>
      )}
    </div>
  );

  const renderServices = () => (
    <div>
      <h2>Resumen de Servicios</h2>
      {services.length > 0 ? (
        <ul className="item-list" id="summary-item">
          {services.map((service) => {
            const category = findCategory(serviceCategories, service.categoryId); // Get service category
            return (
              <Link to={`/service-details/${service.id}`} className="list-item-link">
                <li key={service.id}>
                  <p className="bold"> {category?.name || 'Sin Categoría'}</p>
                  {category?.iconUrl && (
                    <img
                      src={category.iconUrl}
                      alt={category.name}
                      className="category-icon"
                    />

                  )}
                  <p className="large"> ${service.cost.toFixed(2)}</p>
                </li>
              </Link>
            );
          })}
        </ul>
      ) : (
        <p>No hay servicios disponibles.</p>
      )
      }
      <h2>Próximos Pagos de Servicios</h2>
      {
        services.filter((service) => service.paymentDate).length > 0 ? (
          <ul className="item-list">
            {services
              .filter((service) => service.paymentDate)
              .map((service) => {
                const category = findCategory(serviceCategories, service.categoryId);
                return (
                  <li key={service.id}>
                    {category?.iconUrl && (
                      <img
                        src={category.iconUrl}
                        alt={category.name}
                        className="category-icon"
                      />
                    )}
                    <p><strong>Servicio:</strong> {service.name}</p>
                    <p><strong>Fecha de Pago:</strong> {service.paymentDate}</p>
                    <p><strong>Monto:</strong> ${service.cost.toFixed(2)}</p>
                    <Link to={`/service-details/${service.id}`}>Ver Detalles</Link>
                  </li>
                );
              })}
          </ul>
        ) : (
          <p>No hay próximos pagos de servicios.</p>
        )
      }
    </div >
  );

  return (
    <div className="dashboard-container">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar"
          value={searchQuery}
          onChange={handleSearch}
        />
        <span className="search-icon" role="img" aria-label="search"><img src="/images/IconSearch.svg" alt="Search Icon" /></span>
        {searchResults.length > 0 && (
          <div className="search-dropdown">
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="search-result-item"
                onClick={() => handleResultClick(result)}
              >
                <p>{result.name}</p>
                <small>
                  {result.amount ? 'Préstamo' : 'Servicio'} {/* Identify type */}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Toggle Buttons */}
      <div className="toggle-buttons">
        <button
          className={view === 'loans' ? 'active' : ''}
          onClick={() => setView('loans')}
        >
          Préstamos
        </button>
        <button
          className={view === 'services' ? 'active' : ''}
          onClick={() => setView('services')}
          id="rightButton"
        >
          Servicios
        </button>
      </div>
      {view === 'loans' ? renderLoans() : renderServices()}
    </div>
  );
};

export default Dashboard;
