import React from 'react';
import { DealStatus } from '../types';

interface Props {
  status: DealStatus;
}

export const DealStatusBadge: React.FC<Props> = ({ status }) => {
  const getColor = (s: DealStatus) => {
    switch (s) {
      case DealStatus.CREATED:
        return 'bg-gray-100 text-gray-600';
      case DealStatus.FUNDED:
        return 'bg-blue-100 text-blue-700 border border-blue-200';
      case DealStatus.SCHEDULED:
        return 'bg-purple-100 text-purple-700 border border-purple-200';
      case DealStatus.POSTED:
        return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
      case DealStatus.COMPLETED:
        return 'bg-green-100 text-green-700 border border-green-200';
      case DealStatus.CANCELLED:
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getColor(status)}`}>
      {status}
    </span>
  );
};
