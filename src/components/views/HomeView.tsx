// CIDADÃO$ — HomeView Component
// Spec Section 6: Main screen with greeting, global search, 15 modules grid, highlights and active protocols

import React from 'react';
import { useApp } from '../../context/AppContext';
import { MODULE_CONFIG, ModuleKey } from '../../theme/tokens';
import { DEMO_PRODUCTS, DEMO_RESTAURANTS, DEMO_ATTRACTIONS } from '../../data/demoData';
import {
  Search,
  MapPin,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Star,
  Sparkles,
  ShoppingBag,
  UtensilsCrossed,
  Truck,
  Ship,
  Compass,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    municipality,
    user,
    openModule,
    setActiveTab,
    protocols,
    freightRequests,
    wallet,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const activeProtocolsCount = protocols.filter((p) => p.status !== 'concluido').length;
  const activeFreightsCount = freightRequests.filter((f) => f.status === 'em_transito').length;

  const quickModules: ModuleKey[] = [
    'citizen-identity',
    'marketplace',
    'foodplace',
    'freight',
    'tickets-mobility',
    'public-services',
    'health',
    'education',
  ];

  return (
    <div className="space-y-4 pb-4">
      {/* Personalized Greeting Card with MPUID badge */}
      <div className="bg-gradient-to-br from-[#072F58] via-[#0756A6] to-[#006B3C] text-white p-4 mx-4 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider flex items-center space-x-1">
              <span>{user.neighborhoodOrCommunity}</span>
              <span>•</span>
              <span className="capitalize">{user.locationType}</span>
            </span>
            <h2 className="text-lg font-black text-white mt-0.5">Olá, {user.name.split(' ')[0]}!</h2>
            <p className="text-xs text-sky-100 mt-0.5">Bem-vindo ao CIDADÃO$ {municipality.name}</p>
          </div>

          <button
            onClick={() => openModule('citizen-identity')}
            className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-right backdrop-blur-md transition-all active:scale-95"
            title="Ver MPUID Digital"
          >
            <div className="flex items-center space-x-1 text-emerald-300 text-[10px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Ouro</span>
            </div>
            <span className="font-mono text-[10px] text-white/90 font-bold block mt-0.5">{user.mpuid}</span>
          </button>
        </div>

        {/* Global Search Bar */}
        <div className="mt-3.5 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar serviços, produtos, lanchas, exames..."
            className="w-full bg-white/95 text-slate-900 placeholder-slate-400 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#FFC43D] shadow-sm"
          />
        </div>

        {/* Wallet Mini-Bar */}
        <div className="mt-3.5 pt-2.5 border-t border-white/15 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-sky-200">Pontos MRT$:</span>
            <span className="font-black text-[#FFC43D]">{wallet.mrtPointsBalance} pts</span>
          </div>
          <button
            onClick={() => setActiveTab('carteira')}
            className="text-[11px] text-emerald-300 hover:text-emerald-200 font-bold flex items-center space-x-0.5"
          >
            <span>Ver Saldo & Benefício</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Ongoing Requests Notification Bar (if active) */}
      {(activeProtocolsCount > 0 || activeFreightsCount > 0) && (
        <div className="mx-4 p-3 bg-blue-50 border border-blue-200/80 rounded-2xl shadow-2xs flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#0756A6] animate-ping" />
            <div>
              <span className="font-bold text-slate-800">
                {activeProtocolsCount > 0
                  ? `${activeProtocolsCount} protocolo(s) municipal(is) em andamento`
                  : `${activeFreightsCount} frete(s) fluvial(is) ativo(s)`}
              </span>
              <span className="text-[10px] text-slate-500 block">Acompanhe pelo app</span>
            </div>
          </div>
          <button
            onClick={() => (activeProtocolsCount > 0 ? openModule('public-services') : openModule('freight'))}
            className="text-[11px] font-bold text-[#0756A6] underline"
          >
            Ver status
          </button>
        </div>
      )}

      {/* Priority 15 Modules Quick Access Grid */}
      <div className="px-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900">Módulos em Destaque</h3>
          <button
            onClick={() => setActiveTab('servicos')}
            className="text-xs font-bold text-[#009B4D] hover:underline flex items-center"
          >
            <span>Ver todos (15)</span>
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {quickModules.map((modKey) => {
            const conf = MODULE_CONFIG[modKey];
            return (
              <button
                key={modKey}
                onClick={() => openModule(modKey)}
                className="bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-xs flex flex-col items-center text-center transition-all active:scale-95 group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shadow-inner transition-transform group-hover:scale-105"
                  style={{ backgroundColor: conf.bgColor, color: conf.color }}
                >
                  {conf.number}
                </div>
                <span className="text-[10px] font-bold text-slate-800 mt-1.5 leading-tight line-clamp-1">
                  {conf.shortName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Promotional Campaign Banner */}
      <div className="mx-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-4 rounded-3xl shadow-md relative overflow-hidden">
        <span className="text-[9px] uppercase font-black bg-white/20 px-2 py-0.5 rounded-full">
          Destaque Manacapuru
        </span>
        <h3 className="text-base font-black mt-1">Festival de Cirandas 2026</h3>
        <p className="text-xs text-amber-100 mt-0.5 line-clamp-2">
          Reserve suas passagens fluviais e camarotes para a disputa entre Flor Matizada, Guerreiros Mura e Tradicional.
        </p>
        <button
          onClick={() => openModule('tourism-gastronomy')}
          className="mt-3 px-3 py-1.5 bg-white text-orange-600 font-extrabold text-xs rounded-xl shadow-xs hover:bg-amber-50 transition-colors"
        >
          Explorar Roteiro
        </button>
      </div>

      {/* Commercial Priority: Marketplace Products */}
      <div className="space-y-2">
        <div className="px-4 flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <ShoppingBag className="w-4 h-4 text-[#FF8A00]" />
            <h3 className="font-extrabold text-sm text-slate-900">Produtos do Comércio Local</h3>
          </div>
          <button
            onClick={() => openModule('marketplace')}
            className="text-xs font-bold text-[#FF8A00] hover:underline"
          >
            Ver shopping
          </button>
        </div>

        <div className="px-4 flex space-x-3 overflow-x-auto pb-2 no-scrollbar">
          {DEMO_PRODUCTS.slice(0, 4).map((p) => (
            <div
              key={p.id}
              onClick={() => openModule('marketplace')}
              className="w-36 bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xs hover:shadow-xs shrink-0 cursor-pointer flex flex-col justify-between"
            >
              <div className="h-24 w-full bg-slate-100 relative">
                <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                {p.badge && (
                  <span className="absolute top-1.5 left-1.5 bg-[#009B4D] text-white text-[8px] font-black px-1.5 py-0.2 rounded">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="p-2.5">
                <h4 className="font-bold text-[11px] text-slate-800 line-clamp-1">{p.name}</h4>
                <div className="flex items-center space-x-1 mt-0.5">
                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                  <span className="text-[10px] text-slate-600 font-semibold">{p.rating}</span>
                </div>
                <span className="font-black text-xs text-[#009B4D] block mt-1">
                  R$ {p.price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Priority Commercial: FoodPlace Restaurants */}
      <div className="space-y-2">
        <div className="px-4 flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <UtensilsCrossed className="w-4 h-4 text-[#EA580C]" />
            <h3 className="font-extrabold text-sm text-slate-900">Flutuantes & Peixarias</h3>
          </div>
          <button
            onClick={() => openModule('foodplace')}
            className="text-xs font-bold text-[#EA580C] hover:underline"
          >
            Ver todos
          </button>
        </div>

        <div className="px-4 space-y-2">
          {DEMO_RESTAURANTS.slice(0, 2).map((rest) => (
            <div
              key={rest.id}
              onClick={() => openModule('foodplace')}
              className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between cursor-pointer hover:shadow-xs transition-shadow"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={rest.imageUrl}
                  alt={rest.name}
                  className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-100"
                />
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{rest.name}</h4>
                  <p className="text-[11px] text-slate-500">{rest.cuisine}</p>
                  <span className="text-[10px] text-[#009B4D] font-bold block mt-0.5">
                    Tempo: {rest.deliveryTimeMinutes} • Taxa: R$ {rest.deliveryFee.toFixed(2)}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
