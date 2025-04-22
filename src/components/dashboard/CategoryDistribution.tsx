'use client';

import { useEffect, useState } from 'react';
import { ExpenseChart } from '@/components/ui/ExpenseChart';
import { useExpenses } from '@/hooks/useExpenses';
import { formatCurrency } from '@/services/formatters';

interface CategoryDistributionProps {
  month: Date;
}

interface Expense {
  amount: number;
  expense_category?: {
    name: string;
    color: string;
  };
}

interface CategoryData {
  name: string;
  amount: number;
  color: string;
  value: number; // Required for chart component
  label: string; // Required for chart component
}

const CategoryDistribution: React.FC<CategoryDistributionProps> = ({ month }) => {
  const { expenses, isLoading, error, fetchExpenses } = useExpenses();
  const [chartData, setChartData] = useState<CategoryData[]>([]);

  useEffect(() => {
    const startDate = new Date(month.getFullYear(), month.getMonth(), 1);
    const endDate = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    fetchExpenses({
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
    });
  }, [month, fetchExpenses]);

  useEffect(() => {
    if (expenses.length > 0) {
      // Group expenses by category
      const categoryMap = expenses.reduce<Record<string, CategoryData>>((acc, expense) => {
        const categoryName = expense.expense_category?.name || 'Uncategorized';
        const categoryColor = expense.expense_category?.color || '#CBD5E0';

        if (!acc[categoryName]) {
          acc[categoryName] = {
            name: categoryName,
            amount: 0,
            color: categoryColor,
            value: 0, // Placeholder, will be updated later
            label: categoryName, // Placeholder, will be updated later
          };
        }

        acc[categoryName].amount += expense.amount;
        return acc;
      }, {});

      // Convert to array and sort by amount
      const categoryData = Object.values(categoryMap)
        .sort((a, b) => b.amount - a.amount)
        .map(category => ({
          ...category,
          value: category.amount, // Required for chart component
          label: category.name, // Required for chart component
        }));

      setChartData(categoryData);
    } else {
      setChartData([]);
    }
  }, [expenses]);

  const monthName = month.toLocaleString('default', { month: 'long' });

  return (
    <div>
      <h3 className="text-lg text-amber-950 font-extrabold mb-4">Spending by Category</h3>

      {isLoading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-3 rounded-md">{error}</div>
      ) : chartData.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No expense data available for {monthName}.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-64">
            <ExpenseChart
              type="pie"
              data={chartData}
              options={{
                legend: { position: 'bottom' },
                tooltips: {
                  callbacks: {
                    label: (tooltipItem: any, data: any) => {
                      const dataset = data.datasets[tooltipItem.datasetIndex];
                      const value = dataset.data[tooltipItem.index];
                      return `${data.labels[tooltipItem.index]}: ${formatCurrency(value as number)}`;
                    },
                  },
                },
              }}
            />
          </div>

          <div className="overflow-y-auto max-h-64">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="text-right text-xs font-extrabold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="text-right text-xs font-extrabold text-gray-500 uppercase tracking-wider">%</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((category, index) => {
                  const totalAmount = chartData.reduce((sum, cat) => sum + cat.amount, 0);
                  const percentage = (category.amount / totalAmount) * 100;

                  return (
                    <tr className="text-black font-bold"key={index}>
                      <td className="py-2 ">
                        <div className="flex  items-center">
                          <span
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: category.color }}
                          ></span>
                          {category.name}
                        </div>
                      </td>
                      <td className="py-2 text-right font-medium">{formatCurrency(category.amount)}</td>
                      <td className="py-2 text-right">{percentage.toFixed(1)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDistribution;