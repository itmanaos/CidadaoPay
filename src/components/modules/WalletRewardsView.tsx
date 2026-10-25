// CIDADÃO$ — Module 12: Carteira Digital / MRT$ / Recompensas
// Spec Section 7: Three segregated domains (promotional points, restricted municipal benefits, sandbox fiat)

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wallet,
  ArrowLeft,
  QrCode,
  ArrowUpRight,
  ArrowDownLeft,
  Award,
  ShieldCheck,
  CreditCard,
  Plus,
} from 'lucide-react';

export const WalletRewardsView: React.FC = () => {
  const { wallet, user, closeModule, addRewardPoints } = useApp();
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'extrato' | 'beneficios' | 'pontos'>('extrato');

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
              <span className="text-[10px] font-black uppercase tracking-widest text-[#16A34A] bg-emerald-50 px-1.5 py-0.5 rounded">
                Módulo 12
              </span>
              <h2 className="font-extrabold text-base text-[#163047]">Carteira MRT$ & Pontos</h2>
            </div>
            <p className="text-[11px] text-slate-500">Benefícios, recompensas e sandbox financeiro</p>
          </div>
        </div>
      </div>

      {/* Wallet Balance Cards (3 Segregated Domains) */}
      <div className="p-4 space-y-3">
        {/* Domain 1: Restricted Municipal Benefit */}
        <div className="bg-gradient-to-r from-[#072F58] to-[#0756A6] text-white p-4 rounded-2xl shadow-md relative overflow-hidden">
          <span className="text-[9px] uppercase font-bold tracking-wider text-amber-300 block">
            Benefício Municipal Restrito
          </span>
          <h4 className="text-xs text-sky-100">Bolsa Cidadão Manacapuru (Alimentação/Saúde)</h4>
          <div className="text-2xl font-black mt-1 text-white">
            R$ {wallet.municipalBenefitBalance.toFixed(2)}
          </div>
          <span className="text-[10px] text-sky-200 mt-1 block">
            Uso autorizado na feira municipal, mercearias e lanchas cadastradas.
          </span>
        </div>

        {/* Domain 2: Promotional MRT$ Points */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[9px] uppercase font-bold text-amber-600 block">Pontos Cidadão</span>
            <div className="text-lg font-black text-[#FF8A00] mt-0.5">{wallet.mrtPointsBalance} pts</div>
            <p className="text-[10px] text-slate-400 mt-0.5">Acumulados por vacinação e compras locais.</p>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[9px] uppercase font-bold text-slate-400 block">Saldo Sandbox (Testes)</span>
            <div className="text-lg font-black text-[#009B4D] mt-0.5">R$ {wallet.sandboxFiatBalance.toFixed(2)}</div>
            <p className="text-[10px] text-slate-400 mt-0.5">Ambiente demonstrativo PIX/Cartão.</p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => setShowQrModal(true)}
            className="py-2.5 bg-[#009B4D] hover:bg-[#006B3C] text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-xs"
          >
            <QrCode className="w-4 h-4" />
            <span>Pagar com QR Code</span>
          </button>
          <button
            onClick={() => addRewardPoints(50, 'Bônus Cidadão Consciente — Participação Comunitária')}
            className="py-2.5 bg-[#0756A6] hover:bg-[#072F58] text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Ganhar +50 Pontos</span>
          </button>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-xs rounded-2xl p-5 text-center shadow-2xl space-y-3">
            <div className="w-40 h-40 mx-auto bg-slate-900 rounded-2xl p-3 flex items-center justify-center text-white">
              <QrCode className="w-24 h-24 text-emerald-400" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">QR Code de Pagamento Sandbox</h4>
            <p className="text-xs text-slate-500">
              Apresente ao comerciante ou na rampa do porto para débito do benefício ou carteira.
            </p>
            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Transactions List */}
      <div className="px-4 space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <h4 className="font-extrabold text-sm text-slate-900">Extrato de Movimentações</h4>
          <span className="text-[11px] text-slate-400">Recentes</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 shadow-2xs">
          {wallet.recentTransactions.map((tx) => (
            <div key={tx.id} className="p-3 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    tx.type === 'credito' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}
                >
                  {tx.type === 'credito' ? (
                    <ArrowDownLeft className="w-4 h-4" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-900 line-clamp-1">{tx.description}</h5>
                  <span className="text-[10px] text-slate-400">{tx.date}</span>
                </div>
              </div>

              <span
                className={`font-black text-xs ${
                  tx.type === 'credito' ? 'text-[#009B4D]' : 'text-slate-900'
                }`}
              >
                {tx.type === 'credito' ? '+' : '-'}
                {tx.source === 'pontos_recompensa' ? `${tx.amount} pts` : `R$ ${tx.amount.toFixed(2)}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
