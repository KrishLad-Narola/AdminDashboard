import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = (data) => {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');   
    const newUser = {
      ...data,
      id: Date.now(), 
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...existingUsers, newUser];

    localStorage.setItem('users', JSON.stringify(updatedUsers));

    localStorage.setItem('currentUser', JSON.stringify(newUser));

    console.log('User saved to LocalStorage:', newUser);
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-slate-200/60 border border-indigo-300 p-8 md:p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Join Us</h2>
          <p className="text-slate-500 mt-2">Create your professional account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <InputGroup label="Full Name" type="text" placeholder="Name" register={register('fullName')} error={errors.fullName} />
          <InputGroup label="Email Address" type="email" placeholder="kl@example.com" register={register('email')} error={errors.email} />
          <InputGroup label="Password" type="password" placeholder="••••••••" register={register('password')} error={errors.password} />

          <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]">
            {isSubmitting ? 'Creating account...' : 'Get Started'}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-600 text-sm font-medium">
          Already have an account? <Link to="/" className="text-indigo-600  hover:underline underline-offset-4">Log in</Link>
        </p>
      </div>
    </div>
  );
};

const InputGroup = ({ label, type, placeholder, register, error }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">{label}</label>
    <input
      type={type}
      {...register}
      placeholder={placeholder}
      className={`w-full px-4 py-3 bg-slate-50 border rounded-2xl focus:ring-4 transition-all outline-none ${
        error ? 'border-red-400 focus:ring-red-50' : 'border-slate-200 focus:ring-indigo-100 focus:border-indigo-400'
      }`}
    />
    {error && <p className="text-xs text-red-500 font-medium ml-1">{error.message}</p>}
  </div>
);

export default RegisterPage;