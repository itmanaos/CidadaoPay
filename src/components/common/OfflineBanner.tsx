// CIDADÃO$ — OfflineBanner Component
// Spec Section 12: Visual synchronization status for Amazonian connectivity conditions

import React from 'react';
import { useApp } from '../../context/AppContext';
import { WifiOff, RefreshCw, AlertCircle } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const { isOffline, toggleOfflineMode, syncState, triggerManualSync, pendingSyncCount } = useApp();

  if (!isOffline && pendingSyncCount === 0) return null;

  return (
    <div
      className={`px-3 py-2 text-xs border-b flex items-center justify-between transition-all ${
        isOffline
          ? 'bg-amber-500/15 border-amber-300/40 text-amber-900'
          : 'bg-blue-500/10 border-blue-200 text-blue-900'
      }`}
    >
      <div className="flex items-center space-x-2">
        {isOffline ? (
          <WifiOff className="w-4 h-4 text-amber-700 shrink-0 animate-pulse" />
        ) : (
          <AlertCircle className="w-4 h-4 text-blue-700 shrink-0" />
        )}
        <div>
          <span className="font-bold">
            {isOffline ? 'Modo Offline Ativo' : 'Sincronização Pendente'}
          </span>
          <span className="text-[11px] ml-1 text-slate-700">
            {isOffline
              ? '— Dados em cache no dispositivo.'
              : `— ${pendingSyncCount} operação(ões) aguardando envio.`}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-1.5">
        {pendingSyncCount > 0 && !isOffline && (
          <button
            onClick={triggerManualSync}
            disabled={syncState === 'syncing'}
            className="flex items-center space-x-1 px-2.5 py-1 bg-[#009B4D] hover:bg-[#006B3C] text-white rounded-lg font-bold text-[11px] shadow-xs transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${syncState === 'syncing' ? 'animate-spin' : ''}`} />
            <span>{syncState === 'syncing' ? 'Enviando...' : 'Sincronizar'}</span>
          </button>
        )}

        <button
          onClick={toggleOfflineMode}
          className="px-2 py-0.5 rounded text-[10px] font-bold underline text-slate-700 hover:text-slate-900"
        >
          {isOffline ? 'Reconectar' : 'Simular Offline'}
        </button>
      </div>
    </div>
  );
};
