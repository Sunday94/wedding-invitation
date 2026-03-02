import React, { useEffect, useState } from 'react';
import { DesignProvider, useDesign } from './context/DesignContext';
import DesignSelectorScreen from './screens/DesignSelectorScreen';
import WelcomeVariant from './screens/WelcomeVariant';
import LoadingVariant from './screens/LoadingVariant';
import DashboardVariant from './screens/DashboardVariant';
import { buildApiUrl, FRONTEND_CLIENT_ID } from './services/apiConfig';
import { mapRemoteDesignToSelection, SyncedDesignSelection } from './services/designSync';

export type ScreenState = 'selector' | 'welcome' | 'loading' | 'dashboard';

const STORAGE_KEY = 'weddingDesignSelection';
const URL_OVERRIDE_KEYS = ['welcome', 'loading', 'dashboard'] as const;

type SavedSelection = SyncedDesignSelection;

const hasUrlOverrides = (): boolean => {
  const params = new URLSearchParams(window.location.search);
  return URL_OVERRIDE_KEYS.some((key) => params.has(key));
};

const saveConfirmedSelection = (selection: SavedSelection) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...selection, _confirmed: true }));
};

function getSavedSelection(): SavedSelection | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;

    const parsed = JSON.parse(saved);
    if (
      parsed._confirmed &&
      typeof parsed.welcome === 'number' &&
      typeof parsed.loading === 'number' &&
      typeof parsed.dashboard === 'number'
    ) {
      return {
        welcome: parsed.welcome,
        loading: parsed.loading,
        dashboard: parsed.dashboard,
        showWelcomeImage: parsed.showWelcomeImage !== false
      };
    }

    return null;
  } catch {
    return null;
  }
}

const getInitialActiveVariants = (): SavedSelection => {
  const params = new URLSearchParams(window.location.search);
  const saved = getSavedSelection();

  const parseParam = (value: string | null, fallback: number): number => {
    if (!value) return fallback;
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? fallback : parsed;
  };

  return {
    welcome: parseParam(params.get('welcome'), saved?.welcome ?? 1),
    loading: parseParam(params.get('loading'), saved?.loading ?? 1),
    dashboard: parseParam(params.get('dashboard'), saved?.dashboard ?? 1),
    showWelcomeImage: saved?.showWelcomeImage ?? true
  };
};

const fetchRemoteDesignSelection = async (): Promise<SavedSelection | null> => {
  const response = await fetch(buildApiUrl('/api/design', { client_id: FRONTEND_CLIENT_ID }));
  if (!response.ok) {
    throw new Error(`Design sync failed with status ${response.status}`);
  }

  const payload = await response.json();
  return mapRemoteDesignToSelection(payload);
};

const InnerApp: React.FC = () => {
  const { clearSelection } = useDesign();
  const [isSyncLoading, setIsSyncLoading] = useState(true);

  const [currentScreen, setCurrentScreen] = useState<ScreenState>(() => {
    if (hasUrlOverrides()) return 'welcome';
    return getSavedSelection() ? 'welcome' : 'selector';
  });

  const [activeVariants, setActiveVariants] = useState<SavedSelection>(() => getInitialActiveVariants());

  useEffect(() => {
    let isCancelled = false;

    const syncDesignFromBackend = async () => {
      if (hasUrlOverrides()) {
        setIsSyncLoading(false);
        return;
      }

      try {
        const remoteSelection = await fetchRemoteDesignSelection();
        if (!remoteSelection || isCancelled) return;

        setActiveVariants(remoteSelection);
        saveConfirmedSelection(remoteSelection);
        setCurrentScreen('welcome');
      } catch (error) {
        console.error('Failed to sync remote design settings:', error);
      } finally {
        if (!isCancelled) {
          setIsSyncLoading(false);
        }
      }
    };

    syncDesignFromBackend();

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleConfirm = () => {
    const saved = getSavedSelection();
    if (saved) setActiveVariants(saved);
    setCurrentScreen('welcome');
  };

  const handleOpenInvitation = () => setCurrentScreen('loading');
  const handleLoadingFinished = () => setCurrentScreen('dashboard');

  const handleChangeDesign = () => {
    clearSelection();
    setCurrentScreen('selector');
  };

  if (isSyncLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="w-full h-screen max-w-screen-md mx-auto bg-white flex items-center justify-center">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Syncing invitation design...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="relative w-full h-screen max-w-screen-md mx-auto shadow-2xl bg-white overflow-hidden">
        {currentScreen === 'selector' && (
          <DesignSelectorScreen onConfirm={handleConfirm} />
        )}

        {currentScreen === 'welcome' && (
          <div className="relative h-full w-full">
            <WelcomeVariant
              onOpen={handleOpenInvitation}
              variantId={activeVariants.welcome}
              showImage={activeVariants.showWelcomeImage}
            />
            <button
              onClick={handleChangeDesign}
              className="absolute top-4 right-4 z-50 bg-black/30 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-black/50 transition-colors"
            >
              <span className="material-icons text-[12px]">palette</span>
              Change Design
            </button>
          </div>
        )}

        {currentScreen === 'loading' && (
          <LoadingVariant onFinished={handleLoadingFinished} variantId={activeVariants.loading} />
        )}

        {currentScreen === 'dashboard' && (
          <DashboardVariant variantId={activeVariants.dashboard} />
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <DesignProvider>
    <InnerApp />
  </DesignProvider>
);

export default App;
