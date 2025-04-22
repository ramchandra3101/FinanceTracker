// components/dashboard/ExpenseList.tsx
'use client';

import { useState } from 'react';
import ExpenseItem from '@/components/expenses/ExpenseItem';
import ExpenseForm from '@/components/dashboard/ExpenseForm';
import { Modal } from '@/components/ui/Modal';
import { formatCurrency } from '@/services/formatters';
import { Expense } from '@/types';

interface ExpenseListProps {
  expenses: Expense[];
  onExpenseUpdated: () => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onExpenseUpdated }) => {
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleEditClick = (expense: Expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingExpense(null);
  };
  
  const handleExpenseUpdated = () => {
    closeModal();
    onExpenseUpdated();
  };
  
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left  text-xs font-semibold text-gray-900 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Payment Method</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-900 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y  text-gray-900 divide-gray-200">
            {expenses.map((expense) => (
              <ExpenseItem 
                key={expense.expense_id} 
                expense={expense} 
                onEdit={() => handleEditClick(expense)}
                onDelete={onExpenseUpdated}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="px-6 py-4 text-right  text-gray-900 font-medium">Total:</td>
              <td className="px-6 py-4  text-gray-900 font-bold">
                {formatCurrency(expenses.reduce((sum, expense) => sum + expense.amount, 0))}
              </td>
              <td colSpan={2}></td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Edit Expense"
      >
        {editingExpense && (
          <ExpenseForm
            expenseId={editingExpense.expense_id}
            initialValues={editingExpense}
            onSuccess={handleExpenseUpdated}
          />
        )}
      </Modal>
    </div>
  );
};

export default ExpenseList;