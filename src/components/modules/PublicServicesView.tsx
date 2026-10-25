// CIDADÃO$ — Module 02: Atendimento e Serviços Públicos
// Spec Section 7: Service catalog, protocol opening, scheduling and SLA tracking

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceProtocol } from '../../types';
import {
  Building2,
  ArrowLeft,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Star,
  Search,
} from 'lucide-react';

export const PublicServicesView: React.FC = () => {
  const { protocols, addProtocol, closeModule, user } = useApp();
  const [activeTab, setActiveTab] = useState<'catalogo' | 'meus_protocolos' | 'novo'>('meus_protocolos');

  // Form State
  const [serviceCode, setServiceCode] = useState<string>('ILUM-PUB');
  const [serviceTitle, setServiceTitle] = useState<string>('Reparo de Iluminação Pública / Fotocélula');
  const [category, setCategory] = useState<ServiceProtocol['category']>('iluminacao');
  const [description, setDescription] = useState<string>('');
  const [address, setAddress] = useState<string>(`${user.neighborhoodOrCommunity}, ${user.address}`);
  const [locationType, setLocationType] = useState<'urbana' | 'rural' | 'ribeirinha'>(user.locationType);
  const [successProtocolId, setSuccessProtocolId] = useState<string | null>(null);

  const catalogItems = [
    {
      code: 'ILUM-PUB',
      category: 'iluminacao' as const,
      title: 'Reparo de Iluminação Pública / Fotocélula',
      dept: 'Secretaria Municipal de Obras e Serviços Públicos (SEMOSP)',
      prazo: '3 a 5 dias úteis',
    },
    {
      code: 'LIMP-RAMPA',
      category: 'limpeza' as const,
      title: 'Limpeza e Desobstrução de Rampa / Porto Fluvial',
      dept: 'Secretaria de Limpeza e Meio Ambiente',
      prazo: '48 horas',
    },
    {
      code: 'SOC-CESTA',
      category: 'social' as const,
      title: 'Solicitação de Auxílio Emergencial / Cesta de Várzea',
      dept: 'Secretaria Municipal de Assistência Social (SEMAS)',
      prazo: '5 dias úteis',
    },
    {
      code: 'OUV-DENUNC',
      category: 'ouvidoria' as const,
      title: 'Ouvidoria Municipal / Sugestão ou Reclamação',
      dept: 'Ouvidoria Geral do Município de Manacapuru',
      prazo: 'Até 10 dias úteis',
    },
    {
      code: 'TRIB-IPTU',
      category: 'tributos' as const,
      title: 'Segunda Via de IPTU e Alvará de Funcionamento',
      dept: 'Secretaria Municipal de Finanças e Arrecadação',
      prazo: 'Imediato (Online)',
    },
  ];

  const handleCreateProtocol = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const newProt = addProtocol({
      serviceCode,
      serviceTitle,
      category,
      citizenMpuid: user.mpuid,
      citizenName: user.name,
      description,
      address,
      locationType,
      status: 'aberto',
      estimatedCompletion: '5 dias úteis',
    });

    setSuccessProtocolId(newProt.id);
    setDescription('');
    setActiveTab('meus_protocolos');
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
              <span className="text-[10px] font-black uppercase tracking-widest text-[#009B4D] bg-emerald-50 px-1.5 py-0.5 rounded">
                Módulo 02
              </span>
              <h2 className="font-extrabold text-base text-[#163047]">Serviços Públicos</h2>
            </div>
            <p className="text-[11px] text-slate-500">Atendimento municipal integrado e ouvidoria</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-4">
        <div className="bg-white p-1 rounded-xl border border-slate-200 grid grid-cols-3 text-xs font-bold shadow-2xs">
          <button
            onClick={() => setActiveTab('meus_protocolos')}
            className={`py-2 rounded-lg transition-colors ${
              activeTab === 'meus_protocolos'
                ? 'bg-[#009B4D] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Protocolos ({protocols.length})
          </button>
          <button
            onClick={() => setActiveTab('catalogo')}
            className={`py-2 rounded-lg transition-colors ${
              activeTab === 'catalogo'
                ? 'bg-[#009B4D] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Catálogo
          </button>
          <button
            onClick={() => setActiveTab('novo')}
            className={`py-2 rounded-lg transition-colors flex items-center justify-center space-x-1 ${
              activeTab === 'novo'
                ? 'bg-[#009B4D] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Solicitar</span>
          </button>
        </div>
      </div>

      {successProtocolId && (
        <div className="mx-4 mb-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-900 animate-in fade-in">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Protocolo <strong>{successProtocolId}</strong> registrado na Prefeitura!
            </span>
          </div>
          <button onClick={() => setSuccessProtocolId(null)} className="font-bold underline text-[11px]">
            OK
          </button>
        </div>
      )}

      {activeTab === 'meus_protocolos' ? (
        /* Protocols List */
        <div className="px-4 space-y-3">
          {protocols.map((prot) => (
            <div key={prot.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono font-black text-xs text-[#0756A6]">{prot.id}</span>
                  <span className="text-[10px] text-slate-400 block">{prot.createdAt}</span>
                </div>
                <span
                  className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full ${
                    prot.status === 'concluido'
                      ? 'bg-emerald-100 text-emerald-700'
                      : prot.status === 'em_atendimento'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {prot.status}
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-xs text-slate-900">{prot.serviceTitle}</h4>
                <p className="text-[11px] text-slate-600 mt-0.5">{prot.description}</p>
                <p className="text-[10px] text-slate-400 mt-1">📍 {prot.address}</p>
              </div>

              {prot.feedbackRating ? (
                <div className="flex items-center space-x-1 text-xs text-amber-500 pt-1 border-t border-slate-100">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-[11px]">Avaliado: {prot.feedbackRating}/5 estrelas</span>
                </div>
              ) : (
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Previsão: {prot.estimatedCompletion}</span>
                  <span className="text-[#009B4D] font-bold">SLA Municipal Ativo</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : activeTab === 'catalogo' ? (
        /* Catalog */
        <div className="px-4 space-y-3">
          {catalogItems.map((item) => (
            <div
              key={item.code}
              className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow flex items-start justify-between"
            >
              <div>
                <span className="text-[9px] uppercase font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                  {item.code}
                </span>
                <h4 className="font-bold text-xs text-slate-900 mt-1">{item.title}</h4>
                <p className="text-[11px] text-slate-500">{item.dept}</p>
                <span className="text-[10px] text-slate-400 font-medium block mt-1">Prazo: {item.prazo}</span>
              </div>

              <button
                onClick={() => {
                  setServiceCode(item.code);
                  setServiceTitle(item.title);
                  setCategory(item.category);
                  setActiveTab('novo');
                }}
                className="p-2 rounded-xl bg-slate-100 hover:bg-[#009B4D] hover:text-white text-slate-700 text-xs font-bold transition-colors shrink-0 ml-2"
              >
                Abrir
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* New Protocol Form */
        <div className="px-4">
          <form onSubmit={handleCreateProtocol} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3.5 text-xs">
            <h3 className="font-extrabold text-sm text-slate-900">Novo Protocolo de Atendimento</h3>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Serviço Selecionado:</label>
              <input
                type="text"
                disabled
                value={serviceTitle}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Descreva a Situação / Solicitação:</label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Poste com lâmpada apagada há 3 dias perto do flutuante..."
                className="w-full border border-slate-200 rounded-xl p-3 text-xs focus:outline-hidden focus:border-[#009B4D]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Localidade ou Referência Geográfica:</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Classificação Territorial:</label>
              <div className="grid grid-cols-3 gap-2">
                {(['urbana', 'rural', 'ribeirinha'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setLocationType(t)}
                    className={`py-2 rounded-xl border text-xs capitalize font-bold transition-all ${
                      locationType === t
                        ? 'border-[#009B4D] bg-emerald-50 text-[#009B4D] ring-2 ring-emerald-500/20'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#009B4D] hover:bg-[#006B3C] text-white font-bold rounded-xl text-xs shadow-md transition-all active:scale-98"
            >
              Registrar Protocolo Municipal
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
