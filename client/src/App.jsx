import './App.scss';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { Toaster } from 'react-hot-toast';
import MainPage from './pages/MainPage/mainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DetailPage from './pages/DetailsPage/DetailPage';
import JobPage from './pages/JobPage/JobPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/details" element={<DetailPage />} />
        <Route path="/add" element={<JobPage />} />


      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
