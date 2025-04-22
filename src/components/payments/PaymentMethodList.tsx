// components/payments/PaymentMethodList.tsx
'use client';

import { useState } from 'react';
import { ExpenseButton } from '@/components/ui/ExpenseButton';
import { Modal } from '@/components/ui/Modal';
import { deletePaymentMethod } from '@/services/api';
import { PaymentMethod } from '@/types';

interface PaymentMethodListProps {
  paymentMethods: PaymentMethod[];
  onEdit: (paymentMethod: PaymentMethod) => void;
  onPaymentMethodUpdated: () => void;
}

const PaymentMethodList: React.FC<PaymentMethodListProps> = ({ 
  paymentMethods, 
  onEdit, 
  onPaymentMethodUpdated 
}) => {
  const [deletingPaymentMethod, setDeletingPaymentMethod] = useState<PaymentMethod | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDeleteClick = (paymentMethod: PaymentMethod) => {
    setDeletingPaymentMethod(paymentMethod);
  };
  
  const handleCancelDelete = () => {
    setDeletingPaymentMethod(null);
  };
  
  const handleConfirmDelete = async () => {
    if (!deletingPaymentMethod) return;
    
    try {
      setIsDeleting(true);
      await deletePaymentMethod(deletingPaymentMethod.payment_method_id);
      onPaymentMethodUpdated();
    } catch (error) {
      console.error('Error deleting payment method:', error);
    } finally {
      setIsDeleting(false);
      setDeletingPaymentMethod(null);
    }
  };
  
  return (
    <div>
      <ul className="divide-y divide-gray-200">
        {paymentMethods.map(paymentMethod => (
          <li key={paymentMethod.payment_method_id} className="py-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">{paymentMethod.name}</span>
                {paymentMethod.bank_name && (
                  <span className="ml-2 text-sm text-gray-500">
                    {paymentMethod.bank_name}
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                <ExpenseButton
                  variant="secondary"
                  size="sm"
                  onClick={() => onEdit(paymentMethod)}
                >
                  Edit
                </ExpenseButton>
                <ExpenseButton
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteClick(paymentMethod)}
                >
                  Delete
                </ExpenseButton>
              </div>
            </div>
          </li>
        ))}
      </ul>
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deletingPaymentMethod}
        onClose={handleCancelDelete}
        title="Delete Payment Method"
      >
        <div>
          <p className="mb-4">
            Are you sure you want to delete the payment method "{deletingPaymentMethod?.name}"?
          </p>
          <p className="mb-4 text-yellow-600">
            Warning: This will remove the payment method from all related expenses.
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

export default PaymentMethodList;