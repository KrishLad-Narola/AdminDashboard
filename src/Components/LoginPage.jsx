import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const LoginPage = () => {
  const navigate = useNavigate();
  // const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
  //   resolver: zodResolver(loginSchema),
  //   mode: "onTouched",
  // });

const { 
  register, 
  handleSubmit, 
  setError,
  formState: { errors, isSubmitting } 
} = useForm({
  resolver: zodResolver(loginSchema),
  mode: "onTouched",
});

const onSubmit = async (data) => {
  await new Promise(resolve => setTimeout(resolve, 800));

  const users = JSON.parse(localStorage.getItem('users') || '[]');

  const user = users.find(u => u.email === data.email);

  if (!user) {
    setError('email', { type: 'manual', message: 'No account found with this email' });
    return;
  }

  if (user.password !== data.password) {
    setError('password', { type: 'manual', message: 'Incorrect password' });
    return;
  }

  localStorage.setItem('currentUser', JSON.stringify(user));
  console.log('Login Success:', user);
  navigate('/dashboard');
};

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100 p-8 md:p-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-xl mb-4 text-white font-black text-xl">M</div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Welcome Back</h2>
          <p className="text-slate-500 mt-2">Enter your details to access your dashboard</p>
        </div>  
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
            <input
              {...register('email')}
              className={`w-full px-4 py-3.5 bg-slate-50 border rounded-2xl focus:ring-4 transition-all outline-none ${
                errors.email ? 'border-red-400 focus:ring-red-50' : 'border-slate-200 focus:ring-indigo-100 focus:border-indigo-400'
              }`}
              placeholder="name@xyz.com"
            />
            {errors.email && <p className="text-xs text-red-500 font-medium ml-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
            <input
              {...register('password')}
              type="password"
              className={`w-full px-4 py-3.5 bg-slate-50 border rounded-2xl focus:ring-4 transition-all outline-none ${
                errors.password ? 'border-red-400 focus:ring-red-50' : 'border-slate-200 focus:ring-indigo-100 focus:border-indigo-400'
              }`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-xs text-red-500 font-medium ml-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
          >
            {isSubmitting ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-600 text-sm font-medium">
          New here? <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-bold decoration-2 underline-offset-4 hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;