// types/index.ts
export interface User {
    user_id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    created_at: string;
    last_logged?: string;
  }
  
  export interface Category {
    category_id: string;
    user_id: number;
    name: string;
    icon?: string;
    color?: string;
    is_default: boolean;
    is_income: boolean;
  }
  
  export interface PaymentMethod {
    payment_method_id: string;
    user_id: number;
    name: string;
    type: string;
    bank_name?: string;
  }
  
  export interface Expense {
    expense_id: number;
    user_id: number;
    category: number;
    payment_method_id: number;
    amount: number;
    description?: string;
    expense_date: string;
    created_at: string;
    updated_at?: string;
    is_recurring: boolean;
    receipt?: string;
    notes?: string;
    
    // Relations - populated when fetched
    expense_category?: Category;
    payment_method?: PaymentMethod;
  }
  
  export interface ExpenseFilters {
    start_date?: string;
    end_date?: string;
    category_id?: number;
    min_amount?: number;
    max_amount?: number;
    is_recurring?: boolean;
  }
  
  export interface APIResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    count?: number;
    total_amount?: number;
  }