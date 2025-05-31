import { createPersist } from '@/core/persist';
import { registerStore } from '../core/storeRegistry';
import createEntityStore from '@/core/createEntityStore';

export interface Task {
  id: string;
  title: string;
  done: boolean;
}

export const storeKeys = ['taskStore'] as const;
export type StoreKey = typeof storeKeys[number];

export const initStores = () => {
  const taskStore = createEntityStore<Task>({
    persist: createPersist('taskStore'),
  });

  registerStore('taskStore', taskStore);
};
