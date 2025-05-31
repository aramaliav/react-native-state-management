import createStore from './createStore';

const createEntityStore = <T extends { id: string }>(options = {}) => {
  const store = createStore<{ entities: Record<string, T>; ids: string[]; activeId?: string }>({ entities: {}, ids: [], activeId: undefined }, options);

  const add = (entity: T) => {
    store.setState((prev) => {
      if (prev.entities[entity.id]) return prev;
      return {
        entities: { ...prev.entities, [entity.id]: entity },
        ids: [...prev.ids, entity.id],
      };
    });
  };

  const update = (id: string, changes: Partial<T>) => {
    store.setState((prev) => {
      const current = prev.entities[id];
      if (!current) return prev;
      const updated = { ...current, ...changes };
      return {
        ...prev,
        entities: { ...prev.entities, [id]: updated },
      };
    });
  };

  const remove = (id: string) => {
    store.setState((prev) => {
      const { [id]: removed, ...rest } = prev.entities;
      return {
        entities: rest,
        ids: prev.ids.filter((i) => i !== id),
        activeId: prev.activeId === id ? undefined : prev.activeId,
      };
    });
  };

  const setActive = (id: string) => {
    store.setState((prev) => ({ ...prev, activeId: id }));
  };

  const getActive = (): T | null => {
    const state = store.getState();
    return state.activeId ? state.entities[state.activeId] ?? null : null;
  };

  return {
    ...store,
    add,
    update,
    remove,
    setActive,
    getActive,
  };
};

export default createEntityStore;
