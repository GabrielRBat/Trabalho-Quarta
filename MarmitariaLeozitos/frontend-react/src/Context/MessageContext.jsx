import { createContext, useContext, useState } from 'react';

// 1. Criar o contexto
const MessageContext = createContext();

// 2. Criar o provider
export function MessageProvider({ children }) {
  const [message, setMessage] = useState(null);

  function showMessage(msg) {
    setMessage(msg);
  }

  function clearMessage() {
    setMessage(null);
  }

  return (
    <MessageContext.Provider value={{ message, showMessage, clearMessage }}>
      {children}
    </MessageContext.Provider>
  );
}

// 3. Criar um hook para facilitar
export function useMessage() {
  return useContext(MessageContext);
}
