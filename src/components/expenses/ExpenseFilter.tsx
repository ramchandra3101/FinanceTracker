// components/expenses/ExpenseFilter.tsx
'use client';

import { useState, useEffect } from 'react';
import { useCategories } from '@/hooks/useCategories';
import { DatePicker } from '@/components/ui/DatePicker';
import { Select } from '@/components/ui/Select';
import { ExpenseButton } from '@/components/ui/ExpenseButton';

interface ExpenseFilterProps {
  onMonthChange: (date: Date) => void;
  selectedMonth: Date;
}

const ExpenseFilter: React.FC<ExpenseFilterProps> = ({ onMonthChange, selectedMonth }) => {
  const months = Array.from({ length: 12 }, (_, i) => new Date(2023, i, 1));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);
  
  const [year, setYear] = useState(selectedMonth.getFullYear());
  const [month, setMonth] = useState(selectedMonth.getMonth());
  
  useEffect(() => {
    setYear(selectedMonth.getFullYear());
    setMonth(selectedMonth.getMonth());
  }, [selectedMonth]);
  
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value);
    setMonth(newMonth);
    onMonthChange(new Date(year, newMonth, 1));
  };
  
  const handleYearChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value);
    setYear(newYear);
    onMonthChange(new Date(newYear, month, 1));
  };
  
  const handlePreviousMonth = () => {
    const date = new Date(year, month, 1);
    date.setMonth(date.getMonth() - 1);
    onMonthChange(date);
  };
  
  const handleNextMonth = () => {
    const date = new Date(year, month, 1);
    date.setMonth(date.getMonth() + 1);
    onMonthChange(date);
  };
  
  const handleCurrentMonth = () => {
    const today = new Date();
    onMonthChange(new Date(today.getFullYear(), today.getMonth(), 1));
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-2">
          <ExpenseButton onClick={handlePreviousMonth} variant="secondary" size="sm">
            &#8592;
          </ExpenseButton>
          
          <div className="flex space-x-2">
            <Select
              id="month-select"
              value={month}
              onChange={handleMonthChange}
              className="w-40"
            >
              {months.map((monthDate, index) => (
                <option key={index} value={index}>
                  {monthDate.toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </Select>
            
            <Select
              id="year-select"
              value={year}
              onChange={handleYearChange}
              className="w-28"
            >
              {years.map((yearNum) => (
                <option key={yearNum} value={yearNum}>
                  {yearNum}
                </option>
              ))}
            </Select>
          </div>
          
          <ExpenseButton onClick={handleNextMonth} variant="secondary" size="sm">
            &#8594;
          </ExpenseButton>
        </div>
        
        <ExpenseButton onClick={handleCurrentMonth} variant="primary" size="sm">
          Current Month
        </ExpenseButton>
      </div>
    </div>
  );
};

export default ExpenseFilter;