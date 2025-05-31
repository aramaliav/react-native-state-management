import { useEffect, useState, useRef } from 'react';
import { getStore } from '../core/storeRegistry';

export const useEntities = <T>(storeKey: string): T[] => {
  const [entities, setEntities] = useState<T[]>([]);

  useEffect(() => {
    const store = getStore<T>(storeKey);
    if (!store) return;

    return store.subscribe((state) => {
      const all = state.ids.map((id) => state.entities[id]);
      setEntities(all);
    });
  }, [storeKey]);

  return entities;
};

export const useEntityById = <T>(storeKey: string, id: string): T | null => {
  const [entity, setEntity] = useState<T | null>(null);

  useEffect(() => {
    const store = getStore<T>(storeKey);
    if (!store) return;

    const unsubscribe = store.subscribe((state) => {
      setEntity(state.entities[id] ?? null);
    });

    return unsubscribe;
  }, [storeKey, id]);

  return entity;
};

export const useActiveEntity = <T>(storeKey: string): T | null => {
  const [active, setActive] = useState<T | null>(null);

  useEffect(() => {
    const store = getStore<T>(storeKey);
    if (!store) return;

    const unsubscribe = store.subscribe((state) => {
      const current = state.activeId ? state.entities[state.activeId] : null;
      setActive(current ?? null);
    });

    return unsubscribe;
  }, [storeKey]);

  return active;
};

export const useEntityProperty = <T, K extends keyof T>(
  storeKey: string,
  id: string,
  property: K
): T[K] | undefined => {
  const [value, setValue] = useState<T[K]>();
  const previous = useRef<T[K]>(value);

  useEffect(() => {
    const store = getStore<T>(storeKey);
    if (!store) return;

    const unsubscribe = store.subscribe((state) => {
      const entity = state.entities[id];
      if (entity && typeof entity === 'object' && property in entity) {
        const nextValue = entity[property];
        if (previous.current !== nextValue) {
          previous.current = nextValue;
          setValue(nextValue);
        }
      }
    });

    return unsubscribe;
  }, [storeKey, id, property]);

  return value;
};
