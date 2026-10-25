// CIDADÃO$ — ServicesCatalogView Component
// Spec Section 6 & 7: Comprehensive catalog of all 15 modules with search and categorization

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MODULE_CONFIG, ModuleKey } from '../../theme/tokens';
import { Grid, Search, ChevronRight } from 'lucide-react';

export const ServicesCatalogView: React.FC = () => {
  const { openModule } = useApp();
  const [filterCategory, setFilterCategory] = useState<string>('todos');
  const [search, setSearch] = useState<string>('');

  const moduleList = Object.entries(MODULE_CONFIG).map(([key, data]) => ({
    key: key as ModuleKey,
    ...data,
  }));

  const categories = [
    { key: 'todos', label: 'Todos os 15 Módulos' },
    { key: 'gov', label: 'Governo Digital' },
    { key: 'comercio', label: 'Economia & Comércio' },
    { key: 'mobilidade', label: 'Mobilidade & Fretes' },
    { key: 'bioeconomia', label: 'Bioeconomia & Turismo' },
    { key: 'financeiro', label: 'Financeiro & Carteira' },
    { key: 'gestao', label: 'BI & Gestão' },
  ];

  const filtered = moduleList.filter((m) => {
    if (filterCategory !== 'todos' && m.category !== filterCategory) return false;
    if (
      search &&
      !m.name.toLowerCase().includes(search.toLowerCase()) &&
      !m.description.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="p-4 space-y-4 pb-8">
      {/* Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center space-x-2">
          <Grid className="w-5 h-5 text-[#0756A6]" />
          <div>
            <h2 className="font-extrabold text-base text-slate-900">Catálogo dos 15 Módulos</h2>
            <p className="text-xs text-slate-500">
              Plataforma municipal integrada de transformação digital e bioeconomia
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mt-3 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por módulo, serviço, peixe, lancha..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-[#0756A6]"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setFilterCategory(c.key)}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors ${
              filterCategory === c.key
                ? 'bg-[#0756A6] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Modules List */}
      <div className="space-y-2.5">
        {filtered.map((item) => (
          <div
            key={item.key}
            onClick={() => openModule(item.key)}
            className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group active:scale-98"
          >
            <div className="flex items-center space-x-3.5">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-inner group-hover:scale-105 transition-transform"
                style={{ backgroundColor: item.bgColor, color: item.color }}
              >
                {item.number}
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Módulo {item.number}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500">
                    {item.category}
                  </span>
                </div>
                <h3 className="font-extrabold text-xs text-slate-900 mt-0.5">{item.name}</h3>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{item.description}</p>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 group-hover:text-slate-700 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
};
