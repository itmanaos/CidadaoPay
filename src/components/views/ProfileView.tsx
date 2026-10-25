// CIDADÃO$ — ProfileView Component
// Spec Section 6 & 8: Citizen profile, role switching, family network, and LGPD

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  User,
  ShieldCheck,
  MapPin,
  Users,
  Settings,
  Lock,
  RefreshCw,
  LogOut,
  ChevronRight,
  Database,
  CheckCircle2,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { user, switchRole, updateUser, openModule, municipality, isOffline, triggerManualSync } =
    useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, phone, address });
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="p-4 space-y-4 pb-12 text-xs">
      {/* Profile Header Card */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center space-x-4">
        <div className="relative">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
          />
          <span className="absolute -bottom-1 -right-1 bg-[#009B4D] text-white p-1 rounded-full shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1.5">
            <h3 className="font-extrabold text-sm text-slate-900 truncate">{user.name}</h3>
            <span className="text-[9px] uppercase font-black bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
              Ouro
            </span>
          </div>
          <p className="font-mono text-[11px] text-slate-500">{user.mpuid}</p>
          <p className="text-[11px] text-slate-500 mt-0.5 truncate">
            📍 {user.neighborhoodOrCommunity} ({user.locationType})
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 font-bold flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Perfil atualizado com sucesso!</span>
        </div>
      )}

      {/* MPUID Digital Card Shortcut */}
      <button
        onClick={() => openModule('citizen-identity')}
        className="w-full bg-gradient-to-r from-[#072F58] to-[#0756A6] text-white p-4 rounded-2xl shadow-md flex items-center justify-between transition-all active:scale-98"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-black text-amber-300">
            C$
          </div>
          <div className="text-left">
            <h4 className="font-bold text-xs">Identidade Digital MPUID</h4>
            <span className="text-[10px] text-sky-200">Acesse o QR Code oficial de verificação</span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-white/70" />
      </button>

      {/* Role Switcher Section (Spec Section 8) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
        <h4 className="font-extrabold text-xs text-slate-800">Perfil Operacional Ativo:</h4>
        <p className="text-[11px] text-slate-500">
          Alterne de papel para testar jornadas diferenciadas no ecossistema de Manacapuru:
        </p>

        <select
          value={user.role}
          onChange={(e) => switchRole(e.target.value as UserRole)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
        >
          <option value="cidadao">🛶 Cidadão Ribeirinho (Raimundo Nonato)</option>
          <option value="responsavel_familiar">👨‍👩‍👧 Responsável Familiar</option>
          <option value="estudante">🎒 Estudante (Thiago da Silva)</option>
          <option value="produtor_rural">🌾 Produtor Rural / Bioeconomia</option>
          <option value="comerciante">🏪 Comerciante / Lojista</option>
          <option value="restaurante">🐟 Restaurante / FoodPlace</option>
          <option value="transportador">🚤 Transportador / Fretista</option>
          <option value="operador_passagens">🎫 Operador de Passagens</option>
          <option value="profissional_autonomo">🔧 Profissional Autônomo</option>
          <option value="servidor_municipal">🏛️ Servidor Municipal (SEMED / SEMUSA)</option>
          <option value="gestor_operador">👑 Gestor Operador da Plataforma SaaS</option>
        </select>
      </div>

      {/* Edit Profile Form */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-extrabold text-xs text-slate-800">Dados do Cidadão</h4>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-[11px] text-[#0756A6] font-bold underline"
          >
            {isEditing ? 'Cancelar' : 'Editar Dados'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-2.5">
            <div>
              <label className="text-slate-600 block mb-1">Nome Completo:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-1.5 text-xs"
              />
            </div>
            <div>
              <label className="text-slate-600 block mb-1">Telefone WhatsApp:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-1.5 text-xs"
              />
            </div>
            <div>
              <label className="text-slate-600 block mb-1">Endereço / Atracadouro:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-1.5 text-xs"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#009B4D] hover:bg-[#006B3C] text-white font-bold rounded-xl text-xs"
            >
              Salvar Alterações
            </button>
          </form>
        ) : (
          <div className="space-y-1.5 text-slate-600 text-[11px]">
            <p>
              <strong>E-mail:</strong> {user.email}
            </p>
            <p>
              <strong>Telefone:</strong> {user.phone}
            </p>
            <p>
              <strong>CPF:</strong> {user.cpfMasked}
            </p>
            <p>
              <strong>Endereço:</strong> {user.address}
            </p>
          </div>
        )}
      </div>

      {/* Sync and Storage Diagnostics */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
        <h4 className="font-extrabold text-xs text-slate-800 flex items-center space-x-1.5">
          <Database className="w-4 h-4 text-slate-500" />
          <span>Resiliência e Cache Offline Local</span>
        </h4>
        <p className="text-[11px] text-slate-500">
          Estado atual da conexão: {isOffline ? '📵 Offline (Ribeirinho)' : '📶 Conectado'}
        </p>

        <button
          onClick={triggerManualSync}
          className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Forçar Sincronização Local</span>
        </button>
      </div>
    </div>
  );
};
