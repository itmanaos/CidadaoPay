// CIDADÃO$ — Module 04: Saúde & UBS Fluvial
// Spec Section 7: Health appointments, riverine mobile clinics, vaccine records

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_HEALTH_APPOINTMENTS, DEMO_VACCINES } from '../../data/demoData';
import { HealthAppointment } from '../../types';
import {
  HeartPulse,
  ArrowLeft,
  Calendar,
  Syringe,
  Ship,
  CheckCircle2,
  Clock,
  ShieldAlert,
} from 'lucide-react';

export const HealthView: React.FC = () => {
  const { closeModule, user } = useApp();
  const [activeTab, setActiveTab] = useState<'consultas' | 'vacinas' | 'agendar'>('consultas');
  const [appointments, setAppointments] = useState<HealthAppointment[]>(DEMO_HEALTH_APPOINTMENTS);

  // New Appointment Form
  const [specialty, setSpecialty] = useState<string>('Clínica Geral');
  const [unitType, setUnitType] = useState<'ubs_fluvial' | 'ubs_fixa'>('ubs_fluvial');
  const [appointmentDate, setAppointmentDate] = useState<string>('2026-10-29');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const newApt: HealthAppointment = {
      id: `MED-2026-${Math.floor(100 + Math.random() * 900)}`,
      specialty,
      professionalName: 'Equipe Multidisciplinar SEMUSA',
      unitName:
        unitType === 'ubs_fluvial'
          ? 'UBS Fluvial Dr. Walter Góes (Atracadouro Comunitário)'
          : 'UBS Centro Dr. Hamilton Cidade',
      unitType,
      date: appointmentDate,
      time: '09:30',
      status: 'agendado',
      protocol: `SUS-MPU-${Date.now().toString().slice(-6)}`,
    };

    setAppointments([newApt, ...appointments]);
    setSuccessMsg(`Consulta agendada com sucesso! Protocolo: ${newApt.protocol}`);
    setActiveTab('consultas');
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
              <span className="text-[10px] font-black uppercase tracking-widest text-[#E11D48] bg-rose-50 px-1.5 py-0.5 rounded">
                Módulo 04
              </span>
              <h2 className="font-extrabold text-base text-[#163047]">Saúde & UBS Fluvial</h2>
            </div>
            <p className="text-[11px] text-slate-500">Atenção primária, equipe ribeirinha e vacinação</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-4">
        <div className="bg-white p-1 rounded-xl border border-slate-200 grid grid-cols-3 text-xs font-bold shadow-2xs">
          <button
            onClick={() => setActiveTab('consultas')}
            className={`py-2 rounded-lg transition-colors ${
              activeTab === 'consultas' ? 'bg-[#E11D48] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Consultas ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab('vacinas')}
            className={`py-2 rounded-lg transition-colors ${
              activeTab === 'vacinas' ? 'bg-[#E11D48] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Carteira Vacinas
          </button>
          <button
            onClick={() => setActiveTab('agendar')}
            className={`py-2 rounded-lg transition-colors ${
              activeTab === 'agendar' ? 'bg-[#E11D48] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Novo Agendamento
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="mx-4 mb-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-900 animate-in fade-in">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="font-bold underline text-[11px]">
            Fechar
          </button>
        </div>
      )}

      {activeTab === 'consultas' ? (
        /* Appointments List */
        <div className="px-4 space-y-3">
          {appointments.map((apt) => (
            <div key={apt.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-rose-700">{apt.protocol}</span>
                <span className="text-[10px] uppercase font-black bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full">
                  {apt.status}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-sm text-slate-900">{apt.specialty}</h4>
                <p className="text-xs text-slate-600">{apt.professionalName}</p>
                <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 mt-1">
                  {apt.unitType === 'ubs_fluvial' ? (
                    <Ship className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  ) : (
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  )}
                  <span>{apt.unitName}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Data: {apt.date} às {apt.time}</span>
                <span className="text-emerald-700 text-[11px]">Agendado no SUS</span>
              </div>
            </div>
          ))}

          {/* Safety disclaimer */}
          <div className="p-3 bg-rose-50 border border-rose-200/60 rounded-xl text-[11px] text-rose-900 flex items-start space-x-2">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block">Aviso de Governança Médica:</strong>
              O CIDADÃO$ não realiza prescrições ou diagnósticos automatizados por IA. Todos os atendimentos clínicos dependem de profissionais habilitados da Secretaria Municipal de Saúde.
            </div>
          </div>
        </div>
      ) : activeTab === 'vacinas' ? (
        /* Vaccination Wallet */
        <div className="px-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-sm text-slate-900">Registro de Imunizações (SUS)</h4>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
              Em Dia
            </span>
          </div>

          {DEMO_VACCINES.map((vac) => (
            <div key={vac.id} className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <h5 className="font-bold text-xs text-slate-900">{vac.vaccineName}</h5>
                <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded">
                  {vac.dose}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                <span>Lote: {vac.batch}</span>
                <span>Data: {vac.dateGiven}</span>
              </div>
              <p className="text-[10px] text-slate-400">Local: {vac.location}</p>
            </div>
          ))}
        </div>
      ) : (
        /* Booking Form */
        <div className="px-4">
          <form onSubmit={handleBookAppointment} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs">
            <h3 className="font-extrabold text-sm text-slate-900">Agendar Atendimento de Saúde</h3>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Especialidade / Programa:</label>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 bg-white"
              >
                <option value="Clínica Geral & Atenção Primária">Clínica Geral & Atenção Primária</option>
                <option value="Pré-Natal e Saúde da Mulher">Pré-Natal e Saúde da Mulher</option>
                <option value="Pediatria e Puericultura">Pediatria e Puericultura</option>
                <option value="Odontologia Básica">Odontologia Básica</option>
                <option value="Coleta de Exames Laboratoriais">Coleta de Exames Laboratoriais</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Unidade de Atendimento:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setUnitType('ubs_fluvial')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    unitType === 'ubs_fluvial'
                      ? 'border-[#E11D48] bg-rose-50/70 text-[#E11D48] font-bold ring-2 ring-rose-500/20'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <Ship className="w-4 h-4 mb-1" />
                  <span className="block text-[11px] font-bold">UBS Fluvial</span>
                  <span className="text-[10px] text-slate-500">Dr. Walter Góes (Rio)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setUnitType('ubs_fixa')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    unitType === 'ubs_fixa'
                      ? 'border-[#E11D48] bg-rose-50/70 text-[#E11D48] font-bold ring-2 ring-rose-500/20'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <Calendar className="w-4 h-4 mb-1" />
                  <span className="block text-[11px] font-bold">UBS Fixa Centro</span>
                  <span className="text-[10px] text-slate-500">Dr. Hamilton Cidade</span>
                </button>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Data Desejada:</label>
              <input
                type="date"
                required
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#E11D48] hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-md transition-all active:scale-98"
            >
              Confirmar Agendamento
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
