import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/lib/constants";

export type OfflineQueueItem = {
  id: string;
  path: string;
  method: "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  createdAt: string;
};

type CachedSnapshot = {
  appointments: unknown[];
  patients: unknown[];
  notes: unknown[];
  invoices: unknown[];
  updatedAt: string | null;
};

type OfflineState = CachedSnapshot & {
  queue: OfflineQueueItem[];
  enqueue: (item: Omit<OfflineQueueItem, "id" | "createdAt">) => void;
  dequeue: (id: string) => void;
  clearQueue: () => void;
  setSnapshot: (key: keyof CachedSnapshot, value: unknown) => void;
};

export const useOfflineStore = create<OfflineState>()(
  persist(
    (set, get) => ({
      appointments: [],
      patients: [],
      notes: [],
      invoices: [],
      updatedAt: null,
      queue: [],

      enqueue: (item) => {
        const entry: OfflineQueueItem = {
          ...item,
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          createdAt: new Date().toISOString(),
        };
        set({ queue: [...get().queue, entry] });
      },

      dequeue: (id) => set({ queue: get().queue.filter((item) => item.id !== id) }),

      clearQueue: () => set({ queue: [] }),

      setSnapshot: (key, value) =>
        set({
          [key]: value,
          updatedAt: new Date().toISOString(),
        } as Partial<CachedSnapshot>),
    }),
    {
      name: STORAGE_KEYS.OFFLINE_QUEUE,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
