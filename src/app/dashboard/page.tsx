// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MonthlyView from '@/components/dashboard/MonthlyView';
import ExpenseSummary from '@/components/dashboard/ExpenseSummary';
import ReceiptScannerButton from '@/components/dashboard/ScannerButton';
import CategoryDistribution from '@/components/dashboard/CategoryDistribution';
import ExpenseFilter from '@/components/expenses/ExpenseFilter';
import Card from '@/components/ui/Card';
import { ExpenseButton } from '@/components/ui/ExpenseButton';
import { fetchUser } from '@/services/auth';

export default function Dashboard() {
  const router = useRouter();
  interface User {
    first_name: string;
    // Add other properties of the user object if needed
  }

  const [user, setUser] = useState<User | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [refreshDashboard, setRefreshDashboard] = useState(0);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await fetchUser();
        if (userData) {
          setUser(userData);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Authentication error:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);
  
  const handleMonthChange = (date: Date) => {
    setSelectedMonth(date);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };
  const refreshExpenseData = () => {
    setRefreshDashboard(prev => prev + 1);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Expense Tracker</h1>
          
          <div className="flex items-center">
            {user && (
              <span className="mr-4 text-gray-700">
                Welcome, {user.first_name}
              </span>
            )}
            <ReceiptScannerButton onExpenseAdded={refreshExpenseData} />
            <ExpenseButton onClick={() => router.push('/settings')} variant="secondary" className="mr-4">
              Settings
            </ExpenseButton>
            
            <ExpenseButton onClick={handleLogout} variant="secondary">
              Logout
            </ExpenseButton>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <ExpenseFilter onMonthChange={handleMonthChange} selectedMonth={selectedMonth} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="p-4">
            <ExpenseSummary month={selectedMonth} />
          </Card>
          
          <Card className="p-4 md:col-span-2">
            <CategoryDistribution month={selectedMonth} />
          </Card>
        </div>
        
        <Card className="p-4">
          <MonthlyView month={selectedMonth} />
        </Card>
      </main>
    </div>
  );
}