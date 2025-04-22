// components/payments/PaymentMethodForm.tsx
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { ExpenseButton } from '@/components/ui/ExpenseButton';
import { createPaymentMethod, updatePaymentMethod } from '@/services/api';
import { PAYMENT_METHOD_TYPES } from '@/utils/constants';
import { PaymentMethod } from '@/types';

interface PaymentMethodFormProps {
  paymentMethodId?: string;
  initialValues?: Partial<PaymentMethod>;
  onSuccess: () => void;
  onCancel?: () => void;
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
  paymentMethodId,
  initialValues,
  onSuccess,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: initialValues?.name || '',
    type: initialValues?.type || '',
    bank_name: initialValues?.bank_name || ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Payment method name is required';
    }
    
    if (!formData.type) {
      newErrors.type = 'Payment method type is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      
      const paymentMethodData = {
        ...formData
      };
      
      if (paymentMethodId) {
        await updatePaymentMethod(paymentMethodId, paymentMethodData);
      } else {
        await createPaymentMethod(paymentMethodData);
      }
      
      onSuccess();
    } catch (error) {
      console.error('Error saving payment method:', error);
      setErrors(prev => ({
        ...prev,
        form: 'Failed to save payment method. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const shouldShowBankField = 
    formData.type === 'Credit Card' || 
    formData.type === 'Debit Card' || 
    formData.type === 'Bank Transfer' ||
    formData.type === 'Check';
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.form && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md">
          {errors.form}
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Payment Method Name *
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="e.g., My Credit Card"
        />
      </div>
      
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Payment Method Type *
        </label>
        <Select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          error={errors.type}
        >
          <option value="">Select Type</option>
          {PAYMENT_METHOD_TYPES.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </div>
      
      {shouldShowBankField && (
        <div>
          <label htmlFor="bank_name" className="block text-sm font-medium text-gray-700">
            Bank Name
          </label>
          <Input
            id="bank_name"
            name="bank_name"
            value={formData.bank_name}
            onChange={handleChange}
            placeholder="e.g., Chase Bank"
          />
        </div>
      )}
      
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
          {paymentMethodId ? 'Update Payment Method' : 'Create Payment Method'}
        </ExpenseButton>
      </div>
    </form>
  );
};

export default PaymentMethodForm;