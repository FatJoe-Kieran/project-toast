import React, { createContext, useState } from "react";

export const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, variant) => {
    const newToasts = [...toasts, { id: crypto.randomUUID(), message, variant }];
    setToasts(newToasts);
  };

  const removeToastById = (id) => {
    const newToasts = toasts.filter((toast) => toast.id !== id);
    setToasts(newToasts);
  };

  const removeAllToasts = () => setToasts([]);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        removeAllToasts,
        addToast,
        removeToastById,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
