class LocalStorageMock {
    store = {};

    clear() {
        this.store = {};
    }

    getItem(key: string) {
        return this.store[key] || null;
    }

    setItem(key: string, value: any) {
        this.store[key] = value.toString();
    }

    removeItem(key: string) {
        delete this.store[key];
    }
}

Object.defineProperty(window, 'localStorage', { value: new LocalStorageMock() });