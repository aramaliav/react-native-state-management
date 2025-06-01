import { getStore } from '../core/storeRegistry';

export const addEntity = <T extends { id: string }>(storeKey: string, entityOrArray: T | T[]) => {
  const store = getStore<T>(storeKey);
  if (!store) {
    console.warn(`Store '${storeKey}' not found`);
    return;
  }
  if (Array.isArray(entityOrArray)) {
    entityOrArray.forEach(entity => store.add(entity));
  } else {
    store.add(entityOrArray);
  }
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

export const resetStore = <T = any>(storeKey: string) => {
  const store = getStore<T>(storeKey);
  if (!store || !store.reset) {
    console.warn(`Store '${storeKey}' not found or doesn't support reset`);
    return;
  }
  store.reset();
};
