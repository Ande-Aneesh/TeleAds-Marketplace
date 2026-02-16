import React from 'react';
import { Store, Briefcase, Wallet } from 'lucide-react';
import { Tab } from '../types';

interface NavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe pt-2 px-4 shadow-lg z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        <button
          onClick={() => onTabChange('marketplace')}
          className={`flex flex-col items-center space-y-1 ${
            activeTab === 'marketplace' ? 'text-blue-500' : 'text-gray-400'
          }`}
        >
          <Store size={24} />
          <span className="text-xs font-medium">Market</span>
        </button>
        <button
          onClick={() => onTabChange('deals')}
          className={`flex flex-col items-center space-y-1 ${
            activeTab === 'deals' ? 'text-blue-500' : 'text-gray-400'
          }`}
        >
          <Briefcase size={24} />
          <span className="text-xs font-medium">Deals</span>
        </button>
        <button
          onClick={() => onTabChange('wallet')}
          className={`flex flex-col items-center space-y-1 ${
            activeTab === 'wallet' ? 'text-blue-500' : 'text-gray-400'
          }`}
        >
          <Wallet size={24} />
          <span className="text-xs font-medium">Wallet</span>
        </button>
      </div>
    </div>
  );
};
