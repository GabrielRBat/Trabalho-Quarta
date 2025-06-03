import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const logado = localStorage.getItem('logado');

    return logado ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
