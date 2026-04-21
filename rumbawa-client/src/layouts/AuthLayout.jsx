import { Outlet } from 'react-router-dom';
import welcomeImg from '../assets/login-bg.png';
import skyImg from '../assets/sky-bg.jpg';

const AuthLayout = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center p-6">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${skyImg})` }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* MAIN CARD */}
      <div className="relative z-10 w-full max-w-6xl rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl overflow-hidden">

        <div className="grid lg:grid-cols-2">

          {/* LEFT SIDE - FORM */}
          <div className="flex items-center justify-center p-8 sm:p-12">
            <div className="w-full max-w-md">
              <Outlet />
            </div>
          </div>

          {/* RIGHT SIDE - IMAGE + TEXT */}
          <div className="hidden lg:flex flex-col items-center justify-center p-10 text-center">

            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome Back!👋
            </h2>

            <h3 className="text-gray-600 mb-6">
              Glad to see you again
            </h3>

            <img
              src={welcomeImg}
              alt="Welcome"
              className="w-full max-w-md object-contain"
            />

          </div>

        </div>
      </div>

    </section>
  );
};

export default AuthLayout;