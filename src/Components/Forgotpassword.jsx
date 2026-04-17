import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

const forgotPasswordSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
});

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Reset link sent to:', data.email);
    setIsSubmitted(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-slate-200/60 border border-indigo-300 p-8 md:p-10">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-xl mb-4 text-white font-black text-xl">M</div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Forgot Password?</h2>
          <p className="text-slate-500 mt-2">
            {isSubmitted 
              ? "Check your inbox." 
              : "No worries."}
          </p>
        </div>  
        
        {!isSubmitted ? (
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
            >
              {isSubmitting ? 'Sending...' : 'Reset Password'}
            </button>
          </form>
        ) : (
          <div className="text-center">
             <button    
              onClick={() => setIsSubmitted(false)}
              className="text-indigo-600 font-bold hover:text-indigo-700"
            >
              Didn't receive the email? Try again
            </button>
          </div>
        )}

        <p className="mt-8 text-center text-slate-600 text-sm font-medium">
          Remembered your password? <Link to="/login" className="text-indigo-600 hover:text-indigo-400  decoration-2 underline-offset-4 hover:underline">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;