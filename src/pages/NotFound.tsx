import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, Home } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Film className="mx-auto h-16 w-16 text-indigo-600 dark:text-indigo-400" />
        
        <h1 className="mt-6 text-6xl font-extrabold text-gray-900 dark:text-white">404</h1>
        <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">Page not found</h2>
        
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Sorry, we couldn't find the page you're looking for.
        </p>
        
        <div className="mt-8">
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/')}
          >
            <Home className="h-5 w-5 mr-2" />
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;