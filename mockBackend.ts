import { Deal, DealStatus } from '../types';

const DELAY = 800; // Simulate network latency

export const verifyChannel = async (channelHandle: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[Backend] Verifying channel: ${channelHandle}`);
      resolve(true);
    }, DELAY);
  });
};

export const createDeal = async (deal: Omit<Deal, 'id' | 'createdAt' | 'status'>): Promise<Deal> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newDeal: Deal = {
        ...deal,
        id: `deal_${Date.now()}`,
        status: DealStatus.CREATED,
        createdAt: new Date().toISOString(),
      };
      console.log(`[Backend] Deal Created:`, newDeal);
      resolve(newDeal);
    }, DELAY);
  });
};

export const fundEscrow = async (dealId: string, amount: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[Backend] Funding escrow for deal ${dealId} with amount ${amount}`);
      resolve(`tx_escrow_${Date.now()}`);
    }, DELAY);
  });
};

export const postAd = async (dealId: string, content: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[Backend] Posting ad for deal ${dealId}: "${content}"`);
      resolve(true);
    }, DELAY);
  });
};

export const releaseEscrow = async (dealId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[Backend] Releasing escrow for deal ${dealId}`);
      resolve(true);
    }, DELAY);
  });
};

export const updateDealStatus = async (dealId: string, status: DealStatus): Promise<DealStatus> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`[Backend] Updating deal ${dealId} to ${status}`);
            resolve(status);
        }, DELAY/2);
    })
}
