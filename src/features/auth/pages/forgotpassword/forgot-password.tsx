

const ForgotPasswordPage: React.FC = () => {


  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-cyan-950 border-2 border-cyan-300 rounded-lg shadow-lg shadow-cyan-300/30 p-8">
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            Forgot Password
            <span className="text-cyan-300">?</span>
          </h1>
          <p className="text-gray-200 text-center mb-8">
            Enter your email to reset your password
            <br />
            We'll send you a link to reset your password
          </p>

          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 placeholder-gray-400 transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-300 text-black font-semibold py-3 rounded-md hover:bg-cyan-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;