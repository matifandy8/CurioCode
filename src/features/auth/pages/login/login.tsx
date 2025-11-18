import { useForm } from 'react-hook-form';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useAuth } from '@/app/providers/useAuth';
import { useNavigate } from 'react-router-dom';
import { useRequestState } from '../../hooks/useRequest';

const schema = yup
  .object({
    email: yup.string().email().required().trim(),
    password: yup.string().required().min(6).trim(),
  })
  .required()

const LoginPage: React.FC = () => {
  type FormValues = { email: string; password: string };
  const navigate = useNavigate();
  const { loading, error, setLoading, setSuccess, setError} = useRequestState();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })
  const auth = useAuth();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    setLoading();
    auth.login(data.email, data.password).then(res => {
      console.log(res);
      setSuccess();
      
      navigate("/");
    }).catch(err => {
      console.error(err);
      setError(err instanceof Error ? err.message : "Unexpected error");
    });
  };


  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-[#012d2d] border-2 border-cyan-300 rounded-lg shadow-lg shadow-cyan-300/30 p-8">
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-200 text-center mb-8">
            Login to your account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...register('email')} type="email" placeholder="Enter your email" />
              {errors.email && <div className="text-sm text-red-500 mt-1 font-bold">{errors.email.message}</div>}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" {...register('password')} type="password" placeholder="Enter your password" />
              {errors.password && <div className="text-sm text-red-500 mt-1 font-bold">{errors.password.message}</div>}
            </div>

            <Button type="submit" variant="primary" size="lg" className="mt-4" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </Button>
            {error && <div className="text-sm text-red-500 mt-1 font-bold">{error}</div>}
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
