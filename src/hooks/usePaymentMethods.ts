// hooks/usePaymentMethods.ts
import { useState, useEffect, useCallback } from 'react';
import { fetchPaymentMethods as fetchPaymentMethodsAPI } from '@/services/api';
import { PaymentMethod } from '@/types';

export const usePaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchPaymentMethods = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetchPaymentMethodsAPI();
      
      if (response.success) {
        setPaymentMethods(response.data || []);
      } else {
        setError(response.message || 'Failed to fetch payment methods');
        setPaymentMethods([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching payment methods');
      setPaymentMethods([]);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchPaymentMethods();
  }, [fetchPaymentMethods]);
  
  return {
    paymentMethods,
    isLoading,
    error,
    fetchPaymentMethods,
  };
};