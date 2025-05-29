import { createContext, useContext, useState } from "react";

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const [errorMsg, setErrorMsg] = useState(null);

  function showError(msg) {
    setErrorMsg(msg);
  }

  function clearError() {
    setErrorMsg(null);
  }

  return (
    <ErrorContext.Provider value={{ errorMsg, showError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  return useContext(ErrorContext);
}
