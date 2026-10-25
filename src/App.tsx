// CIDADÃO$ — Super App Mobile (Root Application Component)
// Spec Section 1 & 22: Complete functional mobile architecture, 15 modules, offline-first resilience

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DeviceFrame } from './components/common/DeviceFrame';
import { AppHeader } from './components/common/AppHeader';
import { OfflineBanner } from './components/common/OfflineBanner';
import { BottomNavigation } from './components/common/BottomNavigation';

// Main Views
import { HomeView } from './components/views/HomeView';
import { ExploreView } from './components/views/ExploreView';
import { ServicesCatalogView } from './components/views/ServicesCatalogView';
import { WalletView } from './components/views/WalletView';
import { ProfileView } from './components/views/ProfileView';

// 15 Modules
import { CitizenIdentityView } from './components/modules/CitizenIdentityView';
import { PublicServicesView } from './components/modules/PublicServicesView';
import { EducationView } from './components/modules/EducationView';
import { HealthView } from './components/modules/HealthView';
import { MarketplaceView } from './components/modules/MarketplaceView';
import { FoodPlaceView } from './components/modules/FoodPlaceView';
import { FreightView } from './components/modules/FreightView';
import { TicketsMobilityView } from './components/modules/TicketsMobilityView';
import { ProfessionalServicesView } from './components/modules/ProfessionalServicesView';
import { TourismGastronomyView } from './components/modules/TourismGastronomyView';
import { AgroBioeconomyView } from './components/modules/AgroBioeconomyView';
import { WalletRewardsView } from './components/modules/WalletRewardsView';
import { BidugaPetView } from './components/modules/BidugaPetView';
import { TerritorialBIView } from './components/modules/TerritorialBIView';
import { AdvertisingView } from './components/modules/AdvertisingView';

// Business Engine
import { BusinessEngineView } from './components/admin/BusinessEngineView';

const AppContent: React.FC = () => {
  const { activeTab, activeModule, viewMode } = useApp();

  // If in Business Engine Admin mode, render the operator dashboard
  if (viewMode === 'admin_engine') {
    return (
      <DeviceFrame>
        <BusinessEngineView />
      </DeviceFrame>
    );
  }

  // Render sub-module if active
  const renderModuleView = () => {
    switch (activeModule) {
      case 'citizen-identity':
        return <CitizenIdentityView />;
      case 'public-services':
        return <PublicServicesView />;
      case 'education':
        return <EducationView />;
      case 'health':
        return <HealthView />;
      case 'marketplace':
        return <MarketplaceView />;
      case 'foodplace':
        return <FoodPlaceView />;
      case 'freight':
        return <FreightView />;
      case 'tickets-mobility':
        return <TicketsMobilityView />;
      case 'professional-services':
        return <ProfessionalServicesView />;
      case 'tourism-gastronomy':
        return <TourismGastronomyView />;
      case 'agro-bioeconomy':
        return <AgroBioeconomyView />;
      case 'wallet-rewards':
        return <WalletRewardsView />;
      case 'biduga':
        return <BidugaPetView />;
      case 'territorial-intelligence':
        return <TerritorialBIView />;
      case 'advertising':
        return <AdvertisingView />;
      default:
        return null;
    }
  };

  // Render main tab view
  const renderTabView = () => {
    switch (activeTab) {
      case 'inicio':
        return <HomeView />;
      case 'explorar':
        return <ExploreView />;
      case 'servicos':
        return <ServicesCatalogView />;
      case 'carteira':
        return <WalletView />;
      case 'perfil':
        return <ProfileView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <DeviceFrame>
      <div className="flex flex-col min-h-full bg-[#F3F6FA]">
        <AppHeader />
        <OfflineBanner />

        <main className="flex-1">
          {activeModule ? renderModuleView() : renderTabView()}
        </main>

        <BottomNavigation />
      </div>
    </DeviceFrame>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
