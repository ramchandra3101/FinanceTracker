// components/categories/CategoryManagement.tsx
'use client';

import { useState } from 'react';
import { useCategories } from '@/hooks/useCategories';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList'
import { ExpenseButton } from '@/components/ui/ExpenseButton';
import Card  from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Category } from '@/types';

const CategoryManagement: React.FC = () => {
  const { categories, isLoading, error, fetchCategories } = useCategories();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  const handleAddCategory = () => {
    setIsAddModalOpen(true);
  };
  
  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
  };
  
  const handleFormSuccess = () => {
    setIsAddModalOpen(false);
    setEditingCategory(null);
    fetchCategories();
  };
  
  const handleCancelEdit = () => {
    setEditingCategory(null);
  };
  
  const handleCancelAdd = () => {
    setIsAddModalOpen(false);
  };
  
  const incomeCategories = categories.filter(cat => cat.is_income);
  const expenseCategories = categories.filter(cat => !cat.is_income);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl  text-gray-900 font-semibold">Categories</h2>
        <ExpenseButton onClick={handleAddCategory}>Add Category</ExpenseButton>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-4">
            <h3 className="text-lg  text-gray-900 font-medium mb-4">Expense Categories</h3>
            {expenseCategories.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No expense categories found</p>
            ) : (
              <CategoryList 
                categories={expenseCategories} 
                onEdit={handleEditCategory}
                onCategoryUpdated={fetchCategories}
              />
            )}
          </Card>
          
          <Card className="p-4">
            <h3 className="text-lg font-medium mb-4">Income Categories</h3>
            {incomeCategories.length === 0 ? (
              <p className="text-gray-900 text-center py-4">No income categories found</p>
            ) : (
              <CategoryList 
                categories={incomeCategories} 
                onEdit={handleEditCategory}
                onCategoryUpdated={fetchCategories}
              />
            )}
          </Card>
        </div>
      )}
      
      {/* Add Category Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={handleCancelAdd}
        title="Add New Category"
      >
        <CategoryForm
          onSuccess={handleFormSuccess}
          onCancel={handleCancelAdd}
        />
      </Modal>
      
      {/* Edit Category Modal */}
      <Modal
        isOpen={!!editingCategory}
        onClose={handleCancelEdit}
        title="Edit Category"
      >
        {editingCategory && (
          <CategoryForm
            categoryId={editingCategory.category_id}
            initialValues={editingCategory}
            onSuccess={handleFormSuccess}
            onCancel={handleCancelEdit}
          />
        )}
      </Modal>
    </div>
  );
};

export default CategoryManagement;