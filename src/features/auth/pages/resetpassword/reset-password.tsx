import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';

export function ResetPasswordPage() {
  const [error, setError] = useState('');
  type FormValues = { password: string; confirmPassword: string };
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({ mode: 'onTouched' });

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const submit = async (data: FormValues) => {
    setError('');
    console.log('Reset password submit:', { token, ...data });
    if (!token) {
      setError('Missing reset token.');
      return;
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-cyan-950 border-2 border-cyan-300 rounded-lg shadow-lg shadow-cyan-300/30 p-8 text-center">
            <h2 className="text-2xl font-semibold text-white mb-2">Password changed</h2>
            <p className="text-gray-200">Your password has been updated. You can now <a href="/login" className="text-cyan-400 underline">log in</a>.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-cyan-950 border-2 border-cyan-300 rounded-lg shadow-lg shadow-cyan-300/30 p-8">
          <h1 className="text-3xl font-bold text-white text-center mb-2">Reset Password</h1>
          <p className="text-gray-200 text-center mb-6">Enter a new password for your account.</p>

          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            <div>
              <Label htmlFor="password" required>New password</Label>
              <Input
                id="password"
                type="password"
                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                placeholder="Enter new password"
              />
              {errors.password && <div className="text-sm text-red-500 mt-1">{errors.password.message}</div>}
            </div>

            <div>
              <Label htmlFor="confirm" required>Confirm password</Label>
              <Input
                id="confirm"
                type="password"
                {...register('confirmPassword', { required: 'Please confirm your password', validate: (v) => v === watch('password') || 'Passwords do not match' })}
                placeholder="Confirm new password"
              />
              {errors.confirmPassword && <div className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</div>}
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-400 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Saving...' : 'Change password'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-100 text-sm">
              Remembered your password?{' '}
              <a href="/login" className="text-cyan-500 hover:text-cyan-600 font-medium transition-colors">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
