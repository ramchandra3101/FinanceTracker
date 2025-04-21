// hooks/useCategories.ts
import { useState, useEffect, useCallback } from 'react';
import { fetchCategories as fetchCategoriesAPI } from '@/services/api';
import { Category } from '@/types';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchCategories = useCallback(async (filters = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetchCategoriesAPI(filters);
      
      if (response.success) {
        setCategories(response.categories || []);
      } else {
        setError(response.message || 'Failed to fetch categories');
        setCategories([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching categories');
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  
  return {
    categories,
    isLoading,
    error,
    fetchCategories,
  };
};