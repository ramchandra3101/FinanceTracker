// services/api.ts
const API_URL = 'http://localhost:8000/api';

// Define types for the data structures
interface Expense {
  id?: string;
  name: string;
  amount: number;
  categoryId: string;
  date: string;
}

interface Category {
  id?: string;
  name: string;
  description?: string;
}

interface PaymentMethod {
  id?: string;
  name: string;
  details?: string;
}

interface Filters {
  [key: string]: string | number | undefined | null;
}

// Generic fetch function with authentication
async function fetchWithAuth<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Authentication token not found');
  }
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };
  
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
}

// Expense APIs
export async function fetchExpenses(filters: Filters = {}): Promise<Expense[]> {
  const queryParams = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value.toString());
    }
  });
  
  const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
  return fetchWithAuth<Expense[]>(`/expenses${query}`);
}

export async function createExpense(expenseData: Expense): Promise<Expense> {
  return fetchWithAuth<Expense>('/expenses', {
    method: 'POST',
    body: JSON.stringify(expenseData),
  });
}

export async function updateExpense(id: string, expenseData: Expense): Promise<Expense> {
  return fetchWithAuth<Expense>(`/expenses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(expenseData),
  });
}

export async function deleteExpense(id: string): Promise<void> {
  return fetchWithAuth<void>(`/expenses/${id}`, {
    method: 'DELETE',
  });
}

// Category APIs
export async function fetchCategories(filters: Filters = {}): Promise<Category[]> {
  const queryParams = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value.toString());
    }
  });
  
  const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
  return fetchWithAuth<Category[]>(`/categories/getCategories${query}`);
}

export async function createCategory(categoryData: Category): Promise<Category> {
  return fetchWithAuth<Category>('/categories/createCategory', {
    method: 'POST',
    body: JSON.stringify(categoryData),
  });
}

export async function updateCategory(id: string, categoryData: Category): Promise<Category> {
  return fetchWithAuth<Category>(`/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(categoryData),
  });
}

export async function deleteCategory(id: string): Promise<void> {
  return fetchWithAuth<void>(`/categories/${id}`, {
    method: 'DELETE',
  });
}

// Payment Method APIs
export async function fetchPaymentMethods(): Promise<PaymentMethod[]> {
  return fetchWithAuth<PaymentMethod[]>('/payment-methods');
}

export async function fetchPaymentMethodById(id: string): Promise<PaymentMethod> {
  return fetchWithAuth<PaymentMethod>(`/payment-methods/${id}`);
}

export async function createPaymentMethod(paymentMethodData: PaymentMethod): Promise<PaymentMethod> {
  return fetchWithAuth<PaymentMethod>('/payment-methods', {
    method: 'POST',
    body: JSON.stringify(paymentMethodData),
  });
}

export async function updatePaymentMethod(id: string, paymentMethodData: PaymentMethod): Promise<PaymentMethod> {
  return fetchWithAuth<PaymentMethod>(`/payment-methods/${id}`, {
    method: 'PUT',
    body: JSON.stringify(paymentMethodData),
  });
}

export async function deletePaymentMethod(id: string): Promise<void> {
  return fetchWithAuth<void>(`/payment-methods/${id}`, {
    method: 'DELETE',
  });
}