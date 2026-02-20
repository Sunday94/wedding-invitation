
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { DesignContextValue, DesignSelection } from '../types';

const STORAGE_KEY = 'weddingDesignSelection';

const DesignContext = createContext<DesignContextValue | null>(null);

export const DesignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selection, setSelection] = useState<Partial<DesignSelection>>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    });

    const [confirmed, setConfirmed] = useState<boolean>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (!saved) return false;
            const parsed = JSON.parse(saved);
            return (
                typeof parsed.welcome === 'number' &&
                typeof parsed.loading === 'number' &&
                typeof parsed.dashboard === 'number' &&
                !!parsed._confirmed
            );
        } catch {
            return false;
        }
    });

    const isComplete =
        typeof selection.welcome === 'number' &&
        typeof selection.loading === 'number' &&
        typeof selection.dashboard === 'number';

    const setSlot = useCallback((slot: keyof DesignSelection, value: number | boolean) => {
        setSelection(prev => ({ ...prev, [slot]: value }));
    }, []);

    const confirm = useCallback(() => {
        if (!isComplete) return;
        const toSave = { ...selection, _confirmed: true };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
        setConfirmed(true);
    }, [selection, isComplete]);

    const clearSelection = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setSelection({});
        setConfirmed(false);
    }, []);

    // Keep localStorage in sync with draft selection (without _confirmed flag)
    useEffect(() => {
        if (!confirmed) {
            const draft = { ...selection };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
        }
    }, [selection, confirmed]);

    return (
        <DesignContext.Provider value={{ selection, setSlot, isComplete, confirm, clearSelection }}>
            {children}
        </DesignContext.Provider>
    );
};

export const useDesign = (): DesignContextValue => {
    const ctx = useContext(DesignContext);
    if (!ctx) throw new Error('useDesign must be used within a DesignProvider');
    return ctx;
};

/** Returns true if the user has already confirmed a complete selection */
export const useIsConfirmed = (): boolean => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return false;
        const parsed = JSON.parse(saved);
        return !!parsed._confirmed;
    } catch {
        return false;
    }
};
