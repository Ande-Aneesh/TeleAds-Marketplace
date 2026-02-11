import { Channel, User, UserRole, Deal, DealStatus } from './types';

export const MOCK_USER: User = {
  id: 'user_123',
  username: 'crypto_whale',
  role: UserRole.ADVERTISER,
  balance: {
    available: 5000,
    locked: 1200,
  },
};

export const MOCK_CHANNELS: Channel[] = [
  {
    id: 'ch_1',
    name: 'Tech Insider',
    handle: '@techinsider',
    subscribers: 45000,
    pricePerPost: 150,
    verified: true,
    category: 'Technology',
    avatarUrl: 'https://picsum.photos/200/200?random=1',
    description: 'Daily tech news and reviews.',
  },
  {
    id: 'ch_2',
    name: 'Crypto Signals VIP',
    handle: '@cryptovip',
    subscribers: 12000,
    pricePerPost: 300,
    verified: false,
    category: 'Finance',
    avatarUrl: 'https://picsum.photos/200/200?random=2',
    description: 'Best signals in the market. NFA.',
  },
  {
    id: 'ch_3',
    name: 'Funny Memes Daily',
    handle: '@funnymemes',
    subscribers: 150000,
    pricePerPost: 80,
    verified: true,
    category: 'Entertainment',
    avatarUrl: 'https://picsum.photos/200/200?random=3',
    description: 'Laugh your socks off.',
  },
  {
    id: 'ch_4',
    name: 'Startups & VC',
    handle: '@startupvc',
    subscribers: 8500,
    pricePerPost: 500,
    verified: true,
    category: 'Business',
    avatarUrl: 'https://picsum.photos/200/200?random=4',
    description: 'Connecting founders and investors.',
  },
];

export const INITIAL_DEALS: Deal[] = [
  {
    id: 'deal_1',
    channelId: 'ch_1',
    advertiserId: 'user_123',
    adText: 'Check out our new AI tool!',
    postDate: new Date(Date.now() + 86400000).toISOString(),
    price: 150,
    status: DealStatus.FUNDED,
    createdAt: new Date(Date.now() - 100000).toISOString(),
    escrowTxId: '0x123...abc',
  },
  {
    id: 'deal_2',
    channelId: 'ch_3',
    advertiserId: 'user_123',
    adText: 'Join the meme contest!',
    postDate: new Date(Date.now() - 86400000).toISOString(),
    price: 80,
    status: DealStatus.COMPLETED,
    createdAt: new Date(Date.now() - 200000).toISOString(),
    escrowTxId: '0x456...def',
  },
];
