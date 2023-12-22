import './App.scss';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DetailPage from './pages/DetailsPage/DetailPage';
import EditJobPage from './pages/EditJobPage/EditJobPage';
import AddJobPage from './pages/AddJobPage/AddJobPage';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/details/:jobId" element={<DetailPage />} />
        <Route path="/add" element={<AddJobPage />} />
        <Route path="/edit/:jobId" element={<EditJobPage />} />



      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
