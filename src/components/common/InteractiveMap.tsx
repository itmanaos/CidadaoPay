// CIDADÃO$ — InteractiveMap Component
// Spec Section 11: Geographic intelligence with explicit fluvial vs terrestrial routes

import React, { useState } from 'react';
import { MapPin, Ship, Navigation, Eye } from 'lucide-react';

export interface MapPOI {
  id: string;
  name: string;
  type: 'fluvial_port' | 'ubs' | 'school' | 'market' | 'community' | 'tourism';
  modalType: 'fluvial' | 'terrestre';
  lat: number;
  lng: number;
  description: string;
  communityOrDistrict: string;
}

const MANACAPURU_POIS: MapPOI[] = [
  {
    id: 'poi_1',
    name: 'Porto Hidroviário de Manacapuru',
    type: 'fluvial_port',
    modalType: 'fluvial',
    lat: -3.3005,
    lng: -60.622,
    description: 'Ponto principal de embarque de lanchas rápidas para Manaus e barcos recreio para o Alto Solimões.',
    communityOrDistrict: 'Centro / Orla',
  },
  {
    id: 'poi_2',
    name: 'UBS Fluvial Dr. Walter Góes',
    type: 'ubs',
    modalType: 'fluvial',
    lat: -3.315,
    lng: -60.598,
    description: 'Embarcação de saúde pública em atendimento itinerante na calha do Rio Solimões.',
    communityOrDistrict: 'Comunidade do Supiá',
  },
  {
    id: 'poi_3',
    name: 'E.M. Fluvial Rio Solimões',
    type: 'school',
    modalType: 'fluvial',
    lat: -3.328,
    lng: -60.582,
    description: 'Polo educacional com transporte de lanchas escolares da SEMED.',
    communityOrDistrict: 'Costa do Pesqueiro',
  },
  {
    id: 'poi_4',
    name: 'Terminal Pesqueiro e Feira do Produtor',
    type: 'market',
    modalType: 'terrestre',
    lat: -3.298,
    lng: -60.619,
    description: 'Desembarque diário de tambaqui, pirarucu e farinha de Uarini.',
    communityOrDistrict: 'Centro',
  },
  {
    id: 'poi_5',
    name: 'Arena do Parque do Ingá (Cirandódromo)',
    type: 'tourism',
    modalType: 'terrestre',
    lat: -3.295,
    lng: -60.625,
    description: 'Palco do Festival de Cirandas de Manacapuru (Flor Matizada, Guerreiros Mura, Tradicional).',
    communityOrDistrict: 'Centro',
  },
  {
    id: 'poi_6',
    name: 'Balneário do Miriti',
    type: 'tourism',
    modalType: 'terrestre',
    lat: -3.265,
    lng: -60.605,
    description: 'Águas escuras refrescantes do Igarapé do Miriti com quiosques de gastronomia regional.',
    communityOrDistrict: 'AM-070 Km 06',
  },
];

