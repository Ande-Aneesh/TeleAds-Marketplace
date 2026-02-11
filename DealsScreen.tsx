import React, { useState } from 'react';
import { Deal, DealStatus, UserRole, Channel } from '../types';
import { DealStatusBadge } from '../components/DealStatusBadge';
import { MOCK_CHANNELS } from '../constants';
import { updateDealStatus, postAd, releaseEscrow } from '../services/mockBackend';
import { Clock, Check, Send, DollarSign } from 'lucide-react';

interface Props {
  deals: Deal[];
  userRole: UserRole;
  onUpdateDeal: (deal: Deal) => void;
}

export const DealsScreen: React.FC<Props> = ({ deals, userRole, onUpdateDeal }) => {
  const [loadingDealId, setLoadingDealId] = useState<string | null>(null);

  const getChannel = (id: string) => MOCK_CHANNELS.find((c) => c.id === id);

  const handleAction = async (deal: Deal) => {
    setLoadingDealId(deal.id);
    try {
      let newStatus = deal.status;

      // Logic flow for status updates
      if (userRole === UserRole.CHANNEL_OWNER && deal.status === DealStatus.FUNDED) {
        // Accept -> Scheduled
        newStatus = await updateDealStatus(deal.id, DealStatus.SCHEDULED);
      } else if (userRole === UserRole.CHANNEL_OWNER && deal.status === DealStatus.SCHEDULED) {
        // Post -> Posted
        await postAd(deal.id, deal.adText);
        newStatus = await updateDealStatus(deal.id, DealStatus.POSTED);
      } else if (userRole === UserRole.ADVERTISER && deal.status === DealStatus.POSTED) {
        // Verify -> Completed
        await releaseEscrow(deal.id);
        newStatus = await updateDealStatus(deal.id, DealStatus.COMPLETED);
      }

      onUpdateDeal({ ...deal, status: newStatus });
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingDealId(null);
    }
  };

  const getActionButton = (deal: Deal) => {
    const isLoading = loadingDealId === deal.id;
    
    if (userRole === UserRole.CHANNEL_OWNER) {
      if (deal.status === DealStatus.FUNDED) {
        return (
          <button onClick={() => handleAction(deal)} disabled={isLoading} className="w-full mt-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
            {isLoading ? 'Accepting...' : 'Accept & Schedule'}
          </button>
        );
      }
      if (deal.status === DealStatus.SCHEDULED) {
        return (
          <button onClick={() => handleAction(deal)} disabled={isLoading} className="w-full mt-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium flex items-center justify-center space-x-2">
            <Send size={16} />
            <span>{isLoading ? 'Posting...' : 'Mark as Posted'}</span>
          </button>
        );
      }
    }

    if (userRole === UserRole.ADVERTISER) {
      if (deal.status === DealStatus.POSTED) {
        return (
          <button onClick={() => handleAction(deal)} disabled={isLoading} className="w-full mt-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium flex items-center justify-center space-x-2">
            <Check size={16} />
            <span>{isLoading ? 'Verifying...' : 'Confirm & Release Funds'}</span>
          </button>
        );
      }
    }

    return null;
  };

  if (deals.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-gray-500">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
                <Clock size={32} />
            </div>
            <p>No deals yet.</p>
        </div>
    )
  }

  return (
    <div className="p-4 space-y-4 pb-24">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">My Deals</h1>
      {deals.map((deal) => {
        const channel = getChannel(deal.channelId);
        return (
          <div key={deal.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-3">
                 <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold text-gray-500">
                    {channel?.name.charAt(0)}
                 </div>
                 <div>
                    <h3 className="font-bold text-gray-900">{channel?.name}</h3>
                    <p className="text-xs text-gray-500">{new Date(deal.postDate).toLocaleDateString()}</p>
                 </div>
              </div>
              <DealStatusBadge status={deal.status} />
            </div>

            <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 mb-3 border border-gray-100">
               <p className="line-clamp-2 font-mono text-xs">{deal.adText}</p>
            </div>

            <div className="flex justify-between items-center text-sm font-medium">
               <span className="text-gray-500">Total Escrow</span>
               <span className="text-gray-900 flex items-center">
                 <DollarSign size={14} className="mr-0.5" />
                 {deal.price}
               </span>
            </div>

            {/* Timeline Visualization */}
            <div className="mt-4 flex items-center justify-between relative px-2">
                {/* Line */}
                <div className="absolute left-2 right-2 top-1.5 h-0.5 bg-gray-200 -z-10"></div>
                
                {[DealStatus.CREATED, DealStatus.FUNDED, DealStatus.SCHEDULED, DealStatus.POSTED, DealStatus.COMPLETED].map((step, idx) => {
                    // Simple logic to check if step is passed
                    const steps = [DealStatus.CREATED, DealStatus.FUNDED, DealStatus.SCHEDULED, DealStatus.POSTED, DealStatus.COMPLETED];
                    const currentIdx = steps.indexOf(deal.status);
                    const stepIdx = steps.indexOf(step);
                    const isPassed = stepIdx <= currentIdx;
                    
                    return (
                        <div key={step} className={`w-3 h-3 rounded-full border-2 ${isPassed ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'}`} />
                    )
                })}
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-1 px-1">
                <span>Start</span>
                <span>Done</span>
            </div>

            {getActionButton(deal)}
          </div>
        );
      })}
    </div>
  );
};
