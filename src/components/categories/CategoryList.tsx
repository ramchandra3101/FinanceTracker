// components/categories/CategoryList.tsx
'use client';

import { useState } from 'react';
import { ExpenseButton } from '@/components/ui/ExpenseButton';
import { Modal } from '@/components/ui/Modal';
import { deleteCategory } from '@/services/api';
import { Category } from '@/types';

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onCategoryUpdated: () => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ 
  categories, 
  onEdit, 
  onCategoryUpdated 
}) => {
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDeleteClick = (category: Category) => {
    setDeletingCategory(category);
  };
  
  const handleCancelDelete = () => {
    setDeletingCategory(null);
  };
  
  const handleConfirmDelete = async () => {
    if (!deletingCategory) return;
    
    try {
      setIsDeleting(true);
      await deleteCategory(deletingCategory.category_id);
      onCategoryUpdated();
    } catch (error) {
      console.error('Error deleting category:', error);
    } finally {
      setIsDeleting(false);
      setDeletingCategory(null);
    }
  };
  
  return (
    <div>
      <ul className="divide-y divide-gray-200">
        {categories.map(category => (
          <li key={category.category_id} className="py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {category.icon && (
                  <span className="mr-2 text-xl">{category.icon}</span>
                )}
                <span 
                  className="px-2 py-1 rounded-md" 
                  style={{ backgroundColor: category.color, opacity: 0.2 }}
                >
                  {category.name}
                </span>
                {category.is_default && (
                  <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                    Default
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                <ExpenseButton
                  variant="secondary"
                  size="sm"
                  onClick={() => onEdit(category)}
                >
                  Edit
                </ExpenseButton>
                {!category.is_default && (
                  <ExpenseButton
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteClick(category)}
                  >
                    Delete
                  </ExpenseButton>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deletingCategory}
        onClose={handleCancelDelete}
        title="Delete Category"
      >
        <div>
          <p className="mb-4">
            Are you sure you want to delete the category "{deletingCategory?.name}"?
          </p>
          <p className="mb-4 text-yellow-600">
            Warning: This will remove the category from all related expenses.
          </p>
          <div className="flex justify-end space-x-3">
            <ExpenseButton
              variant="secondary"
              onClick={handleCancelDelete}
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
    </div>
  );
};

export default CategoryList;