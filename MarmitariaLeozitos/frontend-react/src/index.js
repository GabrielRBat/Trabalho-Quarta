import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ErrorProvider } from './Context/ErrorContext';
import { MessageProvider } from './Context/MessageContext';

//  Importa o provider do carrinho
import { CartProvider } from './Context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ErrorProvider>
  <MessageProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </MessageProvider>
  </ErrorProvider>
  </React.StrictMode>
);
