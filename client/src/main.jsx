import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
export const server = "http://localhost:3000/register"
import { createContext } from 'react'

export const Context = createContext({ isAuthenticated: false })

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  return (
    <Context.Provider value={{
      isAuthenticated, setIsAuthenticated
    }}>
      <App />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)
