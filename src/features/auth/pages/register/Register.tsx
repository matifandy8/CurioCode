import { useForm } from 'react-hook-form';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useAuth } from '@/app/providers/useAuth';
import type { FormValuesRegister } from '@/features/auth/types/auth.types';
import { useNavigate } from 'react-router-dom';
import { useRequestState } from '../../hooks/useRequest';

const schema = yup
  .object({
    name: yup.string().required().trim().min(2).max(50),
    email: yup.string().email().required().trim(),
    password: yup.string().required().min(6).trim(),
    confirmPassword: yup.string().required().trim().oneOf([yup.ref('password')], 'Passwords do not match'),
  })
  .required()

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { loading, error, setLoading, setSuccess, setError, reset } = useRequestState();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesRegister>({
    resolver: yupResolver(schema),
  })
  const auth = useAuth();

  const onSubmit = (data: FormValuesRegister) => {
    setLoading();
    auth.register(data.name, data.email, data.password).then(res => {
      setSuccess();
      
      navigate("/login");
    }).catch(err => {
      console.error(err);
      setError(err instanceof Error ? err.message : "Unexpected error");
    });
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
            Create Account
          </h1>
          <p className="text-gray-200 text-center mb-8">
            Join CurioCode today
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register('name')} placeholder="Enter your name" onChange={resetOnChange()} />
              {errors.name && <div className="text-sm text-red-500 mt-1 font-bold">{errors.name.message}</div>}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...register('email')} type="email" placeholder="Enter your email" onChange={resetOnChange()} />
              {errors.email && <div className="text-sm text-red-500 mt-1 font-bold">{errors.email.message}</div>}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" {...register('password')} type="password" placeholder="Enter your password" onChange={resetOnChange()} />
              {errors.password && <div className="text-sm text-red-500 mt-1 font-bold">{errors.password.message}</div>}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" {...register('confirmPassword')} type="password" placeholder="Confirm your password" onChange={resetOnChange()} />
              {errors.confirmPassword && <div className="text-sm text-red-500 mt-1 font-bold">{errors.confirmPassword.message}</div>}
            </div>


            <Button type="submit" variant="primary" size="lg" className="mt-4" disabled={loading}>
              {loading ? "Loading..." : "Register"}
            </Button>
            {error && <div className="text-sm text-red-500 mt-1 font-bold">{error}</div>}
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