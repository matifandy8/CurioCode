import { useState } from 'react';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add validation logic here
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Add registration logic here
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-cyan-900 border-2 border-cyan-300 rounded-lg shadow-lg shadow-cyan-300/30 p-8">
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            Create Account
          </h1>
          <p className="text-gray-200 text-center mb-8">
            Join CurioCode today
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
                Name
              </label>
              <input 
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                type="text" 
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 placeholder-gray-400 transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                Email
              </label>
              <input 
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email" 
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 placeholder-gray-400 transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>
              <input 
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password" 
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 placeholder-gray-400 transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-2">
                Confirm Password
              </label>
              <input 
                id="confirmPassword"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                type="password" 
                placeholder="Confirm your password"
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 placeholder-gray-400 transition-all"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-400 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="w-full bg-cyan-300 text-black font-semibold py-3 rounded-md hover:bg-cyan-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
            >
              Register
            </button>
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
