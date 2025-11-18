import { useForm } from 'react-hook-form';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useRequestState } from '../../hooks/useRequest';

const schema = yup
  .object({
    email: yup.string().email().required().trim(),
  })
  .required()

const ForgotPasswordPage: React.FC = () => {
  type FormValues = { email: string };
  const { loading, error, setLoading, setSuccess, setError, reset } = useRequestState();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: FormValues) => {
    console.log(data);
    setLoading();
    // TODO: Implement forgot password API call
    setTimeout(() => {
      setSuccess();
      console.log('Reset link sent to:', data.email);
    }, 1000);
  };

  const resetOnChange = (originalHandler?: React.ChangeEventHandler<HTMLInputElement>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    reset();
    originalHandler?.(e);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-[#012d2d] border-2 border-cyan-300 rounded-lg shadow-lg shadow-cyan-300/30 p-8">
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            Forgot Password
            <span className="text-cyan-300">?</span>
          </h1>
          <p className="text-gray-200 text-center mb-8">
            Enter your email to reset your password
            <br />
            We'll send you a link to reset your password
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...register('email')} type="email" placeholder="Enter your email" onChange={resetOnChange()} />
              {errors.email && <div className="text-sm text-red-500 mt-1 font-bold">{errors.email.message}</div>}
            </div>

            <Button type="submit" variant="primary" size="lg" className="mt-4" disabled={loading}>
              {loading ? "" : "Send Reset Link"}
            </Button>
            {error && <div className="text-sm text-red-500 mt-1 font-bold">{error}</div>}
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-100 text-sm">
              Remembered your password?{' '}
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

export default ForgotPasswordPage;