import createStore, { CreateStoreOptions } from './createStore';

export const createEntityStore = <T extends { id: string }>(options: CreateStoreOptions) => {
  const store = createStore<{ entities: Record<string, T>; ids: string[]; activeId?: string }>({ entities: {}, ids: [], activeId: undefined }, options);

  const add = (entity: T) => {
    store.setState((prev) => {
      let nextState = prev;
      if (options.preAdd) {
        nextState = {
          entities: { ...prev.entities, [entity.id]: options.preAdd(prev, entity) },
          ids: { ...prev.ids, ...options.preAdd(prev, entity).id },
        }
      }
      if (nextState.entities[entity.id]) return nextState;
      return {
        ...nextState,
        entities: { ...nextState.entities, [entity.id]: entity },
        ids: [...nextState.ids, entity.id],
      };
    });
  };

  const update = (id: string, changes: Partial<T>) => {
    store.setState((prev) => {
      let nextState = prev;
      if (options.preUpdate) {
        nextState = {
          entities: { ...prev.entities, [id]: options.preUpdate(prev, id, changes) },
          ids: prev.ids,
        }
      }
      const current = nextState.entities[id];
      if (!current) return nextState;
      const updated = { ...current, ...changes };
      return {
        ...nextState,
        entities: { ...nextState.entities, [id]: updated },
      };
    });
  };

  const remove = (id: string) => {
    store.setState((prev) => {
      let nextState = prev;
      if (options?.preRemove && options.preRemove(prev, id)) {
        const { [id]: removed, ...rest } = nextState.entities;
        return {
          ...nextState,
          entities: rest,
          ids: nextState.ids.filter((i) => i !== id),
          activeId: nextState.activeId === id ? undefined : nextState.activeId,
        };
      }
      else {
        return {
          ...prev
        }
      }
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
