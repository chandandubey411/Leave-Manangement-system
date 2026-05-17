import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Mail, Lock, User, Building2, Hash } from 'lucide-react';
import useAuth from '../hooks/useAuth';

function SignUpPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const togglePassword = useCallback(() => setShowPassword((p) => !p), []);
  
  const password = watch('password');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const signupData = { ...data };
    delete signupData.confirmPassword;
    
    // Default values since backend accepts these
    signupData.role = 'employee';
    
    const result = await signup(signupData);
    setIsSubmitting(false);

    if (result.success) {
      toast.success('Account created successfully! Redirecting to dashboard…');
      navigate('/dashboard', { replace: true });
    } else {
      toast.error(result.message ?? 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-card px-8 py-10">

        {/* Brand */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 leading-none">LeaveLo</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Create Account</p>
          </div>
        </div>

        <h1 className="text-xl font-semibold text-slate-900 mb-1">Sign up</h1>
        <p className="text-sm text-slate-500 mb-7">
          Enter your details to create your employee account.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="fullName" className="text-sm font-medium text-slate-700">Full Name</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><User className="w-4 h-4" /></span>
              <input
                id="fullName"
                type="text"
                placeholder="John Doe"
                className={`input-base pl-9 ${errors.fullName ? 'input-error' : ''}`}
                {...register('fullName', { required: 'Full name is required' })}
              />
            </div>
            {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-slate-700">Email address</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Mail className="w-4 h-4" /></span>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                className={`input-base pl-9 ${errors.email ? 'input-error' : ''}`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
                })}
              />
            </div>
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Department */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="department" className="text-sm font-medium text-slate-700">Department</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Building2 className="w-4 h-4" /></span>
                <input
                  id="department"
                  type="text"
                  placeholder="Engineering"
                  className={`input-base pl-9 ${errors.department ? 'input-error' : ''}`}
                  {...register('department', { required: 'Department is required' })}
                />
              </div>
              {errors.department && <p className="text-xs text-red-500">{errors.department.message}</p>}
            </div>

            {/* Designation */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="designation" className="text-sm font-medium text-slate-700">Designation</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><User className="w-4 h-4" /></span>
                <input
                  id="designation"
                  type="text"
                  placeholder="Software Engineer"
                  className={`input-base pl-9 ${errors.designation ? 'input-error' : ''}`}
                  {...register('designation', { required: 'Designation is required' })}
                />
              </div>
              {errors.designation && <p className="text-xs text-red-500">{errors.designation.message}</p>}
            </div>
          </div>

          {/* Employee ID */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="employeeId" className="text-sm font-medium text-slate-700">Employee ID</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Hash className="w-4 h-4" /></span>
              <input
                id="employeeId"
                type="text"
                placeholder="EMP-123"
                className={`input-base pl-9 ${errors.employeeId ? 'input-error' : ''}`}
                {...register('employeeId', { required: 'Employee ID is required' })}
              />
            </div>
            {errors.employeeId && <p className="text-xs text-red-500">{errors.employeeId.message}</p>}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-slate-700">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Lock className="w-4 h-4" /></span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={`input-base pl-9 pr-10 ${errors.password ? 'input-error' : ''}`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                })}
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">Confirm Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Lock className="w-4 h-4" /></span>
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={`input-base pl-9 ${errors.confirmPassword ? 'input-error' : ''}`}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
              />
            </div>
            {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full mt-4"
          >
            {isSubmitting ? (
              <>
                <svg className="w-4 h-4 animate-spin mr-2 inline" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Creating account…
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/signin" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <p className="mt-6 text-xs text-slate-400">
        © {new Date().getFullYear()} LeaveLo · All rights reserved
      </p>
    </div>
  );
}

export default SignUpPage;
