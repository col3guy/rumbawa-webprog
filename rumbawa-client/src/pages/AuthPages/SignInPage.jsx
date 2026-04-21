import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-green-500 focus:ring-2 focus:ring-green-200';

const SignInPage = () => {
  return (
    <div className="w-full max-w-md rounded-3xl bg-white/80 backdrop-blur-md p-8 shadow-xl">
      
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-zinc-900">Sign in</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Please login to continue to your journey.
        </p>
      </div>

      {/* Social Buttons */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white py-2 text-sm hover:bg-zinc-50">
          Continue with Google
        </button>
        <button className="flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white py-2 text-sm hover:bg-zinc-50">
          Continue with Apple
        </button>
      </div>

      {/* Form */}
      <form className="mt-6 space-y-4">
        
        {/* Email */}
        <div>
          <label className="text-sm font-medium text-zinc-700">Email</label>
          <input
            type="email"
            placeholder="email"
            className={inputClasses + ' mt-2'}
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium text-zinc-700">Password</label>
          <input
            type="password"
            placeholder="password"
            className={inputClasses + ' mt-2'}
          />
        </div>

        {/* Options */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-zinc-600">
            <input type="checkbox" className="accent-green-500" />
            Remember me
          </label>

          <button className="text-zinc-500 hover:text-zinc-900">
            Forgot Password?
          </button>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full rounded-xl bg-green-500 py-3 text-white hover:bg-green-600"
        >
          Log in
        </Button>
      </form>

      {/* Footer */}
      <p className="mt-6 text-center text-sm text-zinc-600">
        Need an account?{' '}
        <Link to="/auth/signup" className="font-semibold text-green-600 hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
};

export default SignInPage;