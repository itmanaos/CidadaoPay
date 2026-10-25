// CIDADÃO$ — Module 07: Fretes e Logística
// Priority Commercial Core: Fluvial (lancha, barco, balsa) & Terrestre logistics with quotes and tracking

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FreightQuoteRequest } from '../../types';
import {
  Truck,
  Ship,
  ArrowLeft,
  Navigation,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Package,
} from 'lucide-react';

export const FreightView: React.FC = () => {
  const { freightRequests, addFreightRequest, closeModule, user } = useApp();

  const [activeTab, setActiveTab] = useState<'cotacao' | 'meus_fretes'>('cotacao');
  const [modalType, setModalType] = useState<'fluvial_voadeira' | 'fluvial_barco' | 'terrestre_pickup'>('fluvial_voadeira');
  const [origin, setOrigin] = useState<string>('Terminal Pesqueiro de Manacapuru (Centro)');
  const [destination, setDestination] = useState<string>('Comunidade do Supiá (Rio Solimões)');
  const [cargoType, setCargoType] = useState<FreightQuoteRequest['cargoType']>('produtos_agro');
  const [weightKg, setWeightKg] = useState<number>(150);
  const [quoteResult, setQuoteResult] = useState<FreightQuoteRequest | null>(null);

  // Dynamic formula for Amazonian logistics
  const calculateRate = () => {
    let base = 70.0;
    if (modalType === 'fluvial_voadeira') base = 120.0;
    if (modalType === 'fluvial_barco') base = 90.0;
    if (modalType === 'terrestre_pickup') base = 85.0;

    const weightFactor = weightKg * 0.45;
    return Math.round(base + weightFactor);
  };

  const handleCreateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedCost = calculateRate();

    const newReq = addFreightRequest({
      origin,
      destination,
      originType: origin.includes('Centro') ? 'urbana' : 'ribeirinha',
      destinationType: destination.includes('Supiá') || destination.includes('Bela Vista') ? 'ribeirinha' : 'urbana',
      cargoType,
      weightKg,
      modalPreferred: modalType,
      estimatedCost: calculatedCost,
      transporterName:
        modalType === 'fluvial_voadeira'
          ? 'Voadeira Rápida Solimões (Cap. Valdir)'
          : modalType === 'fluvial_barco'
          ? 'B/M Princesa de Manacapuru'
          : 'Pick-up Frete Fácil (Manoel)',
      status: 'cotado',
      trackingStep: 1,
    });

    setQuoteResult(newReq);
  };

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
              <span className="text-[10px] font-black uppercase tracking-widest text-[#D97706] bg-amber-50 px-1.5 py-0.5 rounded">
                Módulo 07
              </span>
              <h2 className="font-extrabold text-base text-[#163047]">Fretes & Logística</h2>
            </div>
            <p className="text-[11px] text-slate-500">Transporte Fluvial Solimões e Rodoviário</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-4">
        <div className="bg-white p-1 rounded-xl border border-slate-200 grid grid-cols-2 text-xs font-bold shadow-2xs">
          <button
            onClick={() => setActiveTab('cotacao')}
            className={`py-2 rounded-lg transition-colors ${
              activeTab === 'cotacao'
                ? 'bg-[#D97706] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Nova Cotação de Frete
          </button>
          <button
            onClick={() => setActiveTab('meus_fretes')}
            className={`py-2 rounded-lg transition-colors flex items-center justify-center space-x-1 ${
              activeTab === 'meus_fretes'
                ? 'bg-[#D97706] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Rastreamento & Envios</span>
            <span className="bg-amber-100 text-[#D97706] px-1.5 py-0.2 rounded-full text-[10px]">
              {freightRequests.length}
            </span>
          </button>
        </div>
      </div>

      {activeTab === 'cotacao' ? (
        <div className="px-4 space-y-4">
          {quoteResult ? (
            /* Quote Result Card */
            <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-md space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center space-x-1.5 text-emerald-600 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Cotação Gerada com Sucesso</span>
                </div>
                <span className="font-mono text-[11px] text-slate-400">{quoteResult.id}</span>
              </div>

              <div className="bg-amber-50/60 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Valor Estimado do Frete:</span>
                  <div className="text-xl font-black text-[#D97706]">R$ {quoteResult.estimatedCost.toFixed(2)}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Transportador sugerido:</span>
                  <span className="font-bold text-xs text-slate-800">{quoteResult.transporterName}</span>
                </div>
              </div>

              <div className="text-xs space-y-1.5 text-slate-600">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span><strong>Origem:</strong> {quoteResult.origin}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#0756A6]" />
                  <span><strong>Destino:</strong> {quoteResult.destination}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Package className="w-3.5 h-3.5 text-slate-400" />
                  <span><strong>Carga:</strong> {quoteResult.weightKg} kg ({quoteResult.cargoType})</span>
                </div>
              </div>

              <div className="pt-2 flex items-center space-x-2">
                <button
                  onClick={() => {
                    setActiveTab('meus_fretes');
                  }}
                  className="flex-1 py-2.5 bg-[#009B4D] hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Contratar & Iniciar Despacho
                </button>
                <button
                  onClick={() => setQuoteResult(null)}
                  className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl"
                >
                  Nova Cotação
                </button>
              </div>
            </div>
          ) : (
            /* Quote Form */
            <form onSubmit={handleCreateQuote} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3.5 text-xs">
              <h3 className="font-extrabold text-sm text-slate-900">Configuração de Transporte Fluvial ou Terrestre</h3>

              {/* Modal Choice */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">Escolha a Embarcação ou Veículo:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setModalType('fluvial_voadeira')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      modalType === 'fluvial_voadeira'
                        ? 'border-[#0756A6] bg-blue-50/70 text-[#0756A6] font-bold ring-2 ring-blue-500/20'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <Ship className="w-4 h-4 mb-1" />
                    <span className="block text-[11px] font-bold">Lancha Voadeira</span>
                    <span className="text-[10px] text-slate-500">Rápido pelo rio</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setModalType('fluvial_barco')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      modalType === 'fluvial_barco'
                        ? 'border-[#0756A6] bg-blue-50/70 text-[#0756A6] font-bold ring-2 ring-blue-500/20'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <Ship className="w-4 h-4 mb-1" />
                    <span className="block text-[11px] font-bold">Barco Recreio</span>
                    <span className="text-[10px] text-slate-500">Grande porte</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setModalType('terrestre_pickup')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      modalType === 'terrestre_pickup'
                        ? 'border-[#D97706] bg-amber-50/70 text-[#D97706] font-bold ring-2 ring-amber-500/20'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <Truck className="w-4 h-4 mb-1" />
                    <span className="block text-[11px] font-bold">Pick-up Terrestre</span>
                    <span className="text-[10px] text-slate-500">AM-070 / Urbano</span>
                  </button>
                </div>
              </div>

              {/* Origin */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Local de Coleta / Atracadouro de Origem:</label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 bg-white"
                >
                  <option value="Terminal Pesqueiro de Manacapuru (Centro)">Terminal Pesqueiro de Manacapuru (Centro)</option>
                  <option value="Porto Hidroviário de Manacapuru">Porto Hidroviário de Manacapuru</option>
                  <option value="Rampa da Terra Preta">Rampa da Terra Preta</option>
                  <option value="Comunidade do Supiá (Rio Solimões)">Comunidade do Supiá (Rio Solimões)</option>
                  <option value="Comunidade Bela Vista">Comunidade Bela Vista</option>
                </select>
              </div>

              {/* Destination */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Local de Desembarque / Destino:</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 bg-white"
                >
                  <option value="Comunidade do Supiá (Rio Solimões)">Comunidade do Supiá (Rio Solimões)</option>
                  <option value="Comunidade Bela Vista (Rio Solimões)">Comunidade Bela Vista (Rio Solimões)</option>
                  <option value="Costa do Pesqueiro">Costa do Pesqueiro</option>
                  <option value="Comunidade Jacarezinho">Comunidade Jacarezinho</option>
                  <option value="Feira Municipal de Manacapuru (Centro)">Feira Municipal de Manacapuru (Centro)</option>
                </select>
              </div>

              {/* Cargo Type & Weight */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tipo de Carga:</label>
                  <select
                    value={cargoType}
                    onChange={(e) => setCargoType(e.target.value as any)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 bg-white"
                  >
                    <option value="produtos_agro">Produtos Agro (Farinha/Açaí)</option>
                    <option value="carga_geral">Carga Geral & Mercadorias</option>
                    <option value="mudanca">Mudança / Mobília</option>
                    <option value="encomenda_rapida">Courier até 5kg</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Peso Estimado (Kg):</label>
                  <input
                    type="number"
                    min="1"
                    max="5000"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="p-2.5 bg-amber-50 text-amber-900 rounded-xl text-[11px] flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Rastreamento com indicação explícita de cobertura intermitente em igarapés.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#D97706] hover:bg-amber-600 text-white font-bold rounded-xl text-xs shadow-md transition-all active:scale-98"
              >
                Calcular Cotação Instantânea
              </button>
            </form>
          )}
        </div>
      ) : (
        /* Active Freight Trackings */
        <div className="px-4 space-y-3">
          {freightRequests.map((frt) => (
            <div key={frt.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div>
                  <span className="font-mono font-bold text-xs text-slate-900">{frt.id}</span>
                  <span className="text-[10px] text-slate-400 block">{frt.createdAt}</span>
                </div>
                <span
                  className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full ${
                    frt.status === 'em_transito'
                      ? 'bg-blue-100 text-blue-700 animate-pulse'
                      : frt.status === 'entregue'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {frt.status}
                </span>
              </div>

              <div className="text-xs space-y-1">
                <p>
                  <strong>Rota:</strong> {frt.origin} ➔ {frt.destination}
                </p>
                <p className="text-slate-500">
                  <strong>Embarcação:</strong> {frt.transporterName || 'Designando transportador'}
                </p>
                <p className="font-bold text-[#009B4D]">Valor: R$ {frt.estimatedCost.toFixed(2)}</p>
              </div>

              {/* Rastreamento River Steps */}
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Status do Percurso no Rio Solimões</span>
                  <span className="text-emerald-600">● Conectividade Intermitente</span>
                </div>
                <div className="grid grid-cols-4 gap-1 text-center">
                  <div className="text-[9px] font-bold text-emerald-700">Coleta</div>
                  <div className="text-[9px] font-bold text-emerald-700">Embarcado</div>
                  <div className={`text-[9px] font-bold ${frt.trackingStep >= 3 ? 'text-blue-700' : 'text-slate-400'}`}>
                    Em Trânsito
                  </div>
                  <div className={`text-[9px] font-bold ${frt.trackingStep >= 4 ? 'text-emerald-700' : 'text-slate-400'}`}>
                    Entregue
                  </div>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                  <div
                    className="bg-[#009B4D] h-full transition-all duration-500"
                    style={{ width: `${(frt.trackingStep / 4) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
