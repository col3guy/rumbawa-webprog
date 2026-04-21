import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-green-500 focus:ring-2 focus:ring-green-200';

const SignUpPage = () => {
  return (
    <div className="w-full max-w-md rounded-2xl bg-white/80 backdrop-blur-md p-6 shadow-lg">

      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-zinc-900">
          Sign up
        </h1>
        <p className="mt-1 text-xs text-zinc-500">
          Create your account
        </p>
      </div>

      {/* Social Buttons */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button className="rounded-lg border border-zinc-300 bg-white py-2 text-xs hover:bg-zinc-50">
          Google
        </button>
        <button className="rounded-lg border border-zinc-300 bg-white py-2 text-xs hover:bg-zinc-50">
          Apple
        </button>
      </div>

      {/* Form */}
      <form className="mt-5 space-y-3">

        {/* Names */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs font-medium text-zinc-700">
              First Name
            </label>
            <input
              type="text"
              placeholder="name"
              className={inputClasses + ' mt-1'}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-700">
              Last Name
            </label>
            <input
              type="text"
              placeholder="surname"
              className={inputClasses + ' mt-1'}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-xs font-medium text-zinc-700">
            Email
          </label>
          <input
            type="email"
            placeholder="email"
            className={inputClasses + ' mt-1'}
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-xs font-medium text-zinc-700">
            Password
          </label>
          <input
            type="password"
            placeholder="password"
            className={inputClasses + ' mt-1'}
          />
        </div>

        {/* Terms */}
        <label className="flex items-center gap-2 text-xs text-zinc-600">
          <input type="checkbox" className="accent-green-500" />
          I agree to the terms
        </label>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full rounded-lg bg-green-500 py-2 text-sm text-white hover:bg-green-600"
        >
          Create account
        </Button>
      </form>

      {/* Footer */}
      <p className="mt-4 text-center text-xs text-zinc-600">
        Already have an account?{' '}
        <Link
          to="/auth/signin"
          className="font-semibold text-green-600 hover:underline"
        >
          Sign in
        </Link>
      </p>

    </div>
  );
};

export default SignUpPage;