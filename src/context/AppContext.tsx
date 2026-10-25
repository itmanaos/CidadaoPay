// CIDADÃO$ — Global Application Context & State Management
// Spec Section 3.1 & 6: Navigation, Tenant context, Multi-role, Cart, Wallet & Offline

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Municipality,
  UserProfile,
  UserRole,
  CartItem,
  Product,
  Order,
  ServiceProtocol,
  FreightQuoteRequest,
  WalletState,
  ModuleKey,
} from '../types';
import { DEMO_MUNICIPALITY, DEMO_USER, DEMO_PROTOCOLS, DEMO_FREIGHT_REQUESTS } from '../data/demoData';
import { storage, STORAGE_KEYS, SyncState } from '../services/storage';

export type MainTab = 'inicio' | 'explorar' | 'servicos' | 'carteira' | 'perfil';
export type ViewMode = 'mobile_preview' | 'fullscreen' | 'admin_engine';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  module: ModuleKey;
  date: string;
  read: boolean;
}

interface AppContextType {
  // Tenant & Municipality
  municipality: Municipality;
  setMunicipality: (m: Municipality) => void;
  // User Profile & Role
  user: UserProfile;
  switchRole: (role: UserRole) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  // Navigation
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
  activeModule: ModuleKey | null;
  openModule: (module: ModuleKey) => void;
  closeModule: () => void;
  // Commercial Cart & Orders (Marketplace)
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  orders: Order[];
  createOrder: (order: Omit<Order, 'id' | 'createdAt'>) => Order;
  // Public Protocols
  protocols: ServiceProtocol[];
  addProtocol: (protocol: Omit<ServiceProtocol, 'id' | 'createdAt' | 'updatedAt'>) => ServiceProtocol;
  // Freight
  freightRequests: FreightQuoteRequest[];
  addFreightRequest: (request: Omit<FreightQuoteRequest, 'id' | 'createdAt'>) => FreightQuoteRequest;
  // Wallet & Rewards
  wallet: WalletState;
  addRewardPoints: (pts: number, reason: string) => void;
  useBenefitOrWallet: (amount: number, description: string) => boolean;
  // Offline & Connectivity
  isOffline: boolean;
  toggleOfflineMode: () => void;
  syncState: SyncState;
  triggerManualSync: () => Promise<void>;
  pendingSyncCount: number;
  // App UI Shell
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationsRead: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const INITIAL_WALLET: WalletState = {
  mrtPointsBalance: 450, // Pontos Cidadão Manacapuru (não monetários)
  municipalBenefitBalance: 300.0, // Benefício Municipal Restrito (ex: Bolsa Cidadão)
  sandboxFiatBalance: 850.0, // Saldo de testes Sandbox
  recentTransactions: [
    {
      id: 'tx_1',
      description: 'Recompensa por Vacinação em Dia (Filho Thiago)',
      amount: 150,
      type: 'credito',
      source: 'pontos_recompensa',
      date: '2026-10-20 14:00',
    },
    {
      id: 'tx_2',
      description: 'Crédito Benefício Social — Bolsa Cidadão Manacapuru',
      amount: 300.0,
      type: 'credito',
      source: 'beneficio_municipal',
      date: '2026-10-01 08:00',
    },
    {
      id: 'tx_3',
      description: 'Compra Sandbox — Cooperativa BioAmazonas',
      amount: 45.0,
      type: 'debito',
      source: 'compra_comercio',
      date: '2026-10-18 11:20',
    },
  ],
};

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'UBS Fluvial em Rota',
    message: 'A UBS Dr. Walter Góes atracará amanhã no Supiá às 09:00 com vacinas e consultas.',
    module: 'health',
    date: 'Hoje 08:45',
    read: false,
  },
  {
    id: 'notif_2',
    title: 'Protocolo de Iluminação Atualizado',
    message: 'Seu protocolo PRT-2026-1042 entrou na escala de atendimento da Secretaria de Obras.',
    module: 'public-services',
    date: 'Ontem 16:30',
    read: false,
  },
  {
    id: 'notif_3',
    title: 'Transporte Escolar Fluvial',
    message: 'A lancha escolar 03 concluiu o trajeto com segurança e todos os alunos desembarcaram.',
    module: 'education',
    date: 'Ontem 12:15',
    read: true,
  },
  {
    id: 'notif_4',
    title: 'Feira do Produtor Rural',
    message: 'Safra de Farinha de Uarini com selo de Indicação Geográfica disponível no Marketplace.',
    module: 'agro-bioeconomy',
    date: '22 Out 10:00',
    read: true,
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [municipality, setMunicipality] = useState<Municipality>(DEMO_MUNICIPALITY);
  const [user, setUser] = useState<UserProfile>(() => storage.getItem(STORAGE_KEYS.USER_PROFILE, DEMO_USER));
  const [activeTab, setActiveTab] = useState<MainTab>('inicio');
  const [activeModule, setActiveModule] = useState<ModuleKey | null>(null);
  const [cart, setCart] = useState<CartItem[]>(() => storage.getItem(STORAGE_KEYS.CART, []));
  const [orders, setOrders] = useState<Order[]>(() => storage.getItem(STORAGE_KEYS.ORDERS, []));
  const [protocols, setProtocols] = useState<ServiceProtocol[]>(() =>
    storage.getItem(STORAGE_KEYS.PROTOCOLS, DEMO_PROTOCOLS)
  );
  const [freightRequests, setFreightRequests] = useState<FreightQuoteRequest[]>(() =>
    storage.getItem(STORAGE_KEYS.FREIGHT_REQUESTS, DEMO_FREIGHT_REQUESTS)
  );
  const [wallet, setWallet] = useState<WalletState>(() => storage.getItem(STORAGE_KEYS.WALLET, INITIAL_WALLET));
  const [isOffline, setIsOffline] = useState<boolean>(() =>
    storage.getItem(STORAGE_KEYS.OFFLINE_MODE_FORCED, false)
  );
  const [syncState, setSyncState] = useState<SyncState>('synced');
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);
  const [viewMode, setViewMode] = useState<ViewMode>('mobile_preview');
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Persist user changes
  useEffect(() => {
    storage.setItem(STORAGE_KEYS.USER_PROFILE, user);
  }, [user]);

  // Persist cart
  useEffect(() => {
    storage.setItem(STORAGE_KEYS.CART, cart);
  }, [cart]);

  // Persist orders
  useEffect(() => {
    storage.setItem(STORAGE_KEYS.ORDERS, orders);
  }, [orders]);

  // Persist protocols
  useEffect(() => {
    storage.setItem(STORAGE_KEYS.PROTOCOLS, protocols);
  }, [protocols]);

  // Persist freight
  useEffect(() => {
    storage.setItem(STORAGE_KEYS.FREIGHT_REQUESTS, freightRequests);
  }, [freightRequests]);

  // Persist wallet
  useEffect(() => {
    storage.setItem(STORAGE_KEYS.WALLET, wallet);
  }, [wallet]);

  // Sync count listener
  useEffect(() => {
    const queue = storage.getQueue();
    setPendingSyncCount(queue.length);
  }, [isOffline]);

  const switchRole = (role: UserRole) => {
    setUser((prev) => ({
      ...prev,
      role,
    }));
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const openModule = (mod: ModuleKey) => {
    setActiveModule(mod);
  };

  const closeModule = () => {
    setActiveModule(null);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-MPU-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    if (isOffline) {
      storage.enqueueOperation('cart_order', newOrder);
      setPendingSyncCount((c) => c + 1);
      setSyncState('pending');
    }

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Reward MRT$ Points for shopping locally
    addRewardPoints(Math.floor(newOrder.totalAmount * 0.1), 'Pontos por Compra no Comércio de Manacapuru');

    return newOrder;
  };

  const addProtocol = (
    data: Omit<ServiceProtocol, 'id' | 'createdAt' | 'updatedAt'>
  ): ServiceProtocol => {
    const nowStr =
      new Date().toLocaleDateString('pt-BR') +
      ' ' +
      new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const newProt: ServiceProtocol = {
      ...data,
      id: `PRT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: nowStr,
      updatedAt: nowStr,
    };

    if (isOffline) {
      storage.enqueueOperation('service_protocol', newProt);
      setPendingSyncCount((c) => c + 1);
      setSyncState('pending');
    }

    setProtocols((prev) => [newProt, ...prev]);
    return newProt;
  };

  const addFreightRequest = (
    reqData: Omit<FreightQuoteRequest, 'id' | 'createdAt'>
  ): FreightQuoteRequest => {
    const nowStr =
      new Date().toLocaleDateString('pt-BR') +
      ' ' +
      new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const newReq: FreightQuoteRequest = {
      ...reqData,
      id: `FRT-2026-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: nowStr,
    };

    if (isOffline) {
      storage.enqueueOperation('freight_quote', newReq);
      setPendingSyncCount((c) => c + 1);
      setSyncState('pending');
    }

    setFreightRequests((prev) => [newReq, ...prev]);
    return newReq;
  };

  const addRewardPoints = (pts: number, reason: string) => {
    setWallet((prev) => ({
      ...prev,
      mrtPointsBalance: prev.mrtPointsBalance + pts,
      recentTransactions: [
        {
          id: `tx_${Date.now()}`,
          description: reason,
          amount: pts,
          type: 'credito',
          source: 'pontos_recompensa',
          date: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        },
        ...prev.recentTransactions,
      ],
    }));
  };

  const useBenefitOrWallet = (amount: number, description: string): boolean => {
    if (wallet.municipalBenefitBalance >= amount) {
      setWallet((prev) => ({
        ...prev,
        municipalBenefitBalance: prev.municipalBenefitBalance - amount,
        recentTransactions: [
          {
            id: `tx_${Date.now()}`,
            description,
            amount,
            type: 'debito',
            source: 'beneficio_municipal',
            date: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          },
          ...prev.recentTransactions,
        ],
      }));
      return true;
    } else if (wallet.sandboxFiatBalance >= amount) {
      setWallet((prev) => ({
        ...prev,
        sandboxFiatBalance: prev.sandboxFiatBalance - amount,
        recentTransactions: [
          {
            id: `tx_${Date.now()}`,
            description,
            amount,
            type: 'debito',
            source: 'compra_comercio',
            date: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          },
          ...prev.recentTransactions,
        ],
      }));
      return true;
    }
    return false;
  };

  const toggleOfflineMode = () => {
    const nextState = !isOffline;
    setIsOffline(nextState);
    storage.setItem(STORAGE_KEYS.OFFLINE_MODE_FORCED, nextState);
    setSyncState(nextState ? 'offline' : 'synced');
  };

  const triggerManualSync = async () => {
    setSyncState('syncing');
    await new Promise((res) => setTimeout(res, 900));
    await storage.processQueue();
    setPendingSyncCount(0);
    setSyncState('synced');
  };

  const markNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        municipality,
        setMunicipality,
        user,
        switchRole,
        updateUser,
        activeTab,
        setActiveTab,
        activeModule,
        openModule,
        closeModule,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        orders,
        createOrder,
        protocols,
        addProtocol,
        freightRequests,
        addFreightRequest,
        wallet,
        addRewardPoints,
        useBenefitOrWallet,
        isOffline,
        toggleOfflineMode,
        syncState,
        triggerManualSync,
        pendingSyncCount,
        viewMode,
        setViewMode,
        notifications,
        unreadNotificationCount,
        markNotificationsRead,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
