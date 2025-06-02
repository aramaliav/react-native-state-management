import { useEffect, useRef, useState } from 'react';
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

export const useFilteredEntities = <T>(
  storeKey: string,
  predicate: (entity: T) => boolean
): T[] => {
  const [filtered, setFiltered] = useState<T[]>([]);
  const predicateRef = useRef(predicate);

  // שמור תמיד את הגרסה העדכנית ביותר של הפונקציה ב־ref
  useEffect(() => {
    predicateRef.current = predicate;
  }, [predicate]);

  useEffect(() => {
    const store = getStore<T>(storeKey);
    if (!store) return;

    const unsubscribe = store.subscribe((state) => {
      const all = state.ids.map((id) => state.entities[id]);
      const filteredEntities = all.filter(predicateRef.current);
      setFiltered(filteredEntities);
    });

    return unsubscribe;
  }, [storeKey]);

  return filtered;
};

export const useSortedEntities = <T, K extends keyof T>(
  storeKey: string,
  property: K,
  direction: 'asc' | 'desc' = 'asc'
): T[] => {
  const [sorted, setSorted] = useState<T[]>([]);

  useEffect(() => {
    const store = getStore<T>(storeKey);
    if (!store) return;

    const unsubscribe = store.subscribe((state) => {
      const all = state.ids.map((id) => state.entities[id]);
      const sortedEntities = [...all].sort((a: T, b: T) => {
        const aValue = a?.[property];
        const bValue = b?.[property];

        if (aValue === bValue) return 0;
        if (aValue === undefined || aValue === null) return 1;
        if (bValue === undefined || bValue === null) return -1;
        if (aValue > bValue) return direction === 'asc' ? 1 : -1;
        return direction === 'asc' ? -1 : 1;
      });
      setSorted(sortedEntities);
    });

    return unsubscribe;
  }, [storeKey, property, direction]);

  return sorted;
};
