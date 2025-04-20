import { InputHTMLAttributes } from "react";
interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label :string;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
   label,
   type='text',
   name,
   value,
   onChange,
   error,
   required = false,
   className='',
    ...props
}) => {
    return (
        <div className={`w-full ${className}`}>
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2
                ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        
        </div>

    );
};
export default InputField;