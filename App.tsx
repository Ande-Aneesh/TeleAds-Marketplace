import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { MarketplaceScreen } from './screens/MarketplaceScreen';
import { CreateDealScreen } from './screens/CreateDealScreen';
import { DealsScreen } from './screens/DealsScreen';
import { WalletScreen } from './screens/WalletScreen';
import { Tab, User, UserRole, Channel, Deal } from './types';
import { MOCK_USER, INITIAL_DEALS } from './constants';
import { Users } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('marketplace');
  const [user, setUser] = useState<User>(MOCK_USER);
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  
  // Navigation State
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);

  useEffect(() => {
    // Initialize Telegram WebApp
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      
      // Mock adopting user info from Telegram if available
      if (tg.initDataUnsafe?.user) {
        setUser(prev => ({
            ...prev,
            username: tg.initDataUnsafe.user.username || prev.username,
            id: tg.initDataUnsafe.user.id.toString() || prev.id
        }));
      }
    }
  }, []);

  const handleRequestAd = (channel: Channel) => {
    setSelectedChannel(channel);
  };

  const handleDealCreated = (newDeal: Deal) => {
    setDeals(prev => [newDeal, ...prev]);
    setSelectedChannel(null);
    setActiveTab('deals');
  };

  const handleUpdateDeal = (updatedDeal: Deal) => {
    setDeals(prev => prev.map(d => d.id === updatedDeal.id ? updatedDeal : d));
  };

  const toggleRole = () => {
    setUser(prev => ({
        ...prev,
        role: prev.role === UserRole.ADVERTISER ? UserRole.CHANNEL_OWNER : UserRole.ADVERTISER
    }));
  };

  // Render Logic
  const renderContent = () => {
    if (selectedChannel) {
      return (
        <CreateDealScreen 
            channel={selectedChannel} 
            userId={user.id} 
            onBack={() => setSelectedChannel(null)} 
            onDealCreated={handleDealCreated}
        />
      );
    }

    switch (activeTab) {
      case 'marketplace':
        return <MarketplaceScreen userRole={user.role} onRequestAd={handleRequestAd} />;
      case 'deals':
        return <DealsScreen deals={deals} userRole={user.role} onUpdateDeal={handleUpdateDeal} />;
      case 'wallet':
        return <WalletScreen user={user} deals={deals} />;
      default:
        return <MarketplaceScreen userRole={user.role} onRequestAd={handleRequestAd} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        {/* Debug Role Switcher (Top Right) */}
        <div className="fixed top-0 right-0 p-2 z-50 opacity-80">
            <button 
                onClick={toggleRole}
                className="bg-black/80 text-white text-[10px] px-2 py-1 rounded-full flex items-center space-x-1 backdrop-blur-md"
            >
                <Users size={10} />
                <span>{user.role === UserRole.ADVERTISER ? 'Advertiser View' : 'Channel Owner View'}</span>
            </button>
        </div>

        <main className="max-w-md mx-auto min-h-screen bg-gray-50 relative shadow-2xl">
            {renderContent()}
            {!selectedChannel && <Navigation activeTab={activeTab} onTabChange={setActiveTab} />}
        </main>
    </div>
  );
};

export default App;
