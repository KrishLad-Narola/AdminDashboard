import { Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import Dashboard from './Components/Dashboard';
import ForgotPassword from './Components/Forgotpassword';

function App() {
  return (

    <div className="min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-700">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;