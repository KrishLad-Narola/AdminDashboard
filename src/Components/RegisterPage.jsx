import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
        <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-2">Join Us</h2>
        <p className="text-center text-slate-500 mb-6">Create your account in seconds</p>
        <form className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          <input type="email" placeholder="Email Address" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          <input type="password" placeholder="Create Password" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          <button className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-lg shadow-md transition-colors">
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-slate-600">
          Already have an account? <Link to="/" className="text-emerald-600 font-medium hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
