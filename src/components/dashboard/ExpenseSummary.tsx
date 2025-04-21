// components/dashboard/ExpenseSummary.tsx
'use client';

import { useEffect, useState } from 'react';
import { useExpenses } from '@/hooks/useExpenses';
import { formatCurrency } from '@/services/formatters';

interface ExpenseSummaryProps {
  month: Date;
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ month }) => {
  const { expenses, isLoading, error, fetchExpenses } = useExpenses();
  const [previousMonthData, setPreviousMonthData] = useState({
    totalAmount: 0,
    count: 0,
  });
  
  useEffect(() => {
    const startDate = new Date(month.getFullYear(), month.getMonth(), 1);
    const endDate = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    
    fetchExpenses({
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0]
    });
    
    // Fetch previous month data for comparison
    const previousMonthStart = new Date(month.getFullYear(), month.getMonth() - 1, 1);
    const previousMonthEnd = new Date(month.getFullYear(), month.getMonth(), 0);
    
    const fetchPreviousMonthData = async () => {
      try {
        const response = await fetch(`/api/expenses?start_date=${previousMonthStart.toISOString().split('T')[0]}&end_date=${previousMonthEnd.toISOString().split('T')[0]}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        const data = await response.json();
        if (data.success) {
          setPreviousMonthData({
            totalAmount: data.total_amount || 0,
            count: data.count || 0
          });
        }
      } catch (error) {
        console.error('Error fetching previous month data:', error);
      }
    };
    
    fetchPreviousMonthData();
  }, [month, fetchExpenses]);
  
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const amountChange = totalAmount - previousMonthData.totalAmount;
  const percentChange = previousMonthData.totalAmount 
    ? (amountChange / previousMonthData.totalAmount) * 100 
    : 0;
  
  const monthName = month.toLocaleString('default', { month: 'long' });
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">{monthName} Summary</h3>
      
      {isLoading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="text-gray-500 text-sm">Total Expenses</p>
            <p className="text-2xl font-bold">{formatCurrency(totalAmount)}</p>
            
            <div className={`text-sm flex items-center mt-1 ${amountChange > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {amountChange !== 0 && (
                <>
                  <span>{amountChange > 0 ? '↑' : '↓'}</span>
                  <span className="ml-1">
                    {formatCurrency(Math.abs(amountChange))} ({Math.abs(percentChange).toFixed(1)}%)
                    {' from last month'}
                  </span>
                </>
              )}
              {amountChange === 0 && previousMonthData.totalAmount > 0 && (
                <span>No change from last month</span>
              )}
            </div>
          </div>
          
          <div>
            <p className="text-gray-500 text-sm">Number of Transactions</p>
            <p className="text-xl font-semibold">{expenses.length}</p>
            
            <div className={`text-sm flex items-center mt-1 ${expenses.length > previousMonthData.count ? 'text-yellow-600' : expenses.length < previousMonthData.count ? 'text-blue-600' : 'text-gray-600'}`}>
              {expenses.length !== previousMonthData.count && (
                <>
                  <span>{expenses.length > previousMonthData.count ? '↑' : '↓'}</span>
                  <span className="ml-1">
                    {Math.abs(expenses.length - previousMonthData.count)} transactions
                    {' from last month'}
                  </span>
                </>
              )}
              {expenses.length === previousMonthData.count && previousMonthData.count > 0 && (
                <span>Same as last month</span>
              )}
            </div>
          </div>
          
          {expenses.length > 0 && (
            <div>
              <p className="text-gray-500 text-sm">Average Transaction</p>
              <p className="text-lg font-semibold">
                {formatCurrency(totalAmount / expenses.length)}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExpenseSummary;