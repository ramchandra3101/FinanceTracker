
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Expense Tracker</h1>
        <p className="text-xl mb-8">Track and manage your expenses with ease</p>
        
        <div className="flex gap-4 justify-center">
          <Link 
            href="/login" 
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </Link>
          <Link 
            href="/signup" 
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}