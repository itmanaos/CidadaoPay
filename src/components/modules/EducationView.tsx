// CIDADÃO$ — Module 03: Educação Municipal
// Spec Section 7: Schools, students, fluvial school transport routes, report cards, lunch menu

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_SCHOOLS, DEMO_STUDENT } from '../../data/demoData';
import {
  GraduationCap,
  ArrowLeft,
  Ship,
  BookOpen,
  Calendar,
  Utensils,
  Award,
  Bus,
  CheckCircle,
} from 'lucide-react';

export const EducationView: React.FC = () => {
  const { closeModule } = useApp();
  const [activeTab, setActiveTab] = useState<'aluno' | 'transporte' | 'escolas' | 'merenda'>('aluno');

  const lunchMenu = [
    { day: 'Segunda-feira', prato: 'Filé de Tambaqui cozido no tucupi com arroz e farofa de castanha', fruta: 'Banana pacovã' },
    { day: 'Terça-feira', prato: 'Galinha caipira com macaxeira e feijão de praia', fruta: 'Melancia regional' },
    { day: 'Quarta-feira', prato: 'Mingau nutritivo de tapioca artesanal com canela e leite', fruta: 'Laranja doce' },
    { day: 'Quinta-feira', prato: 'Pirarucu desfiado com pirão e legumes da agricultura familiar', fruta: 'Polpa de Açaí' },
    { day: 'Sexta-feira', prato: 'Arroz de carreteiro caboclo com salada de jerimum', fruta: 'Mamão' },
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
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0284C7] bg-sky-50 px-1.5 py-0.5 rounded">
                Módulo 03
              </span>
              <h2 className="font-extrabold text-base text-[#163047]">Educação Municipal</h2>
            </div>
            <p className="text-[11px] text-slate-500">Boletim, transporte fluvial e rede escolar SEMED</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-4">
        <div className="bg-white p-1 rounded-xl border border-slate-200 grid grid-cols-4 text-[11px] font-bold shadow-2xs">
          <button
            onClick={() => setActiveTab('aluno')}
            className={`py-2 rounded-lg transition-colors ${
              activeTab === 'aluno' ? 'bg-[#0284C7] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Boletim
          </button>
          <button
            onClick={() => setActiveTab('transporte')}
            className={`py-2 rounded-lg transition-colors ${
              activeTab === 'transporte' ? 'bg-[#0284C7] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Barco Escolar
          </button>
          <button
            onClick={() => setActiveTab('merenda')}
            className={`py-2 rounded-lg transition-colors ${
              activeTab === 'merenda' ? 'bg-[#0284C7] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Merenda
          </button>
          <button
            onClick={() => setActiveTab('escolas')}
            className={`py-2 rounded-lg transition-colors ${
              activeTab === 'escolas' ? 'bg-[#0284C7] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Escolas
          </button>
        </div>
      </div>

      {activeTab === 'aluno' ? (
        /* Student Report Card */
        <div className="px-4 space-y-3.5">
          {/* Student Overview Header */}
          <div className="bg-gradient-to-r from-[#0284C7] to-[#0756A6] text-white p-4 rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-sky-200">Aluno Matriculado</span>
                <h3 className="font-extrabold text-base">{DEMO_STUDENT.name}</h3>
                <p className="text-xs text-sky-100">{DEMO_STUDENT.schoolName}</p>
                <p className="text-[11px] text-sky-200 mt-1">
                  Turma: {DEMO_STUDENT.grade} • Turno Matutino
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-sky-200 uppercase font-semibold">Frequência</span>
                <div className="text-xl font-black text-amber-300">{DEMO_STUDENT.attendanceRate}%</div>
                <span className="text-[9px] bg-emerald-500 text-white px-1.5 py-0.2 rounded font-bold">
                  Regular
                </span>
              </div>
            </div>
          </div>

          {/* Grades Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="p-3 bg-slate-50 border-b border-slate-100 font-extrabold text-xs text-slate-800 flex items-center justify-between">
              <span>Disciplinas & Notas Bimestrais</span>
              <span className="text-[10px] text-slate-500 font-normal">Ano Letivo 2026</span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {DEMO_STUDENT.reportCard.map((item, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-slate-900">{item.subject}</h5>
                    <div className="flex items-center space-x-2 text-[10px] text-slate-500 mt-0.5">
                      <span>1ºB: <strong>{item.quarter1}</strong></span>
                      <span>2ºB: <strong>{item.quarter2}</strong></span>
                      <span>3ºB: <strong>{item.quarter3}</strong></span>
                      <span>4ºB: <strong>{item.quarter4}</strong></span>
                    </div>
                  </div>

                  <span className="font-black text-xs text-[#009B4D] bg-emerald-50 px-2 py-0.5 rounded-lg">
                    Média {( (item.quarter1 + item.quarter2 + item.quarter3 + item.quarter4) / 4 ).toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeTab === 'transporte' ? (
        /* School Transport */
        <div className="px-4 space-y-3.5 text-xs">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center space-x-2 text-[#0284C7] font-extrabold text-sm">
              <Ship className="w-5 h-5" />
              <span>Rota Fluvial Escolar 03</span>
            </div>

            <div className="p-3 bg-sky-50 border border-sky-200/60 rounded-xl space-y-1">
              <span className="font-bold text-sky-950 block">Lancha Rápida Escolar SEMED-08</span>
              <p className="text-sky-800 text-[11px]">
                Piloto Habilitado: Comandante Sebastião • Capacidade: 22 alunos com coletes homologados pela Capitania dos Portos.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <h5 className="font-bold text-slate-800">Itinerário Matutino:</h5>
              <div className="space-y-1.5 text-slate-600">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>06:15 — Atracadouro Comunidade do Supiá (Embarque)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>06:35 — Comunidade Costa do Pesqueiro</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
                  <span>06:55 — Chegada na E.M. Fluvial Rio Solimões</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-emerald-50 text-emerald-900 rounded-xl flex items-center space-x-1.5 font-bold text-[11px]">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Presença registrada eletronicamente no embarque via MPUID.</span>
            </div>
          </div>
        </div>
      ) : activeTab === 'merenda' ? (
        /* Lunch Menu */
        <div className="px-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-sm text-slate-900">Cardápio da Merenda Escolar</h4>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
              70% Agricultura Familiar
            </span>
          </div>

          {lunchMenu.map((m, idx) => (
            <div key={idx} className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs text-[#0284C7]">{m.day}</span>
                <span className="text-[10px] text-amber-600 font-bold">Sobremesa: {m.fruta}</span>
              </div>
              <p className="text-xs text-slate-700">{m.prato}</p>
            </div>
          ))}
        </div>
      ) : (
        /* Schools list */
        <div className="px-4 space-y-3">
          {DEMO_SCHOOLS.map((esc) => (
            <div key={esc.id} className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{esc.name}</h4>
                  <p className="text-[11px] text-slate-500">{esc.address}</p>
                </div>
                {esc.fluvialAccessOnly ? (
                  <span className="text-[9px] uppercase font-black bg-blue-50 text-[#0756A6] px-1.5 py-0.5 rounded shrink-0">
                    Acesso Fluvial
                  </span>
                ) : (
                  <span className="text-[9px] uppercase font-black bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded shrink-0">
                    Urbana
                  </span>
                )}
              </div>
              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
                <span>Direção: {esc.principal}</span>
                <span className="font-bold text-[#0284C7]">{esc.totalStudents} alunos</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
