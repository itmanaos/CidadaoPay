// CIDADÃO$ — Module 09: Serviços Profissionais
// Spec Section 7: Riverboat mechanics, naval carpenters, solar installers and local tradesmen

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_PROFESSIONALS } from '../../data/demoData';
import { ProfessionalWorker } from '../../types';
import {
  Wrench,
  ArrowLeft,
  Star,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  ShieldCheck,
  Search,
} from 'lucide-react';

export const ProfessionalServicesView: React.FC = () => {
  const { closeModule, user } = useApp();
  const [selectedProf, setSelectedProf] = useState<ProfessionalWorker | null>(null);
  const [quoteMessage, setQuoteMessage] = useState<string>('');
  const [quoteSuccess, setQuoteSuccess] = useState<string | null>(null);

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProf || !quoteMessage.trim()) return;

    setQuoteSuccess(`Orçamento enviado para ${selectedProf.name}! O profissional entrará em contato via chat.`);
    setQuoteMessage('');
  };

  return (
    <div className="bg-[#F3F6FA] min-h-full pb-16">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              if (selectedProf) setSelectedProf(null);
              else closeModule();
            }}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-600"
            title="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#7C3AED] bg-purple-50 px-1.5 py-0.5 rounded">
                Módulo 09
              </span>
              <h2 className="font-extrabold text-base text-[#163047]">Serviços Profissionais</h2>
            </div>
            <p className="text-[11px] text-slate-500">Mecânicos náuticos, carpinteiros e autônomos</p>
          </div>
        </div>
      </div>

      {quoteSuccess && (
        <div className="mx-4 my-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{quoteSuccess}</span>
          </div>
          <button onClick={() => setQuoteSuccess(null)} className="font-bold underline text-[11px]">
            OK
          </button>
        </div>
      )}

      {selectedProf ? (
        /* Professional Detail and Quote Form */
        <div className="p-4 space-y-4 text-xs">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-start space-x-3.5">
            <img
              src={selectedProf.avatarUrl}
              alt={selectedProf.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-200"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-sm text-slate-900">{selectedProf.name}</h3>
                <span className="flex items-center text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                  {selectedProf.rating}
                </span>
              </div>
              <p className="text-xs text-purple-700 font-semibold">{selectedProf.profession}</p>
              <div className="flex items-center space-x-2 mt-1 text-[11px] text-slate-500">
                <span>Disponibilidade: {selectedProf.availability}</span>
                {selectedProf.verifiedMei && (
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
                    MEI Verificado
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <h4 className="font-bold text-slate-800">Sobre a Experiência:</h4>
            <p className="text-slate-600 leading-relaxed">{selectedProf.description}</p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-slate-500">Taxa base estimada / visita técnica:</span>
              <span className="font-black text-sm text-[#009B4D]">A partir de R$ {selectedProf.hourlyOrMinRate.toFixed(2)}</span>
            </div>
          </div>

          {/* Quote Request Form */}
          <form onSubmit={handleSendQuote} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h4 className="font-bold text-slate-900">Solicitar Orçamento Gratuito</h4>
            <textarea
              required
              rows={3}
              value={quoteMessage}
              onChange={(e) => setQuoteMessage(e.target.value)}
              placeholder="Descreva o serviço necessário (ex: Motor Yamaha 40HP com falha na partida no Supiá)..."
              className="w-full border border-slate-200 rounded-xl p-3 text-xs focus:outline-hidden focus:border-purple-600"
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-[#7C3AED] hover:bg-purple-700 text-white font-bold rounded-xl text-xs shadow-md transition-all"
            >
              Enviar Solicitação de Orçamento
            </button>
          </form>
        </div>
      ) : (
        /* Professionals List */
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900">Profissionais Verificados em Manacapuru</h3>
            <span className="text-[11px] text-slate-500">{DEMO_PROFESSIONALS.length} disponíveis</span>
          </div>

          {DEMO_PROFESSIONALS.map((prof) => (
            <div
              key={prof.id}
              onClick={() => setSelectedProf(prof)}
              className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={prof.avatarUrl}
                  alt={prof.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-100"
                />
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{prof.name}</h4>
                  <p className="text-[11px] text-purple-700 font-semibold">{prof.profession}</p>
                  <div className="flex items-center space-x-2 text-[10px] text-slate-500 mt-0.5">
                    <span className="flex items-center text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                      {prof.rating} ({prof.reviewsCount})
                    </span>
                    <span>• {prof.availability}</span>
                  </div>
                </div>
              </div>

              <span className="text-xs font-bold text-[#009B4D] shrink-0 ml-2">
                R$ {prof.hourlyOrMinRate.toFixed(0)}+
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
