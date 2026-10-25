// CIDADÃO$ — BottomNavigation Component
// Spec Section 6: Five primary entries (Início, Explorar, Serviços, Carteira, Perfil)

import React from 'react';
import { useApp, MainTab } from '../../context/AppContext';
import { Home, Compass, Grid, Wallet, User } from 'lucide-react';

export const BottomNavigation: React.FC = () => {
  const { activeTab, setActiveTab, closeModule, cart } = useApp();

  const handleTabClick = (tab: MainTab) => {
    closeModule();
    setActiveTab(tab);
  };

  const navItems = [
    { key: 'inicio' as MainTab, label: 'Início', icon: Home },
    { key: 'explorar' as MainTab, label: 'Explorar', icon: Compass },
    { key: 'servicos' as MainTab, label: '15 Módulos', icon: Grid },
    { key: 'carteira' as MainTab, label: 'Carteira', icon: Wallet },
    { key: 'perfil' as MainTab, label: 'Perfil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-lg px-2 py-1.5 transition-all">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeTab === item.key;
          const IconComponent = item.icon;

          return (
            <button
              key={item.key}
              onClick={() => handleTabClick(item.key)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive ? 'text-[#009B4D] font-bold' : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <div className="relative">
                <IconComponent
                  className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.5]' : 'stroke-2'}`}
                />
                {item.key === 'servicos' && cart.length > 0 && (
                  <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-[#FF8A00] text-white rounded-full text-[9px] font-black flex items-center justify-center shadow-xs">
                    {cart.length}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
              {isActive && (
                <span className="absolute bottom-0 w-6 h-0.5 bg-[#009B4D] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
