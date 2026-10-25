// CIDADÃO$ — Module 06: FoodPlace / FoodCourt
// Priority Commercial Core: Regional restaurants, menus, dishes, delivery and reservations

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_RESTAURANTS } from '../../data/demoData';
import { Restaurant } from '../../types';
import {
  UtensilsCrossed,
  ArrowLeft,
  Star,
  Clock,
  Bike,
  Plus,
  CheckCircle2,
  Calendar,
  X,
} from 'lucide-react';

export const FoodPlaceView: React.FC = () => {
  const { closeModule, user, addRewardPoints } = useApp();

  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [activeTab, setActiveTab] = useState<'cardapio' | 'reserva'>('cardapio');
  const [reservationSuccess, setReservationSuccess] = useState<string | null>(null);
  const [activeFoodOrder, setActiveFoodOrder] = useState<{
    id: string;
    dishName: string;
    restaurantName: string;
    status: 'recebido' | 'preparando' | 'em_entrega' | 'entregue';
  } | null>(null);

  // Reservation form
  const [guestCount, setGuestCount] = useState<number>(2);
  const [reserveDate, setReserveDate] = useState<string>('2026-10-25');
  const [reserveTime, setReserveTime] = useState<string>('12:30');

  const handleOrderDish = (dish: Restaurant['menu'][0], rest: Restaurant) => {
    const orderId = `FOOD-${Date.now().toString().slice(-5)}`;
    setActiveFoodOrder({
      id: orderId,
      dishName: dish.name,
      restaurantName: rest.name,
      status: 'recebido',
    });

    addRewardPoints(15, `Pedido gastronômico: ${dish.name}`);

    // Advance status step
    setTimeout(() => {
      setActiveFoodOrder((prev) => (prev ? { ...prev, status: 'preparando' } : null));
    }, 1800);
  };

  const handleReserveTable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRestaurant) return;
    const resId = `RES-${Math.floor(1000 + Math.random() * 9000)}`;
    setReservationSuccess(
      `Mesa confirmada para ${guestCount} pessoas no ${selectedRestaurant.name} em ${reserveDate} às ${reserveTime}. Código: ${resId}`
    );
  };

  return (
    <div className="bg-[#F3F6FA] min-h-full pb-16">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              if (selectedRestaurant) setSelectedRestaurant(null);
              else closeModule();
            }}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-600"
            title="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#EA580C] bg-orange-50 px-1.5 py-0.5 rounded">
                Módulo 06
              </span>
              <h2 className="font-extrabold text-base text-[#163047]">FoodPlace & Sabores</h2>
            </div>
            <p className="text-[11px] text-slate-500">Flutuantes, peixarias e sabores amazônicos</p>
          </div>
        </div>
      </div>

      {/* Active Food Order Tracker */}
      {activeFoodOrder && (
        <div className="m-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-orange-600">
              Acompanhamento de Pedido #{activeFoodOrder.id}
            </span>
            <button
              onClick={() => setActiveFoodOrder(null)}
              className="text-slate-400 hover:text-slate-600 text-xs"
            >
              Fechar
            </button>
          </div>
          <h4 className="font-extrabold text-sm text-slate-900 mt-1">{activeFoodOrder.dishName}</h4>
          <p className="text-xs text-slate-600">{activeFoodOrder.restaurantName}</p>

          {/* Stepper */}
          <div className="grid grid-cols-4 gap-1.5 mt-3 pt-2 border-t border-orange-200/60 text-center">
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">✓</div>
              <span className="text-[9px] font-bold text-slate-700 mt-1">Recebido</span>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                activeFoodOrder.status === 'preparando' || activeFoodOrder.status === 'em_entrega' || activeFoodOrder.status === 'entregue'
                  ? 'bg-orange-500 text-white animate-pulse'
                  : 'bg-slate-200 text-slate-500'
              }`}>
                🍳
              </div>
              <span className="text-[9px] font-bold text-slate-700 mt-1">Cozinha</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px] font-bold">
                🚤
              </div>
              <span className="text-[9px] font-medium text-slate-400 mt-1">Em Rota</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px] font-bold">
                🍽️
              </div>
              <span className="text-[9px] font-medium text-slate-400 mt-1">Entregue</span>
            </div>
          </div>
        </div>
      )}

      {selectedRestaurant ? (
        /* Restaurant Detail View */
        <div className="p-4 space-y-4">
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
            <div className="h-40 w-full relative">
              <img
                src={selectedRestaurant.imageUrl}
                alt={selectedRestaurant.name}
                className="w-full h-full object-cover"
              />
              {selectedRestaurant.isFloatingRiver && (
                <span className="absolute top-3 left-3 bg-[#0756A6] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md">
                  ⚓ Flutuante no Rio Solimões
                </span>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-black text-lg text-slate-900">{selectedRestaurant.name}</h3>
              <p className="text-xs text-slate-500">{selectedRestaurant.cuisine}</p>

              <div className="flex items-center space-x-3 text-xs text-slate-600 mt-2">
                <span className="flex items-center text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                  {selectedRestaurant.rating}
                </span>
                <span className="flex items-center">
                  <Clock className="w-3.5 h-3.5 text-slate-400 mr-1" />
                  {selectedRestaurant.deliveryTimeMinutes}
                </span>
                <span className="flex items-center text-[#009B4D] font-bold">
                  <Bike className="w-3.5 h-3.5 mr-1" />
                  Taxa R$ {selectedRestaurant.deliveryFee.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Tabs for Cardápio vs Reserva */}
            <div className="grid grid-cols-2 border-t border-slate-100 text-xs font-bold">
              <button
                onClick={() => setActiveTab('cardapio')}
                className={`py-3 text-center border-b-2 transition-colors ${
                  activeTab === 'cardapio'
                    ? 'border-[#EA580C] text-[#EA580C]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Cardápio Regional
              </button>
              <button
                onClick={() => setActiveTab('reserva')}
                className={`py-3 text-center border-b-2 transition-colors ${
                  activeTab === 'reserva'
                    ? 'border-[#EA580C] text-[#EA580C]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Reservar Mesa Flutuante
              </button>
            </div>
          </div>

          {activeTab === 'cardapio' ? (
            /* Menu Dishes */
            <div className="space-y-3">
              <h4 className="font-extrabold text-sm text-slate-900">Pratos & Especialidades</h4>
              {selectedRestaurant.menu.map((dish) => (
                <div
                  key={dish.id}
                  className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center justify-between shadow-2xs hover:shadow-xs"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0 pr-2">
                    <img
                      src={dish.imageUrl}
                      alt={dish.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-100"
                    />
                    <div className="min-w-0">
                      {dish.popular && (
                        <span className="text-[9px] uppercase font-black text-orange-600 bg-orange-50 px-1 py-0.2 rounded">
                          Mais Pedido
                        </span>
                      )}
                      <h5 className="font-bold text-xs text-slate-900 truncate mt-0.5">{dish.name}</h5>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{dish.description}</p>
                      <span className="font-black text-xs text-[#009B4D] block mt-1">
                        R$ {dish.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOrderDish(dish, selectedRestaurant)}
                    className="p-2 rounded-xl bg-[#EA580C] hover:bg-orange-600 text-white font-bold text-xs shrink-0 active:scale-95 shadow-xs flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Pedir</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            /* Table Reservation */
            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm">
                <Calendar className="w-5 h-5 text-orange-600" />
                <span>Reserva de Mesa no Flutuante</span>
              </div>

              {reservationSuccess ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-1" />
                  <p className="font-bold">{reservationSuccess}</p>
                  <button
                    onClick={() => setReservationSuccess(null)}
                    className="mt-2 text-emerald-800 font-bold underline"
                  >
                    Fazer nova reserva
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReserveTable} className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Quantidade de Pessoas:</label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Data:</label>
                      <input
                        type="date"
                        value={reserveDate}
                        onChange={(e) => setReserveDate(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Horário:</label>
                      <input
                        type="time"
                        value={reserveTime}
                        onChange={(e) => setReserveTime(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl px-3 py-2"
                      />
                    </div>
                  </div>

                  <div className="p-2.5 bg-blue-50 text-[#0756A6] rounded-xl text-[11px]">
                    ℹ️ Flutuantes no Solimões dispõem de atracadouro gratuito para voadeiras e canoas de clientes.
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#EA580C] hover:bg-orange-600 text-white font-bold rounded-xl text-xs shadow-md"
                  >
                    Confirmar Solicitação de Reserva
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Restaurants List */
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900">Restaurantes e Flutuantes em Destaque</h3>
            <span className="text-[11px] text-slate-500">{DEMO_RESTAURANTS.length} estabelecimentos</span>
          </div>

          {DEMO_RESTAURANTS.map((rest) => (
            <div
              key={rest.id}
              onClick={() => setSelectedRestaurant(rest)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row"
            >
              <div className="relative h-36 sm:h-auto sm:w-36 shrink-0 bg-slate-100">
                <img src={rest.imageUrl} alt={rest.name} className="w-full h-full object-cover" />
                {rest.isFloatingRiver && (
                  <span className="absolute top-2 left-2 bg-[#0756A6] text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-xs">
                    Flutuante
                  </span>
                )}
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900">{rest.name}</h4>
                    <span className="flex items-center text-amber-500 font-extrabold text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400 mr-0.5" />
                      {rest.rating}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{rest.cuisine}</p>
                  <p className="text-[11px] text-slate-400 mt-1">📍 {rest.locationName}</p>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 text-xs text-slate-600">
                  <span className="flex items-center">
                    <Clock className="w-3.5 h-3.5 text-slate-400 mr-1" />
                    {rest.deliveryTimeMinutes}
                  </span>
                  <span className="font-bold text-[#009B4D]">
                    Entrega R$ {rest.deliveryFee.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
