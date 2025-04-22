// app/dashboard/settings/page.tsx
'use client';

import { useState } from 'react';
import  Card  from '@/components/ui/Card';
import CategoryManagement from '@/components/categories/CategoryManagement';
import PaymentMethodManagement from '@/components/payments/PaymentMethodManagement';

enum SettingsTab {
  Categories = 'categories',
  PaymentMethods = 'payment-methods',
}

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>(SettingsTab.Categories);
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px  flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab(SettingsTab.Categories)}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === SettingsTab.Categories
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            Categories
          </button>
          
          <button
            onClick={() => setActiveTab(SettingsTab.PaymentMethods)}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === SettingsTab.PaymentMethods
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            Payment Methods
          </button>
        </nav>
      </div>
      
      <Card className="p-6">
        {activeTab === SettingsTab.Categories && <CategoryManagement />}
        {activeTab === SettingsTab.PaymentMethods && <PaymentMethodManagement />}
      </Card>
    </div>
  );
};

export default SettingsPage;