import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createContext } from 'react';


export const server = "https://job-listing-tgz8.onrender.com"
// export const server = "http://localhost:3000"



export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('token') ? true : false
  );
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    // Check if token exists in localStorage and set isAuthenticated accordingly
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Context.Provider value={{
      isAuthenticated, setIsAuthenticated, loading, setLoading,
    }}>
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
