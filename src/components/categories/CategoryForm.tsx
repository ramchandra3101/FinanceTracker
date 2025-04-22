// components/categories/CategoryForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { ExpenseButton } from '@/components/ui/ExpenseButton';
import { createCategory, updateCategory } from '@/services/api';
import { generateRandomColor } from '@/utils/helpers';
import { Category } from '@/types';

interface CategoryFormProps {
  categoryId?: string;
  initialValues?: Partial<Category>;
  onSuccess: () => void;
  onCancel?: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  categoryId,
  initialValues,
  onSuccess,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: initialValues?.name || '',
    icon: initialValues?.icon || '',
    color: initialValues?.color || generateRandomColor(),
    is_income: initialValues?.is_income || false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Sample emoji options for category icons
  const emojiOptions = [
    '🍔', '🚗', '🏠', '🎬', '🛍️', '💡', '⚕️', '💇', '📚', '✈️',
    '💰', '🎁', '📈', '💲', '💻', '📱', '🏋️', '🛒', '💄', '🎯'
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
  
  const selectEmoji = (emoji: string) => {
    setFormData(prev => ({
      ...prev,
      icon: emoji
    }));
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      
      const categoryData = {
        ...formData
      };
      
      if (categoryId) {
        await updateCategory(categoryId, categoryData);
      } else {
        await createCategory(categoryData);
      }
      
      onSuccess();
    } catch (error) {
      console.error('Error saving category:', error);
      setErrors(prev => ({
        ...prev,
        form: 'Failed to save category. Please try again.'
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
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Category Name *
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="e.g., Food & Dining"
        />
      </div>
      
      <div>
        <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
          Icon
        </label>
        <Input
          id="icon"
          name="icon"
          value={formData.icon}
          onChange={handleChange}
          placeholder="Choose an emoji or enter custom"
        />
        
        <div className="mt-2 grid grid-cols-10 gap-2">
          {emojiOptions.map(emoji => (
            <button
              key={emoji}
              type="button"
              onClick={() => selectEmoji(emoji)}
              className={`h-8 w-8 flex items-center justify-center rounded hover:bg-gray-100 ${
                formData.icon === emoji ? 'bg-blue-100 border border-blue-500' : ''
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label htmlFor="color" className="block text-sm font-medium text-gray-700">
          Color
        </label>
        <div className="flex items-center space-x-2">
          <Input
            id="color"
            name="color"
            type="color"
            value={formData.color}
            onChange={handleChange}
            className="w-16 h-10 p-1"
          />
          <span className="text-sm text-gray-500">{formData.color}</span>
        </div>
      </div>
      
      <div className="flex items-center">
        <input
          id="is_income"
          name="is_income"
          type="checkbox"
          checked={formData.is_income}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="is_income" className="ml-2 block text-sm text-gray-700">
          This is an Income Category
        </label>
      </div>
      
      <div className="pt-2 flex justify-end space-x-3">
        {onCancel && (
          <ExpenseButton
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </ExpenseButton>
        )}
        
        <ExpenseButton
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {categoryId ? 'Update Category' : 'Create Category'}
        </ExpenseButton>
      </div>
    </form>
  );
};

export default CategoryForm;