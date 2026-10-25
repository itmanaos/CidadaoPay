// CIDADÃO$ — ExploreView Component
// Spec Section 6: Map & directory of all Manacapuru points of interest

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InteractiveMap, MapPOI } from '../common/InteractiveMap';
import { Compass, Ship, MapPin, Building, Search, ArrowRight } from 'lucide-react';

export const ExploreView: React.FC = () => {
  const { openModule, municipality } = useApp();
  const [selectedPoi, setSelectedPoi] = useState<MapPOI | null>(null);

  const handlePoiAction = (poi: MapPOI) => {
    if (poi.type === 'fluvial_port') openModule('tickets-mobility');
    else if (poi.type === 'ubs') openModule('health');
    else if (poi.type === 'school') openModule('education');
    else if (poi.type === 'market') openModule('marketplace');
    else if (poi.type === 'tourism') openModule('tourism-gastronomy');
  };

  return (
    <div className="p-4 space-y-4 pb-8">
      {/* Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center space-x-2">
          <Compass className="w-5 h-5 text-[#009B4D]" />
          <div>
            <h2 className="font-extrabold text-base text-slate-900">Explorar Manacapuru</h2>
            <p className="text-xs text-slate-500">
              Rotas fluviais no Solimões, comunidades ribeirinhas e equipamentos públicos
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <InteractiveMap onSelectPoi={(poi) => setSelectedPoi(poi)} />

      {/* Selected Location Action Card */}
      {selectedPoi && (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Ponto Selecionado
            </span>
            <span className="text-[10px] text-slate-400 font-semibold">{selectedPoi.communityOrDistrict}</span>
          </div>

          <h3 className="font-black text-sm text-slate-900">{selectedPoi.name}</h3>
          <p className="text-xs text-slate-600">{selectedPoi.description}</p>

          <button
            onClick={() => handlePoiAction(selectedPoi)}
            className="w-full mt-2 py-2.5 bg-[#009B4D] hover:bg-[#006B3C] text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center space-x-1.5 transition-colors"
          >
            <span>Acessar Módulo Correspondente</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Riverine Communities Directory */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <h3 className="font-extrabold text-sm text-slate-900">Comunidades Ribeirinhas Atendidas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {municipality.geography.riverineCommunities.map((com, idx) => (
            <div key={idx} className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Ship className="w-4 h-4 text-[#0756A6]" />
                <span className="font-semibold text-slate-800">{com}</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-bold">Ativa</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
