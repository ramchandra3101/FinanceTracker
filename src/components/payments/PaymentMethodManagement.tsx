// components/payments/PaymentMethodManagement.tsx
'use client';

import { useState } from 'react';
import { usePaymentMethods } from '@/hooks/usePaymentMethods';
import PaymentMethodForm from './paymentMethodForm';
import PaymentMethodList from './PaymentMethodList';
import { ExpenseButton } from '@/components/ui/ExpenseButton';
import  Card  from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { PaymentMethod } from '@/types';

const PaymentMethodManagement: React.FC = () => {
  const { paymentMethods, isLoading, error, fetchPaymentMethods } = usePaymentMethods();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPaymentMethod, setEditingPaymentMethod] = useState<PaymentMethod | null>(null);
  
  const handleAddPaymentMethod = () => {
    setIsAddModalOpen(true);
  };
  
  const handleEditPaymentMethod = (paymentMethod: PaymentMethod) => {
    setEditingPaymentMethod(paymentMethod);
  };
  
  const handleFormSuccess = () => {
    setIsAddModalOpen(false);
    setEditingPaymentMethod(null);
    fetchPaymentMethods();
  };
  
  const handleCancelEdit = () => {
    setEditingPaymentMethod(null);
  };
  
  const handleCancelAdd = () => {
    setIsAddModalOpen(false);
  };
  
  // Group payment methods by type
  const groupedPaymentMethods = paymentMethods.reduce((acc, method) => {
    if (!acc[method.type]) {
      acc[method.type] = [];
    }
    acc[method.type].push(method);
    return acc;
  }, {} as Record<string, PaymentMethod[]>);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl text-gray-900 font-semibold">Payment Methods</h2>
        <ExpenseButton onClick={handleAddPaymentMethod}>Add Payment Method</ExpenseButton>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div>
      ) : paymentMethods.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-red-900 mb-4">You don't have any payment methods yet.</p>
          <ExpenseButton onClick={handleAddPaymentMethod}>Add Your First Payment Method</ExpenseButton>
        </Card>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedPaymentMethods).map(([type, methods]) => (
            <Card key={type} className="p-4 text-gray-900">
              <h3 className="text-lg font-medium mb-4">{type}</h3>
              <PaymentMethodList 
                paymentMethods={methods}
                onEdit={handleEditPaymentMethod}
                onPaymentMethodUpdated={fetchPaymentMethods}
              />
            </Card>
          ))}
        </div>
      )}
      
      {/* Add Payment Method Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={handleCancelAdd}
        title="Add New Payment Method"
      >
        <PaymentMethodForm
          onSuccess={handleFormSuccess}
          onCancel={handleCancelAdd}
        />
      </Modal>
      
      {/* Edit Payment Method Modal */}
      <Modal
        isOpen={!!editingPaymentMethod}
        onClose={handleCancelEdit}
        title="Edit Payment Method"
      >
        {editingPaymentMethod && (
          <PaymentMethodForm
            paymentMethodId={editingPaymentMethod.payment_method_id}
            initialValues={editingPaymentMethod}
            onSuccess={handleFormSuccess}
            onCancel={handleCancelEdit}
          />
        )}
      </Modal>
    </div>
  );
};

export default PaymentMethodManagement;