// CIDADÃO$ — BUSINESS ENGINE (Empresa Operadora & Monetização)
// Spec Section 8 & 9: Multi-tenant SaaS, commission rules, subscriptions, merchant balances, settlement

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building,
  DollarSign,
  TrendingUp,
  Percent,
  CreditCard,
  Users,
  Settings,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

export const BusinessEngineView: React.FC = () => {
  const { municipality, setViewMode } = useApp();
  const [activeTab, setActiveTab] = useState<'comissoes' | 'assinaturas' | 'conciliacao'>('comissoes');

  // Parametric commission rates
  const [marketplaceRate, setMarketplaceRate] = useState<number>(10.0);
  const [foodplaceRate, setFoodplaceRate] = useState<number>(12.0);
  const [freightRate, setFreightRate] = useState<number>(6.0);
  const [servicesRate, setServicesRate] = useState<number>(7.0);
  const [ticketsRate, setTicketsRate] = useState<number>(5.0);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSaveRules = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const commercialPlans = [
    {
      name: 'Plano Várzea Básico (MEI / Produtor)',
      monthlyPrice: 'R$ 49,90/mês',
      commissionDiscount: 'Comissão padrão',
      storesEnrolled: 24,
      features: ['Até 50 produtos', 'Rastreabilidade de origem', 'Suporte WhatsApp fluvial'],
    },
    {
      name: 'Plano Princesa Pro (Lojas & Restaurantes)',
      monthlyPrice: 'R$ 149,90/mês',
      commissionDiscount: '-2% de desconto na taxa',
      storesEnrolled: 18,
      features: ['Produtos ilimitados', 'Destaque no FoodPlace', 'Gestão de mesas flutuantes'],
    },
    {
      name: 'Plano Cooperativa / Frotista',
      monthlyPrice: 'R$ 399,00/mês',
      commissionDiscount: 'Taxa negociada (4.5%)',
      storesEnrolled: 7,
      features: ['Multi-embarcações', 'API de rastreio GPS', 'Repasse bancário D+1'],
    },
  ];

  const merchantBalances = [
    { name: 'Agropecuária Princesa do Solimões', totalVendas: 18450.0, comissaoRetida: 1845.0, repasseLiquido: 16605.0, status: 'agendado_d1' },
    { name: 'Flutuante Mirante Solimões', totalVendas: 12890.0, comissaoRetida: 1546.8, repasseLiquido: 11343.2, status: 'agendado_d1' },
    { name: 'Cooperativa BioAmazonas', totalVendas: 9420.0, comissaoRetida: 942.0, repasseLiquido: 8478.0, status: 'pago' },
    { name: 'Comandante Valdir (Voadeiras)', totalVendas: 6540.0, comissaoRetida: 392.4, repasseLiquido: 6147.6, status: 'pago' },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6 text-slate-100">
      {/* Top Banner */}
      <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-purple-600/30 text-purple-300 border border-purple-500/40 text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full">
              SaaS Multi-Tenant da Empresa Operadora
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-slate-400">Tenant Ativo: {municipality.name} ({municipality.state})</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">CIDADÃO$ BUSINESS ENGINE</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Mecanismo de comissões, planos comerciais, conciliação e repasses da plataforma.
          </p>
        </div>

        <button
          onClick={() => setViewMode('mobile_preview')}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center space-x-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Super App Mobile</span>
        </button>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
          <span className="text-[11px] text-slate-400 block font-semibold">GMV Transacionado (Mês)</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">R$ 148.290,00</div>
          <span className="text-[10px] text-emerald-300 font-bold mt-1 block">+18.4% vs mês anterior</span>
        </div>

        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
          <span className="text-[11px] text-slate-400 block font-semibold">Receita da Plataforma (Take Rate)</span>
          <div className="text-2xl font-black text-purple-400 mt-1">R$ 14.280,00</div>
          <span className="text-[10px] text-purple-300 font-bold mt-1 block">Comissões + Assinaturas</span>
        </div>

        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
          <span className="text-[11px] text-slate-400 block font-semibold">Parceiros Comerciais Ativos</span>
          <div className="text-2xl font-black text-amber-400 mt-1">49</div>
          <span className="text-[10px] text-slate-400 mt-1 block">Lojas, restaurantes, frotas</span>
        </div>

        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
          <span className="text-[11px] text-slate-400 block font-semibold">Taxa de Conciliação D+1</span>
          <div className="text-2xl font-black text-sky-400 mt-1">99.8%</div>
          <span className="text-[10px] text-emerald-400 font-bold mt-1 block">Sem disputas pendentes</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('comissoes')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'comissoes'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Regras de Comissionamento
        </button>
        <button
          onClick={() => setActiveTab('assinaturas')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'assinaturas'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Planos de Assinatura ({commercialPlans.length})
        </button>
        <button
          onClick={() => setActiveTab('conciliacao')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'conciliacao'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Saldos de Lojistas & Repasses
        </button>
      </div>

      {activeTab === 'comissoes' ? (
        /* Commission Rules Form */
        <div className="bg-slate-800/90 p-6 rounded-3xl border border-slate-700 shadow-lg space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-white">
                Parametrização de Comissões por Módulo (Tenant Manacapuru)
              </h3>
              <p className="text-xs text-slate-400">
                Ajuste dinâmico sem código rígido: comissões refletidas automaticamente no checkout.
              </p>
            </div>
            {savedSuccess && (
              <span className="text-emerald-400 text-xs font-bold flex items-center space-x-1 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>Salvo e Aplicado!</span>
              </span>
            )}
          </div>

          <form onSubmit={handleSaveRules} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-700 space-y-1">
              <label className="text-slate-300 font-bold block">Marketplace / Shopping:</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  step="0.5"
                  value={marketplaceRate}
                  onChange={(e) => setMarketplaceRate(Number(e.target.value))}
                  className="bg-slate-800 border border-slate-600 text-white px-3 py-1.5 rounded-xl font-bold text-sm w-24"
                />
                <span className="font-extrabold text-slate-400 text-base">%</span>
              </div>
              <span className="text-[10px] text-slate-500 block">Comissão sobre produtos vendidos</span>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-700 space-y-1">
              <label className="text-slate-300 font-bold block">FoodPlace & Restaurantes:</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  step="0.5"
                  value={foodplaceRate}
                  onChange={(e) => setFoodplaceRate(Number(e.target.value))}
                  className="bg-slate-800 border border-slate-600 text-white px-3 py-1.5 rounded-xl font-bold text-sm w-24"
                />
                <span className="font-extrabold text-slate-400 text-base">%</span>
              </div>
              <span className="text-[10px] text-slate-500 block">Taxa sobre pratos e pedidos</span>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-700 space-y-1">
              <label className="text-slate-300 font-bold block">Fretes & Logística Fluvial:</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  step="0.5"
                  value={freightRate}
                  onChange={(e) => setFreightRate(Number(e.target.value))}
                  className="bg-slate-800 border border-slate-600 text-white px-3 py-1.5 rounded-xl font-bold text-sm w-24"
                />
                <span className="font-extrabold text-slate-400 text-base">%</span>
              </div>
              <span className="text-[10px] text-slate-500 block">Taxa sobre corridas e cargas</span>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-700 space-y-1">
              <label className="text-slate-300 font-bold block">Serviços Profissionais:</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  step="0.5"
                  value={servicesRate}
                  onChange={(e) => setServicesRate(Number(e.target.value))}
                  className="bg-slate-800 border border-slate-600 text-white px-3 py-1.5 rounded-xl font-bold text-sm w-24"
                />
                <span className="font-extrabold text-slate-400 text-base">%</span>
              </div>
              <span className="text-[10px] text-slate-500 block">Taxa sobre orçamentos contratados</span>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-700 space-y-1">
              <label className="text-slate-300 font-bold block">Passagens & Barcos Recreio:</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  step="0.5"
                  value={ticketsRate}
                  onChange={(e) => setTicketsRate(Number(e.target.value))}
                  className="bg-slate-800 border border-slate-600 text-white px-3 py-1.5 rounded-xl font-bold text-sm w-24"
                />
                <span className="font-extrabold text-slate-400 text-base">%</span>
              </div>
              <span className="text-[10px] text-slate-500 block">Taxa sobre bilhetes emitidos</span>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-extrabold rounded-2xl text-xs shadow-md transition-all active:scale-98"
              >
                Salvar Regras de Comissão
              </button>
            </div>
          </form>
        </div>
      ) : activeTab === 'assinaturas' ? (
        /* Commercial Plans */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {commercialPlans.map((plan, idx) => (
            <div key={idx} className="bg-slate-800/90 p-5 rounded-3xl border border-slate-700 space-y-3">
              <span className="text-[10px] uppercase font-black text-purple-400 tracking-wider">
                {plan.storesEnrolled} Empresas Assinantes
              </span>
              <h4 className="font-black text-base text-white">{plan.name}</h4>
              <div className="text-2xl font-extrabold text-emerald-400">{plan.monthlyPrice}</div>
              <span className="text-xs text-amber-300 font-semibold block">{plan.commissionDiscount}</span>

              <div className="space-y-1.5 pt-3 border-t border-slate-700/80 text-xs text-slate-300">
                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-center space-x-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Merchant Balances & Settlement */
        <div className="bg-slate-800/90 rounded-3xl border border-slate-700 overflow-hidden shadow-lg">
          <div className="p-4 bg-slate-900 border-b border-slate-700 flex items-center justify-between">
            <h4 className="font-extrabold text-sm text-white">Conciliação Financeira de Lojistas</h4>
            <span className="text-xs text-slate-400">Repasses via PIX e D+1</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3">Estabelecimento Parceiro</th>
                  <th className="p-3">Vendas Brutas</th>
                  <th className="p-3">Comissão Plataforma</th>
                  <th className="p-3">Repasse Líquido</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60 text-slate-200">
                {merchantBalances.map((mb, idx) => (
                  <tr key={idx} className="hover:bg-slate-750">
                    <td className="p-3 font-bold text-white">{mb.name}</td>
                    <td className="p-3 font-semibold">R$ {mb.totalVendas.toFixed(2)}</td>
                    <td className="p-3 text-purple-400 font-bold">R$ {mb.comissaoRetida.toFixed(2)}</td>
                    <td className="p-3 text-emerald-400 font-black">R$ {mb.repasseLiquido.toFixed(2)}</td>
                    <td className="p-3">
                      <span
                        className={`text-[9px] uppercase font-black px-2 py-0.5 rounded-full ${
                          mb.status === 'pago' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'
                        }`}
                      >
                        {mb.status === 'pago' ? 'Liquidado' : 'Agendado D+1'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
