
import React from 'react';

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default ErrorMessage;
