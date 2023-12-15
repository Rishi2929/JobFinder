import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { Toaster } from 'react-hot-toast'



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
