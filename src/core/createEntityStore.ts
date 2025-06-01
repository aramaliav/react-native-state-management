import { CreateStoreOptions } from "../interfaces/store-interfaces";
import createStore from "./createStore";

export const createEntityStore = <T extends { id: string }>(options: CreateStoreOptions) => {
  const store = createStore<{ entities: Record<string, T>; ids: string[]; activeId?: string }>({ entities: {}, ids: [], activeId: undefined }, options);

  const add = (entity: T) => {
    store.setState((prev) => {
      let nextState = prev;
      if (options.preAdd) {
        entity = options.preAdd(prev, entity);
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
        changes = options.preUpdate(prev, id, changes);
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
      if (options.preRemove) {
        options.preRemove(nextState.entities[id], id);
      }
      const { [id]: removed, ...rest } = nextState.entities;
      return {
        ...nextState,
        entities: rest,
        ids: nextState.ids.filter((i) => i !== id),
        activeId: nextState.activeId === id ? undefined : nextState.activeId,
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
