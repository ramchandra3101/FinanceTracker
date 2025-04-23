// components/expenses/ExpenseItem.tsx
'use client';

import { useState } from 'react';
import { ExpenseButton } from '@/components/ui/ExpenseButton';
import { Modal } from '@/components/ui/Modal';
import { formatCurrency, formatDate } from '@/services/formatters';
import { deleteExpense } from '@/services/api';
import { Expense } from '@/types';

interface ExpenseItemProps {
  expense: Expense;
  onEdit: () => void;
  onDelete: () => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  
  const handleDeleteClick = () => {
    setIsConfirmDeleteOpen(true);
  };
  
  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteExpense(expense.expense_id.toString());
      onDelete();
    } catch (error) {
      console.error('Error deleting expense:', error);
    } finally {
      setIsDeleting(false);
      setIsConfirmDeleteOpen(false);
    }
  };
  
  const getCategoryStyle = () => {
    const color = expense.expense_category?.color || '#CBD5E0';
    return {
      backgroundColor: color,
      opacity: 0.2,
      padding: '0.2rem 0.5rem',
      borderRadius: '0.25rem',
    };
  };
  
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(expense.expense_date)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center">
          {expense.expense_category?.icon && (
            <span className="mr-2">{expense.expense_category.icon}</span>
          )}
          <span style={getCategoryStyle()}>
            {expense.expense_category?.name || 'Uncategorized'}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {expense.description || '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        {formatCurrency(expense.amount)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {expense.Expense_payment_method?.name || '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end">
          <ExpenseButton
            variant="secondary"
            size="sm"
            onClick={onEdit}
            className="mr-2"
          >
            Edit
          </ExpenseButton>
          <ExpenseButton
            variant="danger"
            size="sm"
            onClick={handleDeleteClick}
          >
            Delete
          </ExpenseButton>
        </div>
      </td>
      
      <Modal
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        title="Confirm Delete"
      >
        <div>
          <p className="mb-4">Are you sure you want to delete this expense?</p>
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <p><strong>Date:</strong> {formatDate(expense.expense_date)}</p>
            <p><strong>Category:</strong> {expense.expense_category?.name || 'Uncategorized'}</p>
            <p><strong>Amount:</strong> {formatCurrency(expense.amount)}</p>
            {expense.description && <p><strong>Description:</strong> {expense.description}</p>}
          </div>
          <div className="flex justify-end">
            <ExpenseButton
              variant="secondary"
              onClick={() => setIsConfirmDeleteOpen(false)}
              className="mr-2"
            >
              Cancel
            </ExpenseButton>
            <ExpenseButton
              variant="danger"
              onClick={handleConfirmDelete}
              isLoading={isDeleting}
            >
              Delete
            </ExpenseButton>
          </div>
        </div>
      </Modal>
    </tr>
  );
};

export default ExpenseItem;