// CIDADÃO$ — Module 01: Cadastro e Identidade do Cidadão (MPUID)
// Spec Section 7: Unique municipal registration, digital RG with QR code, family network, LGPD

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  QrCode,
  Users,
  Award,
  ArrowLeft,
  Lock,
  Download,
  Share2,
} from 'lucide-react';

export const CitizenIdentityView: React.FC = () => {
  const { user, closeModule } = useApp();
  const [activeTab, setActiveTab] = useState<'cartao' | 'familia' | 'privacidade'>('cartao');
  const [showQrVerification, setShowQrVerification] = useState<boolean>(false);

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
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0756A6] bg-blue-50 px-1.5 py-0.5 rounded">
                Módulo 01
              </span>
              <h2 className="font-extrabold text-base text-[#163047]">Identidade & MPUID</h2>
            </div>
            <p className="text-[11px] text-slate-500">Identificador Municipal Único de Manacapuru</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-4">
        <div className="bg-white p-1 rounded-xl border border-slate-200 grid grid-cols-3 text-xs font-bold shadow-2xs">
          <button
            onClick={() => setActiveTab('cartao')}
            className={`py-2 rounded-lg transition-colors ${
              activeTab === 'cartao' ? 'bg-[#0756A6] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Cartão MPUID
          </button>
          <button
            onClick={() => setActiveTab('familia')}
            className={`py-2 rounded-lg transition-colors ${
              activeTab === 'familia' ? 'bg-[#0756A6] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Rede Familiar ({user.familyMembers.length})
          </button>
          <button
            onClick={() => setActiveTab('privacidade')}
            className={`py-2 rounded-lg transition-colors ${
              activeTab === 'privacidade' ? 'bg-[#0756A6] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            LGPD & Dados
          </button>
        </div>
      </div>

      {activeTab === 'cartao' ? (
        /* Digital ID Card */
        <div className="px-4 space-y-4">
          {/* Card Presentation */}
          <div className="bg-gradient-to-br from-[#072F58] via-[#0756A6] to-[#006B3C] text-white rounded-3xl p-5 shadow-xl relative overflow-hidden border border-white/20">
            {/* Background watermark */}
            <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute right-4 top-4 text-right">
              <span className="text-[9px] uppercase tracking-widest font-bold text-amber-300 block">
                PREFEITURA DE
              </span>
              <span className="text-xs font-black text-white tracking-wider">MANACAPURU — AM</span>
            </div>

            {/* Header of card */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30">
                <span className="font-black text-xl text-[#FFC43D]">C$</span>
              </div>
              <div>
                <h3 className="font-black text-sm tracking-tight">IDENTIDADE DIGITAL MUNICIPAL</h3>
                <span className="text-[10px] text-emerald-300 font-semibold flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 inline mr-1" />
                  Nível de Verificação Ouro (Gov.br)
                </span>
              </div>
            </div>

            {/* Photo & Info */}
            <div className="mt-5 flex items-start space-x-4">
              <div className="w-20 h-24 rounded-2xl overflow-hidden border-2 border-emerald-400/80 shadow-md shrink-0">
                <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-0 space-y-1 text-xs">
                <div>
                  <span className="text-[10px] text-slate-300 font-semibold block uppercase">Cidadão</span>
                  <p className="font-extrabold text-sm text-white truncate">{user.name}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-300 font-semibold block uppercase">CPF</span>
                  <p className="font-mono text-xs text-emerald-200">{user.cpfMasked}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-300 font-semibold block uppercase">Localidade</span>
                  <p className="text-xs text-white truncate">
                    {user.neighborhoodOrCommunity} ({user.locationType})
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Card Bar: MPUID code & QR Button */}
            <div className="mt-5 pt-3 border-t border-white/20 flex items-center justify-between">
              <div>
                <span className="text-[9px] uppercase font-bold text-amber-300 tracking-wider block">
                  Identificador Interno MPUID
                </span>
                <span className="font-mono font-black text-sm text-white tracking-widest">{user.mpuid}</span>
              </div>

              <button
                onClick={() => setShowQrVerification(!showQrVerification)}
                className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white active:scale-95 flex items-center space-x-1 border border-white/30 text-xs font-bold shadow-xs"
              >
                <QrCode className="w-4 h-4 text-[#FFC43D]" />
                <span>QR Code</span>
              </button>
            </div>
          </div>

          {/* QR Code Validation Modal/Card */}
          {showQrVerification && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-lg text-center space-y-3 animate-in fade-in">
              <div className="w-40 h-40 mx-auto bg-slate-900 rounded-2xl p-3 flex items-center justify-center text-white relative">
                {/* Simulated dynamic QR Code */}
                <div className="w-full h-full border-4 border-dashed border-emerald-400 rounded-xl flex flex-col items-center justify-center p-2">
                  <QrCode className="w-20 h-20 text-emerald-400" />
                  <span className="text-[9px] font-mono text-emerald-300 mt-1 font-bold">MPUID AUTÊNTICO</span>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">QR Code de Verificação Municipal</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Apresente este código em UBSs, escolas e no transporte hidroviário para identificação imediata.
                </p>
              </div>
              <div className="flex justify-center space-x-2 pt-2">
                <button
                  onClick={() => setShowQrVerification(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Ocultar QR
                </button>
              </div>
            </div>
          )}

          {/* Legal Notice */}
          <div className="p-3 bg-blue-50 border border-blue-200/60 rounded-xl text-[11px] text-[#0756A6] space-y-1">
            <div className="flex items-center space-x-1 font-bold">
              <Lock className="w-3.5 h-3.5" />
              <span>Aviso Institucional (LGPD & Legislação):</span>
            </div>
            <p className="text-slate-600">
              O MPUID é um identificador municipal unificado para prestação de serviços públicos de Manacapuru.
              Não substitui a Carteira de Identidade Nacional (CIN) emitida por órgãos estaduais de segurança.
            </p>
          </div>
        </div>
      ) : activeTab === 'familia' ? (
        /* Family Network */
        <div className="px-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900">Membros da Família Vinculados</h3>
            <span className="text-[11px] text-slate-500">CadÚnico Municipal</span>
          </div>

          {user.familyMembers.map((fam) => (
            <div
              key={fam.id}
              className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0756A6] font-bold text-xs flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{fam.name}</h4>
                  <span className="text-[11px] text-slate-500 capitalize">{fam.relationship}</span>
                  {fam.mpuid && (
                    <span className="block font-mono text-[10px] text-emerald-700 font-bold">
                      {fam.mpuid}
                    </span>
                  )}
                </div>
              </div>

              <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">
                Dependente Ativo
              </span>
            </div>
          ))}
        </div>
      ) : (
        /* Privacy and LGPD */
        <div className="px-4 space-y-3 text-xs">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900">Gestão de Consentimentos (LGPD)</h3>
            <p className="text-slate-500 text-[11px]">
              Seus dados pessoais municipais são estritamente segregados de finalidades comerciais.
            </p>

            <div className="space-y-2.5 pt-2">
              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span className="text-slate-800 font-semibold">Alertas de Defesa Civil e Enchentes</span>
                <input type="checkbox" defaultChecked className="text-[#009B4D] w-4 h-4" />
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span className="text-slate-800 font-semibold">Localização para Rastreio Fluvial</span>
                <input type="checkbox" defaultChecked className="text-[#009B4D] w-4 h-4" />
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span className="text-slate-800 font-semibold">Receber Ofertas do Marketplace Local</span>
                <input type="checkbox" defaultChecked className="text-[#009B4D] w-4 h-4" />
              </label>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button className="flex items-center space-x-1 text-[#0756A6] font-bold text-xs hover:underline">
                <Download className="w-3.5 h-3.5" />
                <span>Exportar Meus Dados (JSON)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
