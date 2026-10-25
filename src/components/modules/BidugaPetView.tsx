// CIDADÃO$ — Module 13: Biduga / Módulo Pet
// Spec Section 7: Municipal pet registration, rabies vaccination, adoption gallery, lost pets

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_PETS } from '../../data/demoData';
import { PetItem } from '../../types';
import { Dog, ArrowLeft, Heart, ShieldCheck, Plus, CheckCircle2 } from 'lucide-react';

export const BidugaPetView: React.FC = () => {
  const { closeModule, user } = useApp();
  const [pets, setPets] = useState<PetItem[]>(DEMO_PETS);
  const [activeTab, setActiveTab] = useState<'meus_pets' | 'adocao' | 'cadastrar'>('meus_pets');

  // New Pet Form
  const [petName, setPetName] = useState<string>('');
  const [species, setSpecies] = useState<'cao' | 'gato'>('cao');
  const [breed, setBreed] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleRegisterPet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petName.trim()) return;

    const newPet: PetItem = {
      id: `pet_${Date.now()}`,
      name: petName,
      species,
      breed: breed || 'Mestiço Ribeirinho',
      ownerName: user.name,
      rabiesVaccineUpToDate: true,
      neutered: false,
      status: 'cadastrado',
      imageUrl:
        species === 'cao'
          ? 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=300&q=80'
          : 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80',
      notes: notes || 'Animal castrado e vacinado na campanha municipal de Manacapuru.',
    };

    setPets([newPet, ...pets]);
    setSuccessToast(`Pet ${newPet.name} cadastrado com microchip municipal!`);
    setPetName('');
    setBreed('');
    setNotes('');
    setActiveTab('meus_pets');
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
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0284C7] bg-sky-50 px-1.5 py-0.5 rounded">
                Módulo 13
              </span>
              <h2 className="font-extrabold text-base text-[#163047]">Biduga — Módulo Pet</h2>
            </div>
            <p className="text-[11px] text-slate-500">Cadastro animal, vacinação antirrábica e adoção</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-4">
        <div className="bg-white p-1 rounded-xl border border-slate-200 grid grid-cols-3 text-xs font-bold shadow-2xs">
          <button
            onClick={() => setActiveTab('meus_pets')}
            className={`py-2 rounded-lg transition-colors ${
              activeTab === 'meus_pets' ? 'bg-[#0284C7] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Meus Pets ({pets.filter((p) => p.status === 'cadastrado').length})
          </button>
          <button
            onClick={() => setActiveTab('adocao')}
            className={`py-2 rounded-lg transition-colors ${
              activeTab === 'adocao' ? 'bg-[#0284C7] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Adoção
          </button>
          <button
            onClick={() => setActiveTab('cadastrar')}
            className={`py-2 rounded-lg transition-colors flex items-center justify-center space-x-1 ${
              activeTab === 'cadastrar' ? 'bg-[#0284C7] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Cadastrar</span>
          </button>
        </div>
      </div>

      {successToast && (
        <div className="mx-4 mb-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast(null)} className="font-bold underline text-[11px]">
            Fechar
          </button>
        </div>
      )}

      {activeTab === 'meus_pets' ? (
        <div className="px-4 space-y-3">
          {pets
            .filter((p) => p.status === 'cadastrado')
            .map((pet) => (
              <div key={pet.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-start space-x-3.5">
                <img
                  src={pet.imageUrl}
                  alt={pet.name}
                  className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-100"
                />
                <div className="flex-1 min-w-0 text-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900">{pet.name}</h4>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center space-x-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Antirrábica em Dia</span>
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-0.5">{pet.breed}</p>
                  <p className="text-slate-600 text-[11px] mt-1 line-clamp-2">{pet.notes}</p>
                </div>
              </div>
            ))}
        </div>
      ) : activeTab === 'adocao' ? (
        <div className="px-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-sm text-slate-900">Animais Prontos para Adoção Responsável</h4>
            <span className="text-[10px] text-slate-400">Castrados e Vacinados</span>
          </div>

          {pets
            .filter((p) => p.status === 'para_adocao')
            .map((pet) => (
              <div key={pet.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={pet.imageUrl}
                    alt={pet.name}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-100"
                  />
                  <div>
                    <h5 className="font-bold text-xs text-slate-900">{pet.name}</h5>
                    <span className="text-[10px] text-slate-500">{pet.breed}</span>
                    <p className="text-[11px] text-slate-600 mt-0.5">{pet.notes}</p>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Interesse registrado na adoção de ${pet.name}! A Zoonoses entrará em contato.`)}
                  className="p-2 bg-[#0284C7] hover:bg-sky-600 text-white rounded-xl text-xs font-bold shrink-0 ml-2 shadow-xs"
                >
                  Quero Adotar
                </button>
              </div>
            ))}
        </div>
      ) : (
        <div className="px-4">
          <form onSubmit={handleRegisterPet} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs">
            <h4 className="font-bold text-sm text-slate-900">Cadastro de Animal Doméstico</h4>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Nome do Pet:</label>
              <input
                type="text"
                required
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="Ex: Jambu, Pirarucu..."
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Espécie:</label>
                <select
                  value={species}
                  onChange={(e) => setSpecies(e.target.value as any)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white"
                >
                  <option value="cao">Cão</option>
                  <option value="gato">Gato</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Raça / Porte:</label>
                <input
                  type="text"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  placeholder="Ex: Vira-lata, Médio"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Observações de Saúde e Vacinas:</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: Vacinado na feira do produtor, castrado..."
                className="w-full border border-slate-200 rounded-xl p-3 text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#0284C7] hover:bg-sky-600 text-white font-bold rounded-xl text-xs shadow-md transition-all"
            >
              Concluir Cadastro do Pet
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
