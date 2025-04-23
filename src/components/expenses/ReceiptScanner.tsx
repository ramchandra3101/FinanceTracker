// components/dashboard/ReceiptScanner.tsx
'use client';

import { useState, useRef } from 'react';
import { ExpenseButton } from '@/components/ui/ExpenseButton';
import ExpenseForm from '@/components/dashboard/ExpenseForm';
import { Modal } from '@/components/ui/Modal';

interface ReceiptScannerProps {
  onClose?: () => void;
}

const ReceiptScanner: React.FC<ReceiptScannerProps> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scannedData, setScannedData] = useState<any>(null);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validate file type
      if (!selectedFile.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setError(null);
    }
  };
  
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      
      // Validate file type
      if (!droppedFile.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      
      setFile(droppedFile);
      setPreviewUrl(URL.createObjectURL(droppedFile));
      setError(null);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const handleScanReceipt = async () => {
    if (!file) {
      setError('Please select a receipt image first');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('receipt', file);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      const response = await fetch('http://localhost:8000/api/expenses/preview', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to scan receipt');
      }
      
      // Store scanned data and show the expense form
      setScannedData(data.data);
      setShowExpenseForm(true);
    } catch (error) {
      console.error('Error scanning receipt:', error);
      setError(error instanceof Error ? error.message : 'Failed to scan receipt');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleExpenseAdded = () => {
    // Close the receipt scanner or reset the state
    if (onClose) {
      onClose();
    } else {
      setFile(null);
      setPreviewUrl(null);
      setScannedData(null);
      setShowExpenseForm(false);
    }
  };
  
  if (showExpenseForm) {
    return (
      <div>
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <h3 className="text-green-800 font-medium">Receipt Scanned Successfully</h3>
          <p className="text-green-700 text-sm mt-1">
            Review the details below and make any necessary adjustments before saving.
          </p>
        </div>
        
        <ExpenseForm 
          initialValues={scannedData} 
          onSuccess={handleExpenseAdded}
        />
      </div>
    );
  }
  
  return (
    <div>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors"
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          capture="environment"
          className="hidden"
        />
        
        {previewUrl ? (
          <div className="mt-2">
            <img
              src={previewUrl}
              alt="Receipt preview"
              className="max-h-64 mx-auto rounded-md"
            />
            <p className="mt-2 text-sm text-gray-600">{file?.name}</p>
          </div>
        ) : (
          <div className="py-6">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-1 text-sm text-gray-600">
              Click or drag and drop to upload a receipt image
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Supported formats: JPG, PNG, JPEG
            </p>
          </div>
        )}
      </div>
      
      {error && (
        <div className="mt-2 text-sm text-red-600">
          {error}
        </div>
      )}
      
      <div className="mt-4 flex justify-end">
        <ExpenseButton
          onClick={handleScanReceipt}
          isLoading={isLoading}
          disabled={!file || isLoading}
        >
          {isLoading ? 'Scanning...' : 'Scan Receipt'}
        </ExpenseButton>
      </div>
    </div>
  );
};

export default ReceiptScanner;