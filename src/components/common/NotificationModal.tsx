// CIDADÃO$ — Notification Modal Component
// Spec Section 14: Municipal alerts, protocol updates, school and health notifications

import React from 'react';
import { useApp } from '../../context/AppContext';
import { MODULE_CONFIG } from '../../theme/tokens';
import { X, CheckCheck, BellRing } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const NotificationModal: React.FC<Props> = ({ onClose }) => {
  const { notifications, markNotificationsRead, openModule } = useApp();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#072F58] to-[#0756A6] text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BellRing className="w-5 h-5 text-[#FFC43D]" />
            <h3 className="font-bold text-base">Central de Notificações</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>{notifications.length} avisos municipais</span>
          <button
            onClick={markNotificationsRead}
            className="flex items-center space-x-1 text-[#0756A6] font-semibold hover:underline"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Marcar lidos</span>
          </button>
        </div>

        {/* List of notifications */}
        <div className="divide-y divide-slate-100 overflow-y-auto p-2">
          {notifications.map((item) => {
            const mod = (MODULE_CONFIG as Record<string, any>)[item.module];
            return (
              <div
                key={item.id}
                onClick={() => {
                  openModule(item.module);
                  onClose();
                }}
                className={`p-3 rounded-xl transition-all cursor-pointer hover:bg-slate-50 flex items-start space-x-3 ${
                  !item.read ? 'bg-blue-50/50 border border-blue-100/60' : ''
                }`}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold"
                  style={{ backgroundColor: mod?.bgColor || '#f1f5f9', color: mod?.color || '#0756a6' }}
                >
                  {mod?.number || '•'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {mod?.shortName || 'Geral'}
                    </span>
                    <span className="text-[10px] text-slate-400">{item.date}</span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 mt-0.5">{item.title}</h4>
                  <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">{item.message}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-200 hover:bg-slate-300 rounded-xl text-slate-700 text-xs font-bold transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