export const InteractiveMap: React.FC<{ filterType?: string; onSelectPoi?: (poi: MapPOI) => void }> = ({
  filterType,
  onSelectPoi,
}) => {
  const [selectedPoi, setSelectedPoi] = useState<MapPOI | null>(MANACAPURU_POIS[0]);
  const [layer, setLayer] = useState<'all' | 'fluvial' | 'terrestre'>('all');

  const filteredPois = MANACAPURU_POIS.filter((p) => {
    if (filterType && p.type !== filterType) return false;
    if (layer !== 'all' && p.modalType !== layer) return false;
    return true;
  });

  const handlePoiClick = (poi: MapPOI) => {
    setSelectedPoi(poi);
    if (onSelectPoi) onSelectPoi(poi);
  };

  return (
    <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-md relative">
      {/* Map Control Bar */}
      <div className="bg-slate-800/90 backdrop-blur-md px-3 py-2 border-b border-slate-700 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1.5 text-slate-300">
          <Navigation className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-bold text-white text-[11px]">Mapa Territorial de Manacapuru</span>
        </div>

        <div className="flex items-center space-x-1 bg-slate-900 p-0.5 rounded-lg border border-slate-700">
          <button
            onClick={() => setLayer('all')}
            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
              layer === 'all' ? 'bg-[#009B4D] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setLayer('fluvial')}
            className={`px-2 py-0.5 rounded text-[10px] font-semibold flex items-center space-x-0.5 ${
              layer === 'fluvial' ? 'bg-[#0756A6] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Ship className="w-2.5 h-2.5" />
            <span>Fluvial</span>
          </button>
          <button
            onClick={() => setLayer('terrestre')}
            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
              layer === 'terrestre' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Terrestre
          </button>
        </div>
      </div>

      {/* Map Graphic Canvas Simulation */}
      <div className="relative h-64 w-full bg-[#1b3022] overflow-hidden select-none">
        {/* River Graphic — Solimões River Curve */}
        <svg className="absolute inset-0 w-full h-full opacity-70" viewBox="0 0 400 240">
          {/* River Corridor (Solimões) */}
          <path
            d="M 0,160 Q 120,130 200,165 T 400,150 L 400,240 L 0,240 Z"
            fill="#806240"
            className="transition-all"
          />
          <path
            d="M 0,160 Q 120,130 200,165 T 400,150"
            stroke="#b38b59"
            strokeWidth="38"
            fill="none"
            opacity="0.85"
          />
          {/* Igarapé do Miriti branch (Dark water) */}
          <path
            d="M 230,0 Q 220,70 190,130"
            stroke="#1a1e24"
            strokeWidth="10"
            fill="none"
            opacity="0.9"
          />
          {/* Terrestre Road AM-070 */}
          <path
            d="M 240,0 L 160,110 L 80,120"
            stroke="#e2e8f0"
            strokeWidth="3"
            strokeDasharray="4 3"
            fill="none"
            opacity="0.75"
          />
          {/* Fluvial Ferry/Lancha path */}
          <path
            d="M 80,160 Q 200,170 360,160"
            stroke="#60a5fa"
            strokeWidth="2.5"
            strokeDasharray="3 3"
            fill="none"
            opacity="0.8"
          />
        </svg>

        {/* River Labels */}
        <div className="absolute bottom-4 left-6 text-[10px] font-black uppercase tracking-widest text-amber-200/80 drop-shadow-md">
          🌊 Rio Solimões
        </div>
        <div className="absolute top-4 right-10 text-[9px] font-bold text-slate-300/80 drop-shadow-md">
          Igarapé do Miriti (Águas Pretas)
        </div>
        <div className="absolute top-12 left-10 text-[9px] font-bold text-emerald-300/90 drop-shadow-md">
          Área Urbana (Manacapuru)
        </div>

        {/* Render POI Pins on the Map */}
        {filteredPois.map((poi, idx) => {
          const isSelected = selectedPoi?.id === poi.id;
          // Approximate relative pixel coordinates on the svg
          const posMap: Record<string, { top: string; left: string }> = {
            poi_1: { top: '62%', left: '22%' }, // Porto
            poi_2: { top: '68%', left: '55%' }, // UBS Fluvial
            poi_3: { top: '75%', left: '78%' }, // Escola Fluvial
            poi_4: { top: '48%', left: '26%' }, // Mercado
            poi_5: { top: '38%', left: '20%' }, // Cirandódromo
            poi_6: { top: '18%', left: '60%' }, // Miriti
          };
          const coords = posMap[poi.id] || { top: `${30 + idx * 10}%`, left: `${20 + idx * 12}%` };

          return (
            <button
              key={poi.id}
              onClick={() => handlePoiClick(poi)}
              style={{ top: coords.top, left: coords.left }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all p-1 rounded-full flex items-center justify-center shadow-lg active:scale-95 ${
                isSelected
                  ? 'ring-4 ring-white bg-[#FF8A00] scale-125 z-20 text-white'
                  : poi.modalType === 'fluvial'
                  ? 'bg-[#0756A6] text-white hover:scale-110'
                  : 'bg-[#009B4D] text-white hover:scale-110'
              }`}
              title={poi.name}
            >
              {poi.modalType === 'fluvial' ? (
                <Ship className="w-3.5 h-3.5" />
              ) : (
                <MapPin className="w-3.5 h-3.5" />
              )}
            </button>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-2 right-2 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded-md text-[9px] text-slate-300 border border-slate-800 flex items-center space-x-2">
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-[#0756A6]" />
            <span>Modal Fluvial</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-[#009B4D]" />
            <span>Terrestre</span>
          </span>
        </div>
      </div>

      {/* Selected POI Details Card */}
      {selectedPoi && (
        <div className="p-3 bg-slate-800 text-white border-t border-slate-700 flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {selectedPoi.communityOrDistrict}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">
                • {selectedPoi.modalType === 'fluvial' ? 'Acesso Hidroviário' : 'Acesso Rodoviário'}
              </span>
            </div>
            <h4 className="font-bold text-xs mt-1 text-white">{selectedPoi.name}</h4>
            <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-2">{selectedPoi.description}</p>
          </div>
          <button
            onClick={() => onSelectPoi && onSelectPoi(selectedPoi)}
            className="ml-2 shrink-0 p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
            title="Ver detalhes"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
