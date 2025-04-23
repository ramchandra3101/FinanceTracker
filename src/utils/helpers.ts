// utils/helpers.ts
/**
 * Generate random color in hex format
 */
export const generateRandomColor = (): string => {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
};

/**
 * Calculate date range for the current month
 */
export const getCurrentMonthRange = (): { startDate: string; endDate: string } => {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
  };
};

/**
 * Group expenses by day for calendar view
 */
interface Expense {
  expense_date: string;
  [key: string]: any; // Allow additional properties
}

export const groupExpensesByDay = (expenses: Expense[]): Record<string, Expense[]> => {
  return expenses.reduce((grouped: Record<string, Expense[]>, expense: Expense) => {
    const date = expense.expense_date.split('T')[0];

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(expense);
    return grouped;
  }, {});
};

/**
 * Calculate monthly statistics from expenses
 */
interface MonthlyStats {
  totalAmount: number;
  averageAmount: number;
  highestExpense: Expense | null;
  lowestExpense: Expense | null;
  mostCommonCategory: string | null;
}

export const calculateMonthlyStats = (expenses: Expense[]): MonthlyStats => {
  if (!expenses.length) {
    return {
      totalAmount: 0,
      averageAmount: 0,
      highestExpense: null,
      lowestExpense: null,
      mostCommonCategory: null,
    };
  }

  const totalAmount = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
  const averageAmount = totalAmount / expenses.length;

  // Find highest and lowest expenses
  const sortedByAmount = [...expenses].sort((a, b) => (b.amount || 0) - (a.amount || 0));
  const highestExpense = sortedByAmount[0];
  const lowestExpense = sortedByAmount[sortedByAmount.length - 1];

  // Find most common category
  const categoryCounts = expenses.reduce((counts: Record<string, number>, expense: Expense) => {
    const category_id = expense.category_id;
    if (category_id) {
      counts[category_id] = (counts[category_id] || 0) + 1;
    }
    return counts;
  }, {});

  let mostCommonCategoryId: string | null = null;
  let maxCount = 0;

  Object.entries(categoryCounts).forEach(([category_id, count]) => {
    if (count > maxCount) {
      mostCommonCategoryId = category_id;
      maxCount = count;
    }
  });

  const mostCommonCategory = expenses.find(
    expense => expense.category === mostCommonCategoryId
  )?.expense_category || null;

  return {
    totalAmount,
    averageAmount,
    highestExpense,
    lowestExpense,
    mostCommonCategory,
  };
};