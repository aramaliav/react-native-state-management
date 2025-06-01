import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { PersistOption } from '../interfaces/store-interfaces';

export const createAsyncStoragePersist = <T>(key: string): PersistOption<T> => ({
  save: async (state) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to persist state', e);
    }
  },
  load: async () => {
    try {
      const json = await AsyncStorage.getItem(key);
      return json ? JSON.parse(json) : null;
    } catch (e) {
      console.warn('Failed to load persisted state', e);
      return null;
    }
  },
  clear: async () => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.warn('Failed to clear persisted state', e);
    }
  }
});
export const createSecureStorePersist = <T>(key: string): PersistOption<T> => ({
  save: async (state) => {
    try {
      await SecureStore.setItemAsync(key, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to persist state', e);
    }
  },
  load: async () => {
    try {
      const json = await SecureStore.getItemAsync(key);
      return json ? JSON.parse(json) : null;
    } catch (e) {
      console.warn('Failed to load persisted state', e);
      return null;
    }
  },
  clear: async () => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (e) {
      console.warn('Failed to clear persisted state', e);
    }
  }
});
