import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
        <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-6">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input type="email" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input type="password" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-lg shadow-md transition-colors">
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-slate-600">
          New here? <Link to="/register" className="text-indigo-600 font-medium hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
