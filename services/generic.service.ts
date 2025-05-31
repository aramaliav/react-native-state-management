import { StoreKey } from '@/stores/generic.store';
import { getStore } from '../core/storeRegistry';

export const addEntity = <T extends { id: string }>(storeKey: StoreKey, entity: T) => {
  const store = getStore<T>(storeKey);
  if (!store) {
    console.warn(`Store '${storeKey}' not found`);
    return;
  }
  store.add(entity);
};

export const updateEntity = <T>(storeKey: StoreKey, id: string, changes: Partial<T>) => {
  const store = getStore<T>(storeKey);
  if (store) store.update(id, changes);
};

export const removeEntity = <T>(storeKey: StoreKey, id: string) => {
  const store = getStore<T>(storeKey);
  if (store) store.remove(id);
};

export const setActiveEntity = <T>(storeKey: StoreKey,id:string) => {
  const store = getStore<T>(storeKey);
  if (store) store.setActive(id);
};