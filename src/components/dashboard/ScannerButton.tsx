// components/dashboard/ReceiptScannerButton.tsx
'use client';

import { useState } from 'react';
import { ExpenseButton } from '@/components/ui/ExpenseButton';
import { Modal } from '@/components/ui/Modal';
import ReceiptScanner from '../expenses/ReceiptScanner';

interface ReceiptScannerButtonProps {
  onExpenseAdded: () => void;
}

const ReceiptScannerButton: React.FC<ReceiptScannerButtonProps> = ({ onExpenseAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const handleExpenseAdded = () => {
    closeModal();
    onExpenseAdded(); // Call the parent component's refresh function
  };
  
  return (
    <>
      <ExpenseButton 
        onClick={openModal}
        className="flex items-center mr-4"
        variant="secondary"
      >
        <svg 
          className="w-5 h-5 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
          />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" 
          />
        </svg>
        Scan Receipt
      </ExpenseButton>
      
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Scan Receipt"
      >
        <ReceiptScanner onClose={handleExpenseAdded} />
      </Modal>
    </>
  );
};

export default ReceiptScannerButton;