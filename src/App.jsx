import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
  );
}

export default App;
