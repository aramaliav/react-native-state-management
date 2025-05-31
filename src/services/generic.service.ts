import { getStore } from '../core/storeRegistry';

export const addEntity = <T extends { id: string }>(storeKey: string, entity: T) => {
  const store = getStore<T>(storeKey);
  if (!store) {
    console.warn(`Store '${storeKey}' not found`);
    return;
  }
  store.add(entity);
};

export const updateEntity = <T>(storeKey: string, id: string, changes: Partial<T>) => {
  const store = getStore<T>(storeKey);
  if (store) store.update(id, changes);
};

export const removeEntity = <T>(storeKey: string, id: string) => {
  const store = getStore<T>(storeKey);
  if (store) store.remove(id);
};

export const setActiveEntity = <T>(storeKey: string, id: string) => {
  const store = getStore<T>(storeKey);
  if (store) store.setActive(id);
};
