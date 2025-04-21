// services/formatters.ts
export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };
  
  export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  export const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };
  
  export const getMonthName = (date: Date) => {
    return date.toLocaleString('default', { month: 'long' });
  };
  
  export const getMonthYearString = (date: Date) => {
    return `${getMonthName(date)} ${date.getFullYear()}`;
  };