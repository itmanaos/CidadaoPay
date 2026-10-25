// CIDADÃO$ — Offline-First Storage & Synchronization Service
// Spec Section 12: Resilient operations for Amazonian riverine & rural connectivity

export type SyncState = 'synced' | 'cached' | 'pending' | 'offline' | 'syncing';

export interface QueuedOperation {
  id: string;
  type: 'service_protocol' | 'cart_order' | 'freight_quote' | 'pet_registration';
  payload: any;
  timestamp: string;
  status: 'pending' | 'syncing' | 'completed' | 'failed';
  retryCount: number;
}

const STORAGE_KEYS = {
  USER_PROFILE: 'cidadao_user_profile',
  CART: 'cidadao_cart_items',
  ORDERS: 'cidadao_orders',
  PROTOCOLS: 'cidadao_protocols',
  FREIGHT_REQUESTS: 'cidadao_freight_requests',
  WALLET: 'cidadao_wallet_state',
  PETS: 'cidadao_pets',
  SYNC_QUEUE: 'cidadao_sync_queue',
  OFFLINE_MODE_FORCED: 'cidadao_offline_forced',
};

class StorageService {
  private listeners: Array<() => void> = [];

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  getItem<T>(key: string, defaultValue: T): T {
    try {
      const data = localStorage.getItem(key);
      if (!data) return defaultValue;
      return JSON.parse(data) as T;
    } catch {
      return defaultValue;
    }
  }

  setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      this.notify();
    } catch (err) {
      console.warn('Storage write failed', err);
    }
  }

  // Queue an operation for background sync when connection resumes
  enqueueOperation(type: QueuedOperation['type'], payload: any): QueuedOperation {
    const queue = this.getItem<QueuedOperation[]>(STORAGE_KEYS.SYNC_QUEUE, []);
    const op: QueuedOperation = {
      id: `sync_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      type,
      payload,
      timestamp: new Date().toISOString(),
      status: 'pending',
      retryCount: 0,
    };
    queue.push(op);
    this.setItem(STORAGE_KEYS.SYNC_QUEUE, queue);
    return op;
  }

  getQueue(): QueuedOperation[] {
    return this.getItem<QueuedOperation[]>(STORAGE_KEYS.SYNC_QUEUE, []);
  }

  clearCompletedQueue(): void {
    const queue = this.getQueue().filter((op) => op.status !== 'completed');
    this.setItem(STORAGE_KEYS.SYNC_QUEUE, queue);
  }

  // Simulate background synchronization
  processQueue(): Promise<{ processed: number }> {
    const queue = this.getQueue();
    if (queue.length === 0) return Promise.resolve({ processed: 0 });

    const updated = queue.map((op) => ({
      ...op,
      status: 'completed' as const,
    }));
    this.setItem(STORAGE_KEYS.SYNC_QUEUE, updated);
    this.clearCompletedQueue();
    return Promise.resolve({ processed: queue.length });
  }
}

export const storage = new StorageService();
export { STORAGE_KEYS };
