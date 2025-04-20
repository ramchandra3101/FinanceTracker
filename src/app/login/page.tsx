// pages/login.tsx
import Head from 'next/head';
import Login from '@/components/auth/Login';

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Sign In | Expense Tracker</title>
        <meta name="description" content="Sign in to your Expense Tracker account" />
      </Head>
      
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Expense Tracker
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>
        
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <Login />
        </div>
      </div>
    </>
  );
}

export default LoginPage