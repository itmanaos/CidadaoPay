// CIDADÃO$ — Module 14: BI, Dados e Inteligência Territorial
// Spec Section 7: Territorial dashboards, open data, indicators by district and riverine communities

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_INDICATORS } from '../../data/demoData';
import { InteractiveMap } from '../common/InteractiveMap';
import { BarChart3, ArrowLeft, TrendingUp, Users, Ship, Sprout } from 'lucide-react';

export const TerritorialBIView: React.FC = () => {
  const { closeModule, municipality } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const filteredIndicators = DEMO_INDICATORS.filter(
    (i) => selectedCategory === 'todos' || i.category === selectedCategory
  );

  return (
    <div className="bg-[#F3F6FA] min-h-full pb-16">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={closeModule}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-600"
            title="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#4F46E5] bg-indigo-50 px-1.5 py-0.5 rounded">
                Módulo 14
              </span>
              <h2 className="font-extrabold text-base text-[#163047]">BI & Dados Territoriais</h2>
            </div>
            <p className="text-[11px] text-slate-500">Indicadores de Manacapuru e comunidades</p>
          </div>
        </div>
      </div>

      {/* Map visualization banner */}
      <div className="p-4 space-y-3">
        <InteractiveMap />
      </div>

      {/* Category selector */}
      <div className="px-4 flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
        {['todos', 'populacao', 'saude', 'agro', 'educacao'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl capitalize whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-[#4F46E5] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Indicators Grid */}
      <div className="p-4 grid grid-cols-2 gap-3">
        {filteredIndicators.map((ind) => (
          <div key={ind.id} className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">
              {ind.category}
            </span>
            <div className="text-xl font-black text-slate-900">{ind.value}</div>
            <h4 className="font-bold text-xs text-slate-700 leading-snug">{ind.title}</h4>
            <span className="text-[10px] font-semibold text-emerald-600 block">{ind.change}</span>
            <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{ind.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
