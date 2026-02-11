import React from 'react';
import { MOCK_CHANNELS } from '../constants';
import { Channel, UserRole } from '../types';
import { CheckCircle, Users, ArrowRight } from 'lucide-react';

interface Props {
  userRole: UserRole;
  onRequestAd: (channel: Channel) => void;
}

export const MarketplaceScreen: React.FC<Props> = ({ userRole, onRequestAd }) => {
  return (
    <div className="p-4 space-y-4 pb-24">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold text-gray-800">Marketplace</h1>
        <div className="text-sm text-gray-500">
            {MOCK_CHANNELS.length} Verified Channels
        </div>
      </div>

      {MOCK_CHANNELS.map((channel) => (
        <div key={channel.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <img src={channel.avatarUrl} alt={channel.name} className="w-12 h-12 rounded-full object-cover bg-gray-200" />
              <div>
                <div className="flex items-center space-x-1">
                  <h3 className="font-bold text-gray-900">{channel.name}</h3>
                  {channel.verified && <CheckCircle size={14} className="text-blue-500 fill-current" />}
                </div>
                <p className="text-sm text-blue-500 font-medium">{channel.handle}</p>
                <div className="flex items-center space-x-1 text-gray-500 text-xs mt-1">
                  <Users size={12} />
                  <span>{channel.subscribers.toLocaleString()} subs</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-lg font-bold text-gray-900">${channel.pricePerPost}</span>
              <span className="text-xs text-gray-400">per post</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mt-3 line-clamp-2">{channel.description}</p>
          
          <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center">
             <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded">
                {channel.category}
             </span>
             {userRole === UserRole.ADVERTISER && (
                <button 
                    onClick={() => onRequestAd(channel)}
                    className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium active:scale-95 transition-transform"
                >
                    <span>Request Ad</span>
                    <ArrowRight size={16} />
                </button>
             )}
          </div>
        </div>
      ))}
    </div>
  );
};
