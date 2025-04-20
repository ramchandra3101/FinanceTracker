import Head from 'next/head';
import SignUp from '@/components/auth/SignUp';

const SignUpPage = () => {
  return (
    <>
        <Head>
            <title>Sign UP | Expense Tracker</title>
            <meta name = 'description' content = "Create an account for the expense tracker App"/>
        </Head>
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Expense Tracker
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Create your account to get started
                </p>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <SignUp/>
            </div>
        </div>
    </>
  );
}
 
export default SignUpPage;   