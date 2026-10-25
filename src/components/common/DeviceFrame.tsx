// CIDADÃO$ — DeviceFrame Simulator & Multi-Role Toolbar
// Spec Section 8 & 21: Mobile preview simulator with operator view and multi-role testing

import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Smartphone,
  Maximize2,
  Building,
  UserCheck,
  Signal,
  Wifi,
  Battery,
} from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<Props> = ({ children }) => {
  const { viewMode, setViewMode, user, switchRole, isOffline, toggleOfflineMode, municipality } =
    useApp();

  const currentTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const roleLabels: Record<UserRole, { label: string; icon: string; badge: string }> = {
    cidadao: { label: 'Cidadão Ribeirinho', icon: '🛶', badge: 'Raimundo (Supiá)' },
    responsavel_familiar: { label: 'Responsável Familiar', icon: '👨‍👩‍👧', badge: 'Família' },
    estudante: { label: 'Estudante', icon: '🎒', badge: 'Thiago (Solimões)' },
    produtor_rural: { label: 'Produtor Rural / Agro', icon: '🌾', badge: 'Mandioca/Açaí' },
    comerciante: { label: 'Lojista / Marketplace', icon: '🏪', badge: 'Comércio' },
    restaurante: { label: 'Restaurante / FoodPlace', icon: '🐟', badge: 'Mirante Solimões' },
    transportador: { label: 'Transportador / Fretes', icon: '🚤', badge: 'Voadeira' },
    operador_passagens: { label: 'Operador de Passagens', icon: '🎫', badge: 'Expresso Solimões' },
    profissional_autonomo: { label: 'Profissional Autônomo', icon: '🔧', badge: 'Mecânico Popa' },
    servidor_municipal: { label: 'Servidor Municipal', icon: '🏛️', badge: 'SEMED/SEMUSA' },
    gestor_operador: { label: 'Gestor da Plataforma', icon: '👑', badge: 'Operador SaaS' },
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center">
      {/* Top Test & Environment Bar */}
      <div className="w-full bg-slate-950/90 border-b border-slate-800 px-3 py-2 text-xs flex flex-wrap items-center justify-between gap-2 z-50">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 font-bold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>CIDADÃO$ Super App</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">
            Piloto: <strong className="text-white">{municipality.name}/{municipality.state}</strong>
          </span>
        </div>

        {/* Middle: Role Selector & Network Toggle */}
        <div className="flex items-center space-x-2">
          {/* Quick Role Switcher */}
          <div className="flex items-center space-x-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
            <UserCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] text-slate-400 font-medium">Perfil:</span>
            <select
              value={user.role}
              onChange={(e) => switchRole(e.target.value as UserRole)}
              className="bg-transparent text-xs text-white font-semibold focus:outline-hidden cursor-pointer"
            >
              {Object.entries(roleLabels).map(([roleKey, info]) => (
                <option key={roleKey} value={roleKey} className="bg-slate-900 text-white">
                  {info.icon} {info.label} ({info.badge})
                </option>
              ))}
            </select>
          </div>

          {/* Quick Network Simulator */}
          <button
            onClick={toggleOfflineMode}
            className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1 border transition-colors ${
              isOffline
                ? 'bg-amber-950/60 text-amber-300 border-amber-600/50'
                : 'bg-emerald-950/60 text-emerald-300 border-emerald-600/50'
            }`}
            title="Alternar simulação de conectividade amazônica"
          >
            <span>{isOffline ? '📵 Offline (Ribeirinho)' : '📶 4G / Starlink'}</span>
          </button>
        </div>

        {/* Right: View Mode Switches */}
        <div className="flex items-center space-x-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700">
          <button
            onClick={() => setViewMode('mobile_preview')}
            className={`px-2 py-1 rounded-md text-xs font-medium flex items-center space-x-1 transition-colors ${
              viewMode === 'mobile_preview'
                ? 'bg-[#009B4D] text-white font-bold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Visualizador com Moldura Mobile"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>

          <button
            onClick={() => setViewMode('fullscreen')}
            className={`px-2 py-1 rounded-md text-xs font-medium flex items-center space-x-1 transition-colors ${
              viewMode === 'fullscreen'
                ? 'bg-[#0756A6] text-white font-bold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Modo Tela Cheia"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Expandido</span>
          </button>

          <button
            onClick={() => setViewMode('admin_engine')}
            className={`px-2 py-1 rounded-md text-xs font-medium flex items-center space-x-1 transition-colors ${
              viewMode === 'admin_engine'
                ? 'bg-purple-600 text-white font-bold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Painel de Monetização e Gestão da Empresa Operadora"
          >
            <Building className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Business Engine</span>
          </button>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === 'mobile_preview' ? (
        <div className="py-6 px-2 flex-1 w-full flex items-center justify-center overflow-y-auto">
          {/* Smartphone Simulator Shell */}
          <div className="w-full max-w-[420px] bg-slate-800 rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-4 border-slate-700/80 relative">
            {/* Top Phone Speaker & Camera Notch */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-900 rounded-full flex items-center justify-center space-x-2 z-50">
              <div className="w-12 h-1 bg-slate-700 rounded-full" />
              <div className="w-2.5 h-2.5 bg-slate-800 rounded-full border border-slate-700" />
            </div>

            {/* Inner Phone Screen */}
            <div className="w-full bg-[#F3F6FA] text-[#163047] rounded-[38px] overflow-hidden flex flex-col h-[780px] relative shadow-inner">
              {/* Native Mobile Status Bar */}
              <div className="bg-[#072F58] text-white/90 text-[11px] px-6 pt-2 pb-1 flex items-center justify-between font-semibold tracking-tight select-none z-40">
                <span>{currentTime}</span>
                <div className="flex items-center space-x-1.5 text-white/80">
                  <Signal className="w-3 h-3" />
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Scrollable Mobile App Body */}
              <div className="flex-1 overflow-y-auto pb-20 relative">{children}</div>

              {/* iOS Home Indicator Bar */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-400/50 rounded-full pointer-events-none z-50" />
            </div>
          </div>
        </div>
      ) : viewMode === 'fullscreen' ? (
        <div className="w-full flex-1 max-w-xl bg-[#F3F6FA] text-[#163047] min-h-screen shadow-xl relative pb-20">
          {children}
        </div>
      ) : (
        <div className="w-full flex-1 bg-slate-900 text-slate-100 p-4">
          {children}
        </div>
      )}
    </div>
  );
};
