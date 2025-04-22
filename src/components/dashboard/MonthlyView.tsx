// components/dashboard/MonthlyView.tsx
'use client';

import { useState, useEffect } from 'react';
import ExpenseList from './ExpenseList'
import ExpenseForm from './ExpenseForm';
import { ExpenseButton } from '@/components/ui/ExpenseButton';
import { Modal } from '@/components/ui/Modal';
import { useExpenses } from '@/hooks/useExpenses';


interface MonthlyViewProps {
  month: Date;
}

const MonthlyView: React.FC<MonthlyViewProps> = ({ month }) => {
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const { expenses, isLoading, error, fetchExpenses } = useExpenses();
  
  useEffect(() => {
    const startDate = new Date(month.getFullYear(), month.getMonth(), 1);
    const endDate = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    
    fetchExpenses({
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0]
    });
  }, [month, fetchExpenses]);
  
  const handleAddExpense = () => {
    setIsAddExpenseModalOpen(true);
  };
  
  const closeModal = () => {
    setIsAddExpenseModalOpen(false);
  };
  
  const handleExpenseAdded = () => {
    closeModal();
    fetchExpenses();
  };
  
  const monthName = month.toLocaleString('default', { month: 'long' });
  const year = month.getFullYear();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl  text-gray-900 font-semibold">{monthName} {year} Expenses</h2>
        <ExpenseButton onClick={handleAddExpense}>Add Expense</ExpenseButton>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div>
      ) : expenses.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No expenses found for {monthName} {year}.</p>
          <p className="mt-2">Click "Add Expense" to create your first entry.</p>
        </div>
      ) : (
        <ExpenseList expenses={expenses} onExpenseUpdated={fetchExpenses} />
      )}
      
      <Modal 
        isOpen={isAddExpenseModalOpen} 
        onClose={closeModal}
        title="Add New Expense"
      >
        <ExpenseForm 
          onSuccess={handleExpenseAdded}
          initialDate={month}
        />
      </Modal>
    </div>
  );
};

export default MonthlyView;