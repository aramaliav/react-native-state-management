export type EntityStore<T> = {
  getState: () => { entities: Record<string, T>; ids: string[], activeId?: string };
  setState: (updater: any) => void;
  subscribe: (cb: (state: { entities: Record<string, T>; ids: string[], activeId?: string }) => void) => () => void;
  add: (entity: T) => void;
  update: (id: string, changes: Partial<T>) => void;
  remove: (id: string) => void;
  setActive: (id: string) => void;
  getActive: () => T | null;
  reset: () => Promise<void>;
};

const registry: Record<string, EntityStore<any>> = {};

export const registerStore = <T>(key: string, store: EntityStore<T>) => {
  registry[key] = store;
};

export const getStore = <T>(key: string): EntityStore<T> | undefined => {
  return registry[key];
};

export const getAvailableStoreKeys = (): string[] => {
  return Object.keys(registry);
};
