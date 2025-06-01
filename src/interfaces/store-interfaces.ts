export type Subscriber<T> = (state: T) => void;

export interface PersistOption<T> {
    save: (state: T) => Promise<void>;
    load: () => Promise<T | null>;
    clear: () => Promise<void>;
}

export interface CreateStoreOptions<T = any> {
    persist?: PersistOption<T>;
    preAdd?: (state: Partial<T>, entity: any) => T;
    preUpdate?: (state: Partial<T>, id: string, changes: any) => T;
    preRemove?: (state: Partial<T>, id: string) => void;
}

export interface Store<T> {
    getState: () => T;
    setState: (updater: Partial<T> | ((prevState: T) => Partial<T>)) => void;
    subscribe: (callback: Subscriber<T>) => () => void;
    isHydrated?: () => boolean;
}