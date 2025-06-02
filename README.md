# React Native State Management Library

A lightweight, extensible state management solution for React Native, inspired by Akita, with built-in support for entity stores, persistence, store registry, and React hooks.

---

## Features

- **Entity Store**: Manage collections of entities with CRUD operations, active entity, and property selectors.
- **Global Store**: Manage any global state shape with subscription and hydration support.
- **Persistence**: Persist state using AsyncStorage or SecureStore, with auto-hydration and reset.
- **Store Registry**: Register, retrieve, and list stores by key.
- **React Hooks**: Subscribe to entities, single entity by ID, active entity, or entity property.
- **Pre-hooks**: Intercept add, update, and remove operations for custom logic.
- **Generic Services**: Perform CRUD and state operations on any registered store.
- **TypeScript Support**: Fully typed API for safety and autocompletion.

---

## Installation

```bash
npm install react-native-entity-store
```

---

## API Overview

### 1. Entity Store

Create an entity store for managing collections of objects (entities).

```typescript
import { createEntityStore, registerStore } from 'react-native-entity-store';

const userStore = createEntityStore({
  preAdd: (state, entity) => entity,
  preRemove: (state, id) => {},
  preUpdate: (state, id, changes) => changes,
  persist: createAsyncStoragePersist('usersStore'),
});

registerStore('usersStore', userStore);
```

#### Entity Store Methods

- `add(entity)`: Add a new entity.
- `update(id, changes)`: Update an entity by ID.
- `remove(id)`: Remove an entity by ID.
- `setActive(id)`: Set the active entity.
- `getActive()`: Get the currently active entity.
- `reset()`: Reset the store (and clear persistence if enabled).

---

### 2. Global Store

Create a global store for any state shape.

```typescript
import createStore from 'react-native-entity-store';

const counterStore = createStore({ count: 0 }, {
  persist: createAsyncStoragePersist('counterStore'),
});
```

#### Global Store Methods

- `getState()`
- `setState(updater)`
- `subscribe(callback)`
- `isHydrated()`

---

### 3. Persistence

Persist store state using AsyncStorage or SecureStore.

```typescript
import { createAsyncStoragePersist, createSecureStorePersist } from 'react-native-entity-store';

const persist = createAsyncStoragePersist('myStoreKey');
// or
const persist = createSecureStorePersist('myStoreKey');
```

- **Auto-hydration**: State is loaded from storage on app start.
- **Reset**: Clears persisted state.

---

### 4. Store Registry

Register and retrieve stores by key.

```typescript
import { registerStore, getStore, getAvailableStoreKeys } from 'react-native-entity-store';

registerStore('usersStore', userStore);

const store = getStore('usersStore');
const keys = getAvailableStoreKeys();
```

---

### 5. React Hooks

Subscribe to store data in React components.

```typescript
import {
  useEntities,
  useEntityById,
  useActiveEntity,
  useEntityProperty,
  useFilteredEntities,
  useSortedEntities,
} from 'react-native-entity-store';

const users = useEntities('usersStore');
const user = useEntityById('usersStore', userId);
const activeUser = useActiveEntity('usersStore');
const userName = useEntityProperty('usersStore', userId, 'name');
const filteredUsers = useFilteredEntities('usersStore', (user) => user.active);
const sortedUsers = useSortedEntities('usersStore', 'name', 'asc');
```

---

### 6. Generic Entity Services

Perform CRUD operations using service functions.

```typescript
import {
  addEntity,
  addEntities
  updateEntity,
  removeEntity,
  setActiveEntity,
  resetStore,
} from 'react-native-entity-store';

addEntity('usersStore', { id: '1', name: 'Alice' });
addEntities('usersStore', [{ id: '2', name: 'Bob' }]);
updateEntity('usersStore', '1', { name: 'Bob' });
removeEntity('usersStore', '1');
setActiveEntity('usersStore', '2');
resetStore('usersStore');
```

---

## Advanced: Pre-hooks

Customize behavior before add, update, or remove operations.

```typescript
const userStore = createEntityStore({
  preAdd: (state, entity) => {
    entity.name = 'Prefix_' + entity.name;
    return entity;
  },
  preRemove: (state, id) => {
    console.log('Removing', id);
  },
  preUpdate: (state, id, changes) => {
    changes.updatedAt = Date.now();
    return changes;
  },
});
```

---

## Folder Structure

```
src/
  core/
    createEntityStore.ts      // Entity store logic
    createStore.ts            // Global store logic
    persist.ts                // Persistence (AsyncStorage/SecureStore)
    storeRegistry.ts          // Store registry management
  hooks/
    storeHooks.ts             // React hooks for stores
  interfaces/
    store-interfaces.ts       // TypeScript interfaces and types
  services/
    generic.service.ts        // Generic CRUD and state services
  stores/
    generic.store.ts          // Generic store implementation
  index.ts                    // Library entry point
```

---

## TypeScript Types

- `Store<T>`: Generic store interface.
- `EntityStore<T>`: Entity store interface.
- `PersistOption<T>`: Persistence interface.
- `Subscriber<T>`: Subscription callback type.

---

## License

MIT