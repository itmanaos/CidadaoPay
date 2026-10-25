// CIDADÃO$ — AppHeader Component
// Spec Section 5: Header with brand, active municipality, offline status and notifications

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { NotificationModal } from './NotificationModal';

export const AppHeader: React.FC = () => {
  const {
    municipality,
    user,
    isOffline,
    toggleOfflineMode,
    syncState,
    triggerManualSync,
    pendingSyncCount,
    unreadNotificationCount,
    setActiveTab,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-gradient-to-r from-[#072F58] via-[#0756A6] to-[#006B3C] text-white px-4 py-3 shadow-md">
        <div className="flex items-center justify-between">
          {/* Logo & Municipality */}
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
              <span className="font-black text-xl tracking-tighter text-[#FFC43D]">C$</span>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h1 className="font-black tracking-tight text-base leading-none text-white">
                  CIDADÃO<span className="text-[#FFC43D]">$</span>
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-[#009B4D] px-1.5 py-0.5 rounded text-white shadow-xs">
                  SUPER APP
                </span>
              </div>
              <p className="text-[11px] text-emerald-100/90 font-medium flex items-center space-x-1 mt-0.5">
                <span>📍 {municipality.name} — {municipality.state}</span>
                <span className="text-white/40">•</span>
                <span className="text-[10px] text-amber-200">Solimões</span>
              </p>
            </div>
          </div>

          {/* Actions & Status */}
          <div className="flex items-center space-x-2">
            {/* Offline / Online Toggle Chip */}
            <button
              onClick={toggleOfflineMode}
              title={isOffline ? 'Modo Offline Ativo (Clique para ficar Online)' : 'Conectado (Clique para simular modo offline)'}
              className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-full border transition-all ${
                isOffline
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
              }`}
            >
              {isOffline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span className="hidden sm:inline font-semibold text-[10px]">Offline</span>
                  {pendingSyncCount > 0 && (
                    <span className="bg-amber-400 text-slate-900 rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-black">
                      {pendingSyncCount}
                    </span>
                  )}
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline font-semibold text-[10px]">Online</span>
                </>
              )}
            </button>

            {/* Manual Sync if pending */}
            {pendingSyncCount > 0 && !isOffline && (
              <button
                onClick={triggerManualSync}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Sincronizar fila pendente"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncState === 'syncing' ? 'animate-spin' : ''}`} />
              </button>
            )}

            {/* Notifications */}
            <button
              onClick={() => setShowNotifications(true)}
              className="relative p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors active:scale-95"
              aria-label="Notificações"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF8A00] text-white text-[9px] font-extrabold rounded-full flex items-center justify-center border-2 border-[#072F58] shadow-sm animate-bounce">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Avatar / Profile shortcut */}
            <button
              onClick={() => setActiveTab('perfil')}
              className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-emerald-400 shadow-sm active:scale-95"
              title={`Perfil: ${user.name}`}
            >
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            </button>
          </div>
        </div>
      </header>

      {/* Notification Modal */}
      {showNotifications && <NotificationModal onClose={() => setShowNotifications(false)} />}
    </>
  );
};
