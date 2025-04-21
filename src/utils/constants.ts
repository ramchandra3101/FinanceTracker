// utils/constants.ts
export const PAYMENT_METHOD_TYPES = [
    'Cash',
    'Credit Card',
    'Debit Card',
    'Bank Transfer',
    'Mobile Payment',
    'Online Payment',
    'Check',
    'Other'
  ];
  
  export const DEFAULT_CATEGORIES = [
    { name: 'Food & Dining', icon: '🍔', color: '#4CAF50', is_income: false },
    { name: 'Transportation', icon: '🚗', color: '#2196F3', is_income: false },
    { name: 'Housing', icon: '🏠', color: '#9C27B0', is_income: false },
    { name: 'Entertainment', icon: '🎬', color: '#E91E63', is_income: false },
    { name: 'Shopping', icon: '🛍️', color: '#FF9800', is_income: false },
    { name: 'Utilities', icon: '💡', color: '#607D8B', is_income: false },
    { name: 'Healthcare', icon: '⚕️', color: '#F44336', is_income: false },
    { name: 'Personal Care', icon: '💇', color: '#795548', is_income: false },
    { name: 'Education', icon: '📚', color: '#009688', is_income: false },
    { name: 'Travel', icon: '✈️', color: '#3F51B5', is_income: false },
    { name: 'Salary', icon: '💰', color: '#4CAF50', is_income: true },
    { name: 'Gift', icon: '🎁', color: '#E91E63', is_income: true },
    { name: 'Investment', icon: '📈', color: '#2196F3', is_income: true },
    { name: 'Other Income', icon: '💲', color: '#607D8B', is_income: true }
  ];