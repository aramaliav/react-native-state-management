import { CreateStoreOptions, Store, Subscriber } from "../interfaces/store-interfaces";


function createStore<T>(
  initialState: T,
  options: CreateStoreOptions<T> = {}
): Store<T> {
  let state = initialState;
  let hydrated = false;
  const subscribers: Set<Subscriber<T>> = new Set();

  const notify = () => subscribers.forEach(cb => {
    cb(state);
  });

  const setState: Store<T>["setState"] = (updater) => {
    const nextState = typeof updater === 'function' ? updater(state) : updater;
    state = { ...state, ...nextState };
    notify();
    if (options.persist) options.persist.save(state);
  };

  const getState: Store<T>["getState"] = () => state;

  const subscribe: Store<T>["subscribe"] = (callback) => {
    subscribers.add(callback);
    if (hydrated) callback(state);
    return () => subscribers.delete(callback);
  };

  if (options.persist) {
    options.persist.load().then((loadedState) => {
      if (loadedState) {
        state = { ...state, ...loadedState };
        hydrated = true;
        notify();
      } else {
        hydrated = true;
      }
    });
  } else {
    hydrated = true;
  }

  return {
    getState,
    setState,
    subscribe,
    isHydrated: () => hydrated,
  };
}

export default createStore;
