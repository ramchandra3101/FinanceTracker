// hooks/useExpenses.ts
import { useState, useCallback } from 'react';
import { fetchExpenses as fetchExpensesAPI } from '@/services/api';
import { Expense } from '@/types';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchExpenses = useCallback(async (filters = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetchExpensesAPI(filters);
      
      if (response.success) {
        setExpenses(response.data || []);
      } else {
        setError(response.message || 'Failed to fetch expenses');
        setExpenses([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching expenses');
      setExpenses([]);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return {
    expenses,
    isLoading,
    error,
    fetchExpenses,
  };
};