export {
  useEntities,
  useEntityById,
  useActiveEntity,
  useEntityProperty
} from './hooks/storeHooks';

export {
  registerStore,
  getStore,
} from './core/storeRegistry';

export { createEntityStore } from './core/createEntityStore';

export {
  addEntity,
  updateEntity,
  removeEntity,
  setActiveEntity
} from './services/generic.service';

export { getAvailableStoreKeys } from './core/storeRegistry';

export type { StoreKey } from './stores/generic.store';
