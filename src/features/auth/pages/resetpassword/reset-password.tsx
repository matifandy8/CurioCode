import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useRequestState } from '../../hooks/useRequest';

const schema = yup
  .object({
    password: yup.string().required().min(6).trim(),
    confirmPassword: yup.string().required().trim().oneOf([yup.ref('password')], 'Passwords do not match'),
  })
  .required()

export function ResetPasswordPage() {
  type FormValues = { password: string; confirmPassword: string };
  const navigate = useNavigate();
  const { loading, error, status, setLoading, setSuccess, setError, reset } = useRequestState();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const submit = async (data: FormValues) => {
    console.log('Reset password submit:', { token, ...data });
    if (!token) {
      setError('Missing reset token.');
      return;
    }
    
    setLoading();
    // TODO: Implement reset password API call
    setTimeout(() => {
      setSuccess();
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }, 1000);
  };

  const resetOnChange = (originalHandler?: React.ChangeEventHandler<HTMLInputElement>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    reset();
    originalHandler?.(e);
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-[#012d2d] border-2 border-cyan-300 rounded-lg shadow-lg shadow-cyan-300/30 p-8 text-center">
            <h2 className="text-2xl font-semibold text-white mb-2">Password changed</h2>
            <p className="text-gray-200">Your password has been updated. You can now <a href="/login" className="text-cyan-400 underline">log in</a>.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-[#012d2d] border-2 border-cyan-300 rounded-lg shadow-lg shadow-cyan-300/30 p-8">
          <h1 className="text-3xl font-bold text-white text-center mb-2">Reset Password</h1>
          <p className="text-gray-200 text-center mb-6">Enter a new password for your account.</p>

          <form onSubmit={handleSubmit(submit)} className="space-y-6">
            <div>
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                placeholder="Enter new password"
                onChange={resetOnChange()}
              />
              {errors.password && <div className="text-sm text-red-500 mt-1 font-bold">{errors.password.message}</div>}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                placeholder="Confirm new password"
                onChange={resetOnChange()}
              />
              {errors.confirmPassword && <div className="text-sm text-red-500 mt-1 font-bold">{errors.confirmPassword.message}</div>}
            </div>

            <Button type="submit" variant="primary" size="lg" className="mt-4" disabled={loading}>
              {loading ? 'Saving...' : 'Change password'}
            </Button>
            {error && <div className="text-sm text-red-500 mt-1 font-bold">{error}</div>}
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
