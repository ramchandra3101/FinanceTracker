
import React, { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  variant?: Variant;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  onClick,
  isLoading = false,
  disabled = false,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseStyles =
    'px-4 py-2 rounded-md font-medium focus:outline-none transition-colors duration-200';

  const variants: Record<Variant, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-300',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${
        isLoading || disabled ? 'opacity-70 cursor-not-allowed' : ''
      } ${className}`}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;


