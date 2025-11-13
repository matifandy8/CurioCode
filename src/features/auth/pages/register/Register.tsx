import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';

const RegisterPage: React.FC = () => {
  type FormValues = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({ mode: 'onTouched' });
  const [error, setError] = useState('');

  const onSubmit = async (data: FormValues) => {
    setError('');
    console.log('Register submit:', data);
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // add registration logic here (mock)
    // await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify(data) })
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-cyan-950 border-2 border-cyan-300 rounded-lg shadow-lg shadow-cyan-300/30 p-8">
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            Create Account
          </h1>
          <p className="text-gray-200 text-center mb-8">
            Join CurioCode today
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register('name', { required: 'Name is required' })} placeholder="Enter your name" />
              {errors.name && <div className="text-sm text-red-500 mt-1">{errors.name.message}</div>}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...register('email', { required: 'Email is required' })} type="email" placeholder="Enter your email" />
              {errors.email && <div className="text-sm text-red-500 mt-1">{errors.email.message}</div>}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })} type="password" placeholder="Enter your password" />
              {errors.password && <div className="text-sm text-red-500 mt-1">{errors.password.message}</div>}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" {...register('confirmPassword', { required: 'Please confirm your password', validate: (v) => v === watch('password') || 'Passwords do not match' })} type="password" placeholder="Confirm your password" />
              {errors.confirmPassword && <div className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</div>}
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-400 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <Button type="submit" variant="primary" size="lg" className="mt-4">
              Register
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-100 text-sm">
              Already have an account?{' '}
              <a href="/login" className="text-cyan-500 hover:text-cyan-600 font-medium transition-colors">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
