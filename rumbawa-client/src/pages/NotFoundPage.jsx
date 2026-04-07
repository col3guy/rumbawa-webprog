import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 text-center">
      
      {/* Large 404 */}
      <h1 className="text-9xl font-extrabold text-red-600 mb-6">404</h1>
      
      {/* Message */}
      <h2 className="text-3xl font-bold text-red-600 mb-2">
        Oops... Page Not Found
      </h2>
      <p className="text-red-400 mb-6">
        I don't know how you ended up here, you should go away now
      </p>

      {/* Button to go home */}
      <Link to="/">
        <Button>Go Back Home</Button>
      </Link>
    </div>
  );
}

export default NotFoundPage;