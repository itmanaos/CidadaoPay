// CIDADÃO$ — Module 11: Agro e Bioeconomia
// Spec Section 7: Rural producers, cooperatives, crop calendar, origin traceability, technical assistance

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_AGRO_OFFERS } from '../../data/demoData';
import { AgroProductOffer } from '../../types';
import { Sprout, ArrowLeft, ShieldCheck, Calendar, CheckCircle2, ShoppingCart } from 'lucide-react';

export const AgroBioeconomyView: React.FC = () => {
  const { closeModule, addToCart } = useApp();
  const [selectedOffer, setSelectedOffer] = useState<AgroProductOffer | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleQuickAdd = (offer: AgroProductOffer) => {
    // Adapter to add to marketplace cart
    addToCart({
      id: offer.id,
      storeId: 'agro_coop',
      storeName: offer.producerName,
      name: offer.productName,
      description: `Produto direto da agricultura familiar (${offer.community}). Safra: ${offer.harvestPeriod}.`,
      category: 'Alimentos Regionais',
      price: parseFloat(offer.pricePerUnit.replace(/[^0-9.]/g, '')) || 25.0,
      imageUrl: offer.imageUrl,
      inStock: true,
      stockQuantity: 50,
      rating: 5.0,
      reviewCount: 12,
      isRegional: true,
      badge: 'Bioeconomia Direta',
    });

    setSuccessToast(`Adicionado ao carrinho: ${offer.productName}!`);
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
              <span className="text-[10px] font-black uppercase tracking-widest text-[#006B3C] bg-emerald-50 px-1.5 py-0.5 rounded">
                Módulo 11
              </span>
              <h2 className="font-extrabold text-base text-[#163047]">Agro & Bioeconomia</h2>
            </div>
            <p className="text-[11px] text-slate-500">Mandioca, açaí, piscicultura e rastreabilidade</p>
          </div>
        </div>
      </div>

      {successToast && (
        <div className="mx-4 my-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast(null)} className="font-bold underline text-[11px]">
            Fechar
          </button>
        </div>
      )}

      {/* Hero Card */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-[#006B3C] to-[#009B4D] text-white p-4 rounded-2xl shadow-md">
          <span className="text-[10px] uppercase font-bold text-amber-300">Comércio Justo Ribeirinho</span>
          <h3 className="font-black text-base mt-0.5">Mercado Direto do Produtor</h3>
          <p className="text-xs text-emerald-100 mt-1">
            Compre sem intermediários de produtores da várzea e terra firme de Manacapuru. Rastreabilidade garantida.
          </p>
        </div>
      </div>

      {/* Offers List */}
      <div className="px-4 space-y-4">
        {DEMO_AGRO_OFFERS.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-shadow"
          >
            <div className="h-36 w-full relative">
              <img src={offer.imageUrl} alt={offer.productName} className="w-full h-full object-cover" />
              {offer.hasTraceability && (
                <span className="absolute top-3 left-3 bg-[#0756A6] text-white text-[9px] font-black px-2 py-0.5 rounded-full flex items-center space-x-1 shadow-md">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Origem Rastreável</span>
                </span>
              )}
            </div>

            <div className="p-4 space-y-2 text-xs">
              <div>
                <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block">
                  {offer.community}
                </span>
                <h4 className="font-extrabold text-sm text-slate-900">{offer.productName}</h4>
                <p className="text-xs text-slate-500 font-medium">Produtor(a): {offer.producerName}</p>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl space-y-1 text-[11px] text-slate-600">
                <div className="flex justify-between">
                  <span>Volume disponível:</span>
                  <span className="font-bold text-slate-800">{offer.availableVolume}</span>
                </div>
                <div className="flex justify-between">
                  <span>Período da safra:</span>
                  <span className="font-bold text-slate-800">{offer.harvestPeriod}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Preço de atacado/varejo:</span>
                  <span className="font-black text-sm text-[#009B4D]">{offer.pricePerUnit}</span>
                </div>

                <button
                  onClick={() => handleQuickAdd(offer)}
                  className="px-3 py-2 bg-[#009B4D] hover:bg-[#006B3C] text-white font-bold text-xs rounded-xl shadow-xs flex items-center space-x-1.5 active:scale-95"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Comprar</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
