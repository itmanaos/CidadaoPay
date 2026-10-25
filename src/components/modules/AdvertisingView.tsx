// CIDADÃO$ — Module 15: Publicidade e Anúncios
// Spec Section 7: Local advertiser campaigns, job postings, and advertising management

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_ADS } from '../../data/demoData';
import { Megaphone, ArrowLeft, Briefcase, Plus, CheckCircle2 } from 'lucide-react';

export const AdvertisingView: React.FC = () => {
  const { closeModule, openModule } = useApp();
  const [activeTab, setActiveTab] = useState<'anuncios' | 'criar'>('anuncios');

  // New Ad form
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [advertiser, setAdvertiser] = useState('');
  const [category, setCategory] = useState<'comercio' | 'oportunidade_emprego'>('comercio');
  const [success, setSuccess] = useState<string | null>(null);

  const handleCreateAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSuccess(`Campanha "${title}" enviada para moderação da empresa operadora!`);
    setTitle('');
    setTagline('');
    setAdvertiser('');
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
              <span className="text-[10px] font-black uppercase tracking-widest text-[#9333EA] bg-purple-50 px-1.5 py-0.5 rounded">
                Módulo 15
              </span>
              <h2 className="font-extrabold text-base text-[#163047]">Publicidade & Anúncios</h2>
            </div>
            <p className="text-[11px] text-slate-500">Comércio local, oportunidades e campanhas</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-4">
        <div className="bg-white p-1 rounded-xl border border-slate-200 grid grid-cols-2 text-xs font-bold shadow-2xs">
          <button
            onClick={() => setActiveTab('anuncios')}
            className={`py-2 rounded-lg transition-colors ${
              activeTab === 'anuncios' ? 'bg-[#9333EA] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Classificados & Vagas
          </button>
          <button
            onClick={() => setActiveTab('criar')}
            className={`py-2 rounded-lg transition-colors flex items-center justify-center space-x-1 ${
              activeTab === 'criar' ? 'bg-[#9333EA] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Anunciar Meu Negócio</span>
          </button>
        </div>
      </div>

      {success && (
        <div className="mx-4 mb-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{success}</span>
          </div>
          <button onClick={() => setSuccess(null)} className="font-bold underline text-[11px]">
            OK
          </button>
        </div>
      )}

      {activeTab === 'anuncios' ? (
        <div className="px-4 space-y-4">
          {DEMO_ADS.map((ad) => (
            <div key={ad.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
              <div className="h-36 w-full relative">
                <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-[#9333EA] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                  {ad.category === 'oportunidade_emprego' ? 'Vaga de Emprego' : 'Destaque Comercial'}
                </span>
              </div>
              <div className="p-4 space-y-2 text-xs">
                <span className="text-[10px] text-slate-400 font-bold block">{ad.advertiserName}</span>
                <h4 className="font-extrabold text-sm text-slate-900">{ad.title}</h4>
                <p className="text-slate-600 text-[11px] leading-relaxed">{ad.tagline}</p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    👁️ {ad.impressionsCount} visualizações
                  </span>
                  <button
                    onClick={() => {
                      if (ad.category === 'oportunidade_emprego') {
                        alert('Candidatura enviada via MPUID!');
                      } else {
                        openModule('marketplace');
                      }
                    }}
                    className="px-3 py-1.5 bg-[#9333EA] hover:bg-purple-700 text-white rounded-xl font-bold text-xs shadow-xs"
                  >
                    {ad.ctaText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-4">
          <form onSubmit={handleCreateAd} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs">
            <h4 className="font-bold text-sm text-slate-900">Nova Campanha Publicitária</h4>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Nome do Empreendimento:</label>
              <input
                type="text"
                required
                value={advertiser}
                onChange={(e) => setAdvertiser(e.target.value)}
                placeholder="Ex: Peixaria Solimões, Serraria..."
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Título do Anúncio:</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Super Desconto no Tambaqui de Manejo..."
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Descrição / Benefício:</label>
              <textarea
                required
                rows={2}
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Ex: Venha saborear o autêntico peixe assado na brasa..."
                className="w-full border border-slate-200 rounded-xl p-3 text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#9333EA] hover:bg-purple-700 text-white font-bold rounded-xl text-xs shadow-md transition-all"
            >
              Enviar para Aprovação (Plano Demo)
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
