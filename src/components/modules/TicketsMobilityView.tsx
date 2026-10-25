// CIDADÃO$ — Module 08: Passagens e Mobilidade
// Spec Section 7: Fluvial fast boats, regional ships, seat selection and digital boarding tickets

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_TRIPS } from '../../data/demoData';
import { TripTicket } from '../../types';
import {
  Ship,
  ArrowLeft,
  QrCode,
  CheckCircle2,
  Clock,
  MapPin,
  X,
  CreditCard,
  Users,
} from 'lucide-react';

export const TicketsMobilityView: React.FC = () => {
  const { closeModule, user, addRewardPoints } = useApp();

  const [selectedTrip, setSelectedTrip] = useState<TripTicket | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<string>('07');
  const [issuedTicket, setIssuedTicket] = useState<TripTicket | null>(null);
  const [isBooking, setIsBooking] = useState<boolean>(false);

  const availableSeats = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '14', '15'];

  const handleConfirmBooking = () => {
    if (!selectedTrip) return;
    setIsBooking(true);

    setTimeout(() => {
      const ticket: TripTicket = {
        ...selectedTrip,
        seatNumber: selectedSeat,
        passengerName: user.name,
        ticketCode: `BIL-MPU-${Math.floor(100000 + Math.random() * 900000)}`,
        status: 'emitido',
      };

      setIssuedTicket(ticket);
      setSelectedTrip(null);
      setIsBooking(false);

      addRewardPoints(20, `Passagem Fluvial Emitida: ${selectedTrip.routeTitle}`);
    }, 700);
  };

  return (
    <div className="bg-[#F3F6FA] min-h-full pb-16">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              if (selectedTrip) setSelectedTrip(null);
              else closeModule();
            }}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-600"
            title="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#072F58] bg-slate-100 px-1.5 py-0.5 rounded">
                Módulo 08
              </span>
              <h2 className="font-extrabold text-base text-[#163047]">Passagens & Mobilidade</h2>
            </div>
            <p className="text-[11px] text-slate-500">Lanchas rápidas no Solimões e viagens rodoviárias</p>
          </div>
        </div>
      </div>

      {/* Issued Digital Ticket Card (if user has active booked ticket) */}
      {issuedTicket && (
        <div className="m-4 bg-gradient-to-br from-[#072F58] to-[#0756A6] text-white p-5 rounded-3xl shadow-xl relative overflow-hidden border border-white/20 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-white/20 pb-3">
            <div className="flex items-center space-x-2">
              <Ship className="w-5 h-5 text-amber-300" />
              <span className="font-bold text-xs">Bilhete Digital de Embarque</span>
            </div>
            <span className="font-mono text-xs text-amber-300 font-black">{issuedTicket.ticketCode}</span>
          </div>

          <div className="my-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-sky-200 uppercase font-semibold">Passageiro</span>
              <p className="font-black text-sm text-white">{issuedTicket.passengerName}</p>
              <p className="text-xs text-sky-100 mt-1">{issuedTicket.routeTitle}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-sky-200 uppercase font-semibold">Assento</span>
              <div className="text-2xl font-black text-amber-300">#{issuedTicket.seatNumber}</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs">
              <QrCode className="w-8 h-8 text-emerald-400" />
              <div>
                <span className="font-bold text-[11px] block">Apresente no Porto</span>
                <span className="text-[10px] text-slate-300">Validação instantânea pelo operador</span>
              </div>
            </div>
            <button
              onClick={() => setIssuedTicket(null)}
              className="text-xs text-amber-300 font-bold underline"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {selectedTrip ? (
        /* Seat Selection & Purchase Flow */
        <div className="p-4 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                {selectedTrip.operatorName}
              </span>
              <span className="font-black text-sm text-[#009B4D]">R$ {selectedTrip.price.toFixed(2)}</span>
            </div>

            <h3 className="font-extrabold text-sm text-slate-900">{selectedTrip.routeTitle}</h3>

            <div className="text-xs text-slate-600 space-y-1">
              <p>📍 Embarque: {selectedTrip.origin}</p>
              <p>🏁 Desembarque: {selectedTrip.destination}</p>
              <p>⏱️ Horário: {selectedTrip.departureTime} (Duração: {selectedTrip.durationEst})</p>
            </div>
          </div>

          {/* Seat selection */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-xs text-slate-900">Escolha seu Assento na Embarcação</h4>
              <span className="text-[10px] text-slate-400">Assento selecionado: #{selectedSeat}</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              {availableSeats.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedSeat(st)}
                  className={`py-2 rounded-xl font-bold border transition-all ${
                    selectedSeat === st
                      ? 'bg-[#009B4D] text-white border-[#009B4D] shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  #{st}
                </button>
              ))}
            </div>

            <button
              onClick={handleConfirmBooking}
              disabled={isBooking}
              className="w-full py-3 bg-[#0756A6] hover:bg-[#072F58] text-white font-bold rounded-xl text-xs shadow-md transition-all active:scale-98 disabled:opacity-50"
            >
              {isBooking ? 'Reservando assento...' : `Emitir Bilhete (R$ ${selectedTrip.price.toFixed(2)})`}
            </button>
          </div>
        </div>
      ) : (
        /* Trips List */
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900">Horários & Linhas Fluviais</h3>
            <span className="text-[11px] text-slate-500">Porto de Manacapuru</span>
          </div>

          {DEMO_TRIPS.map((trip) => (
            <div
              key={trip.id}
              onClick={() => setSelectedTrip(trip)}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">{trip.operatorName}</span>
                <span className="font-black text-sm text-[#009B4D]">R$ {trip.price.toFixed(2)}</span>
              </div>

              <h4 className="font-bold text-xs text-slate-900">{trip.routeTitle}</h4>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{trip.departureTime}</span>
                </span>
                <span className="font-semibold text-blue-700">
                  {trip.availableSeats} vagas disponíveis
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
