// components/ui/DatePicker.tsx
import React from 'react';

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({ error, className = '', ...props }) => {
  return (
    <div className="w-full">
      <input
        type="date"
        className={`mt-1 block w-full rounded-md ${
          error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
        } shadow-sm sm:text-sm ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};