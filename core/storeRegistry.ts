import { StoreKey } from "@/stores/generic.store";

export type EntityStore<T> = {
  getState: () => { entities: Record<string, T>; ids: string[], activeId?: string };
  setState: (updater: any) => void;
  subscribe: (cb: (state: { entities: Record<string, T>; ids: string[], activeId?: string }) => void) => () => void;
  add: (entity: T) => void;
  update: (id: string, changes: Partial<T>) => void;
  remove: (id: string) => void;
  setActive: (id: string) => void;
  getActive: () => T | null;
};

const registry: Record<string, EntityStore<any>> = {};

export const registerStore = <T>(key: StoreKey, store: EntityStore<T>) => {
  registry[key] = store;
};

export const getStore = <T>(key: StoreKey): EntityStore<T> | undefined => {
  return registry[key];
};
