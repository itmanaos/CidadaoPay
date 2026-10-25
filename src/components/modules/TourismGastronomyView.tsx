// CIDADÃO$ — Module 10: Turismo e Guia Gastronômico
// Spec Section 7: Amazonian attractions, Cirandas of Manacapuru, riverine tours, native recipes

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_ATTRACTIONS } from '../../data/demoData';
import { Compass, ArrowLeft, MapPin, Sparkles, BookOpen, Clock } from 'lucide-react';

export const TourismGastronomyView: React.FC = () => {
  const { closeModule } = useApp();
  const [activeTab, setActiveTab] = useState<'atrativos' | 'receitas' | 'cirandas'>('atrativos');

  const recipes = [
    {
      title: 'Tambaqui na Brasa com Farofa de Uarini',
      tempo: '45 minutos',
      dificuldade: 'Média',
      ingredientes: ['1 banda de tambaqui de 2kg', 'Suco de 3 limões', 'Sal grosso e alho batido', 'Farinha de Uarini torrada', 'Castanha-do-brasil picada'],
      modo: 'Tempere a banda de tambaqui com limão, sal grosso e alho. Leve à brasa média sobre folha de bananeira ou grelha até dourar. Sirva com vinagrete e farofa de castanha.',
    },
    {
      title: 'Pirarucu de Casaca Tradicional de Manacapuru',
      tempo: '60 minutos',
      dificuldade: 'Fácil',
      ingredientes: ['800g de pirarucu salgado desfiado', '3 bananas-da-terra fritas em fatias', '200g de farinha de Uarini crocante', 'Leite de coco artesanal', 'Azeitonas e cheiro-verde'],
      modo: 'Dessalgue e refogue o pirarucu no azeite com cebola e pimentão. Em um refratário, intercale camadas de pirarucu, banana frita e farinha umedecida com leite de coco. Asse por 20 minutos.',
    },
  ];

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
              <span className="text-[10px] font-black uppercase tracking-widest text-[#059669] bg-emerald-50 px-1.5 py-0.5 rounded">
                Módulo 10
              </span>
              <h2 className="font-extrabold text-base text-[#163047]">Turismo & Sabores</h2>
            </div>
            <p className="text-[11px] text-slate-500">Cirandas, balneários e gastronomia amazônica</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-4">
        <div className="bg-white p-1 rounded-xl border border-slate-200 grid grid-cols-3 text-xs font-bold shadow-2xs">
          <button
            onClick={() => setActiveTab('atrativos')}
            className={`py-2 rounded-lg transition-colors ${
              activeTab === 'atrativos' ? 'bg-[#059669] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Atrativos ({DEMO_ATTRACTIONS.length})
          </button>
          <button
            onClick={() => setActiveTab('cirandas')}
            className={`py-2 rounded-lg transition-colors ${
              activeTab === 'cirandas' ? 'bg-[#059669] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Cirandas de MPU
          </button>
          <button
            onClick={() => setActiveTab('receitas')}
            className={`py-2 rounded-lg transition-colors ${
              activeTab === 'receitas' ? 'bg-[#059669] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Receitas Típicas
          </button>
        </div>
      </div>

      {activeTab === 'atrativos' ? (
        /* Attractions */
        <div className="px-4 space-y-4">
          {DEMO_ATTRACTIONS.map((att) => (
            <div key={att.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
              <div className="h-44 w-full relative">
                <img src={att.imageUrl} alt={att.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-[#059669] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md">
                  {att.highlightTag}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h4 className="font-extrabold text-sm text-slate-900">{att.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{att.description}</p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>📍 {att.location}</span>
                  <span className="font-bold text-[#009B4D]">{att.entryCost}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : activeTab === 'cirandas' ? (
        /* Cirandas Cultural Heritage */
        <div className="px-4 space-y-3.5 text-xs">
          <div className="bg-gradient-to-r from-purple-900 via-pink-900 to-amber-900 text-white p-4 rounded-2xl shadow-md">
            <span className="text-[10px] uppercase font-bold text-amber-300">Patrimônio Cultural do Amazonas</span>
            <h3 className="font-black text-lg mt-0.5">Festival de Cirandas de Manacapuru</h3>
            <p className="text-xs text-slate-200 mt-1">
              Celebrado no Cirandódromo do Parque do Ingá, reúne a paixão e a arte dos três cordões lendários.
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="bg-white p-3.5 rounded-2xl border-l-4 border-rose-500 border-t border-r border-b border-slate-200 shadow-2xs">
              <span className="text-[10px] uppercase font-black text-rose-600">Vermelho e Branco</span>
              <h4 className="font-extrabold text-sm text-slate-900">Ciranda Flor Matizada</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Fundada na Escola Ribeiro Júnior em 1980. Conhecida pela delicadeza cênica e alegorias poéticas.
              </p>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border-l-4 border-blue-600 border-t border-r border-b border-slate-200 shadow-2xs">
              <span className="text-[10px] uppercase font-black text-blue-600">Azul, Branco e Amarelo</span>
              <h4 className="font-extrabold text-sm text-slate-900">Ciranda Guerreiros Mura</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Nascida no Bairro da Liberdade em 1993. Traz a bravura e a força da etnia indígena Mura do Solimões.
              </p>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border-l-4 border-yellow-500 border-t border-r border-b border-slate-200 shadow-2xs">
              <span className="text-[10px] uppercase font-black text-amber-600">Dourado, Branco e Preto</span>
              <h4 className="font-extrabold text-sm text-slate-900">Ciranda Tradicional</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">
                A pioneira do município, com raízes históricas no bairro de São José e melodias cirandeiras autênticas.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Recipes */
        <div className="px-4 space-y-3.5">
          {recipes.map((rec, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-sm text-slate-900">{rec.title}</h4>
                <span className="text-[10px] font-bold text-[#059669] bg-emerald-50 px-2 py-0.5 rounded-full">
                  ⏱️ {rec.tempo}
                </span>
              </div>

              <div>
                <strong className="text-slate-800 block mb-1">Ingredientes:</strong>
                <ul className="list-disc list-inside space-y-0.5 text-slate-600 text-[11px]">
                  {rec.ingredientes.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="text-slate-800 block mb-0.5">Modo de Preparo:</strong>
                <p className="text-slate-600 text-[11px] leading-relaxed">{rec.modo}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
