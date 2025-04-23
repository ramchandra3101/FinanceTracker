
'use client';

import { useState } from 'react';
import { useCategories } from '@/hooks/useCategories';
import { usePaymentMethods } from '@/hooks/usePaymentMethods';
import { createExpense, updateExpense } from '@/services/api';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { ExpenseButton } from '@/components/ui/ExpenseButton';
import { DatePicker } from '@/components/ui/DatePicker';
import { formatDateForInput } from '@/services/formatters';
import { Expense } from '@/types';

interface ExpenseFormProps {
  expenseId?: string;
  initialValues?: Partial<Expense>;
  initialDate?: Date;
  onSuccess: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ 
  expenseId, 
  initialValues, 
  initialDate = new Date(),
  onSuccess 
}) => {
  const [formData, setFormData] = useState({
    category_id: initialValues?.category_id || '',
    payment_method_id: initialValues?.payment_method_id || '',
    amount: initialValues?.amount?.toString() || '',
    description: initialValues?.description || '',
    expense_date: initialValues?.expense_date 
      ? formatDateForInput(new Date(initialValues.expense_date)) 
      : formatDateForInput(initialDate),
    is_recurring: initialValues?.is_recurring || false,
    notes: initialValues?.notes || ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { categories, isLoading: categoriesLoading } = useCategories();
  const { paymentMethods, isLoading: paymentMethodsLoading } = usePaymentMethods();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.category_id) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.payment_method_id) {
      newErrors.payment_method_id = 'Payment method is required';
    }
    
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }
    
    if (!formData.expense_date) {
      newErrors.expense_date = 'Date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      
      // Format the data for the API
      const expenseData = {
        ...formData,
        amount: parseFloat(formData.amount),
        
      };

      
      
      if (expenseId) {
        await updateExpense(expenseId.toString(), {
          ...expenseData,
          name: formData.description || 'Unnamed Expense',
          categoryId:formData.category_id,
          date: formData.expense_date,
        });
      } else {
        await createExpense({
          ...expenseData,
          name: formData.description || 'Unnamed Expense',
          categoryId: formData.category_id,
          date: formData.expense_date,
        });
      }
      
      onSuccess();
    } catch (error) {
      console.error('Error saving expense:', error);
      setErrors(prev => ({
        ...prev,
        form: 'Failed to save expense. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.form && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md">
          {errors.form}
        </div>
      )}
      
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category *
        </label>
        <Select
          id="category_id"
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          error={errors.category_id}
          disabled={categoriesLoading}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.name}
            </option>
          ))}
        </Select>
      </div>
      
      <div>
        <label htmlFor="payment_method_id" className="block text-sm font-medium text-gray-700">
          Payment Method *
        </label>
        <Select
          id="payment_method_id"
          name="payment_method_id"
          value={formData.payment_method_id}
          onChange={handleChange}
          error={errors.payment_method_id}
          disabled={paymentMethodsLoading}
        >
          <option value="">Select Payment Method</option>
          {paymentMethods.map((method) => (
            <option key={method.payment_method_id} value={method.payment_method_id}>
              {method.name}
            </option>
          ))}
        </Select>
      </div>
      
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount *
        </label>
        <Input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          value={formData.amount}
          onChange={handleChange}
          error={errors.amount}
          placeholder="0.00"
        />
      </div>
      
      <div>
        <label htmlFor="expense_date" className="block text-sm font-medium text-gray-700">
          Date *
        </label>
        <DatePicker
          id="expense_date"
          name="expense_date"
          value={formData.expense_date}
          onChange={handleChange}
          error={errors.expense_date}
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <Input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="What was this expense for?"
        />
      </div>
      
      <div className="flex items-center">
        <input
          id="is_recurring"
          name="is_recurring"
          type="checkbox"
          checked={formData.is_recurring}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="is_recurring" className="ml-2 block text-sm text-gray-700">
          Recurring Expense
        </label>
      </div>
      
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Additional notes about this expense"
        />
      </div>
      
      <div className="flex justify-end">
        <ExpenseButton
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {expenseId ? 'Update Expense' : 'Add Expense'}
        </ExpenseButton>
      </div>
    </form>
  );
};

export default ExpenseForm;