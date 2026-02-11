export enum UserRole {
  ADVERTISER = 'ADVERTISER',
  CHANNEL_OWNER = 'CHANNEL_OWNER',
}

export enum DealStatus {
  CREATED = 'CREATED',
  FUNDED = 'FUNDED',
  SCHEDULED = 'SCHEDULED',
  POSTED = 'POSTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Channel {
  id: string;
  name: string;
  handle: string;
  subscribers: number;
  pricePerPost: number;
  verified: boolean;
  category: string;
  avatarUrl: string;
  description: string;
}

export interface Deal {
  id: string;
  channelId: string;
  advertiserId: string;
  adText: string;
  postDate: string; // ISO string
  price: number;
  status: DealStatus;
  createdAt: string;
  escrowTxId?: string;
}

export interface User {
  id: string;
  username: string;
  role: UserRole;
  balance: {
    available: number;
    locked: number; // Escrow
  };
}

export type Tab = 'marketplace' | 'deals' | 'wallet';
