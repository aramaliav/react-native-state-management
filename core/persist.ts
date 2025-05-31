import { StoreKey } from '@/stores/generic.store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createPersist = <T>(key: StoreKey) => ({
  save: async (state: T) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to persist state', e);
    }
  },
  load: async (): Promise<T | null> => {
    try {
      const json = await AsyncStorage.getItem(key);
      return json ? JSON.parse(json) : null;
    } catch (e) {
      console.warn('Failed to load persisted state', e);
      return null;
    }
  },
});