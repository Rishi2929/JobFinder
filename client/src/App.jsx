import './App.scss';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { Toaster } from 'react-hot-toast';
import MainPage from './pages/MainPage/mainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DetailPage from './pages/DetailsPage/DetailPage';
import JobPage from './pages/JobPage/JobPage';
import EditJobPage from './pages/EditJobPage/EditJobPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/details/:jobId" element={<DetailPage />} />
        <Route path="/add" element={<JobPage />} />
        <Route path="/edit" element={<EditJobPage />} />



      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
