import React from 'react';
import { User, Deal, DealStatus, UserRole } from '../types';
import { Wallet, Lock, ArrowUpRight, History } from 'lucide-react';

interface Props {
  user: User;
  deals: Deal[];
}

export const WalletScreen: React.FC<Props> = ({ user, deals }) => {
  // Calculate dynamic balances based on local deals state
  const escrowBalance = deals
    .filter(d => d.status !== DealStatus.COMPLETED && d.status !== DealStatus.CANCELLED)
    .reduce((acc, d) => acc + d.price, 0);

  const completedVolume = deals
    .filter(d => d.status === DealStatus.COMPLETED)
    .reduce((acc, d) => acc + d.price, 0);

  return (
    <div className="p-4 space-y-6 pb-24">
      <h1 className="text-2xl font-bold text-gray-800">Wallet</h1>

      {/* Main Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <Wallet size={120} />
        </div>
        
        <div className="relative z-10">
            <p className="text-blue-200 text-sm font-medium mb-1">Available Balance</p>
            <h2 className="text-4xl font-bold mb-6">${user.balance.available.toLocaleString()}</h2>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <div className="flex items-center space-x-2 text-blue-100 mb-1">
                        <Lock size={14} />
                        <span className="text-xs">In Escrow</span>
                    </div>
                    <p className="text-xl font-bold">${escrowBalance}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <div className="flex items-center space-x-2 text-blue-100 mb-1">
                        <ArrowUpRight size={14} />
                        <span className="text-xs">{user.role === UserRole.ADVERTISER ? 'Spent' : 'Earned'}</span>
                    </div>
                    <p className="text-xl font-bold">${completedVolume}</p>
                </div>
            </div>
        </div>
      </div>

      {/* Transactions List (Mocked from Deals) */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
            <History size={18} className="mr-2" />
            Recent Transactions
        </h3>
        <div className="space-y-3">
            {deals.slice().reverse().map((deal) => (
                <div key={deal.id} className="bg-white p-3 rounded-lg border border-gray-100 flex justify-between items-center shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${deal.status === DealStatus.COMPLETED ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                            <DollarSign size={14} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">
                                {deal.status === DealStatus.COMPLETED ? 'Payment Released' : 'Funds Locked'}
                            </p>
                            <p className="text-xs text-gray-500">Deal #{deal.id.split('_')[1]}</p>
                        </div>
                    </div>
                    <span className={`font-bold ${deal.status === DealStatus.COMPLETED ? 'text-green-600' : 'text-gray-600'}`}>
                        {user.role === UserRole.ADVERTISER ? '-' : '+'}${deal.price}
                    </span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const DollarSign = ({ size, className }: { size: number; className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
);
