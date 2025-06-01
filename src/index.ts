export {
  useActiveEntity, useEntities,
  useEntityById, useEntityProperty
} from './hooks/storeHooks';

export {
  getStore, registerStore
} from './core/storeRegistry';

export { createAsyncStoragePersist, createSecureStorePersist } from './core/persist';

export { createEntityStore } from './core/createEntityStore';

export {
  addEntity, removeEntity,
  setActiveEntity, updateEntity
} from './services/generic.service';

export { getAvailableStoreKeys } from './core/storeRegistry';

export type { StoreKey } from './stores/generic.store';

