import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';

const LoginPage: React.FC = () => {
  type FormValues = { email: string; password: string };
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ mode: 'onTouched' });
  const [error, setError] = useState('');

  const onSubmit = (data: FormValues) => {
    setError('');
    // Log submitted data for debugging
    console.log('Login submit:', data);

    // If an admin token was provided, persist and validate it
    // Otherwise proceed with normal (mocked) login flow
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-cyan-950 border-2 border-cyan-300 rounded-lg shadow-lg shadow-cyan-300/30 p-8">
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-200 text-center mb-8">
            Login to your account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...register('email', {
                required: 'Email is required', validate: {
                  maxLength: (v) =>
                    v.length <= 50 || "The email should have at most 50 characters",
                  matchPattern: (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "Email address must be a valid address",
                },
              })} type="email" placeholder="Enter your email" />
              {errors.email && <div className="text-sm text-red-500 mt-1">{errors.email.message}</div>}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" {...register('password', {
                required: 'Password is required', minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long"
                }
              })} type="password" placeholder="Enter your password" />
              {errors.password && <div className="text-sm text-red-500 mt-1">{errors.password.message}</div>}
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-400 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <Button type="submit" variant="primary" size="lg" className="mt-4">
              Login
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-100 text-sm">
              Don't have an account?{' '}
              <a href="/register" className="text-cyan-500 hover:text-cyan-600 font-medium transition-colors">
                Register here
              </a>
            </p>
            <p className="text-gray-100 text-sm">
              Don't remember your password?{' '}
              <a href="/forgot-password" className="text-cyan-500 hover:text-cyan-600 font-medium transition-colors">
                Reset it
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
