import React, { useState } from 'react';
import { Channel, Deal } from '../types';
import { ArrowLeft, Calendar, DollarSign, ShieldCheck } from 'lucide-react';
import { createDeal, fundEscrow } from '../services/mockBackend';

interface Props {
  channel: Channel;
  userId: string;
  onBack: () => void;
  onDealCreated: (deal: Deal) => void;
}

export const CreateDealScreen: React.FC<Props> = ({ channel, userId, onBack, onDealCreated }) => {
  const [adText, setAdText] = useState('');
  const [postDate, setPostDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adText || !postDate) return;

    setIsSubmitting(true);

    try {
      // 1. Create Deal
      const deal = await createDeal({
        channelId: channel.id,
        advertiserId: userId,
        adText,
        postDate: new Date(postDate).toISOString(),
        price: channel.pricePerPost,
      });

      // 2. Mock Funding
      await fundEscrow(deal.id, channel.pricePerPost);
      
      // 3. Complete
      onDealCreated(deal);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-200">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold ml-2">New Ad Request</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {/* Summary Card */}
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
          <div className="flex justify-between items-start">
             <div>
                <p className="text-xs text-blue-600 uppercase font-bold tracking-wide">Target Channel</p>
                <h3 className="text-lg font-bold text-gray-900 mt-1">{channel.name}</h3>
                <p className="text-sm text-gray-600">{channel.handle}</p>
             </div>
             <div className="text-right">
                <p className="text-xl font-bold text-blue-700">${channel.pricePerPost}</p>
                <p className="text-xs text-blue-500">Escrow Required</p>
             </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Ad Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ad Content</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px]"
              placeholder="Enter your ad copy here..."
              value={adText}
              onChange={(e) => setAdText(e.target.value)}
              required
            />
            <p className="text-xs text-gray-400 mt-1">Markdown is supported by Telegram.</p>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Requested Date</label>
            <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                type="datetime-local"
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={postDate}
                onChange={(e) => setPostDate(e.target.value)}
                required
                />
            </div>
          </div>

          {/* Escrow Explainer */}
          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <ShieldCheck className="text-green-600 shrink-0" size={20} />
            <div className="text-xs text-gray-600">
                <span className="font-bold text-gray-800">Secure Escrow:</span> Your funds will be held safely in the smart contract until the channel owner posts your ad and it is verified.
            </div>
          </div>

          {/* Action Button */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl font-bold text-white shadow-lg ${
                    isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 active:scale-[0.98]'
                } transition-all`}
            >
                {isSubmitting ? (
                    <span>Processing...</span>
                ) : (
                    <>
                        <DollarSign size={20} />
                        <span>Fund Escrow (${channel.pricePerPost})</span>
                    </>
                )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
