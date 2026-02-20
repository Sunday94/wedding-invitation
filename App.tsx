
import React, { useState, useEffect } from 'react';
import { DesignProvider, useDesign } from './context/DesignContext';
import DesignSelectorScreen from './screens/DesignSelectorScreen';
import WelcomeVariant from './screens/WelcomeVariant';
import LoadingVariant from './screens/LoadingVariant';
import DashboardVariant from './screens/DashboardVariant';

export type ScreenState = 'selector' | 'welcome' | 'loading' | 'dashboard';

const STORAGE_KEY = 'weddingDesignSelection';

// Reads localStorage to check if a confirmed selection already exists
function getSavedSelection(): { welcome: number; loading: number; dashboard: number; showWelcomeImage?: boolean } | null {
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
        showWelcomeImage: parsed.showWelcomeImage
      };
    }
    return null;
  } catch {
    return null;
  }
}

// ─── Inner app (needs context) ────────────────────────────────────

const InnerApp: React.FC = () => {
  const { selection, clearSelection } = useDesign();

  const [currentScreen, setCurrentScreen] = useState<ScreenState>(() => {
    return getSavedSelection() ? 'welcome' : 'selector';
  });

  // Derive active variant IDs from context or saved storage
  const [activeVariants, setActiveVariants] = useState(() => {
    const saved = getSavedSelection();
    return saved ?? { welcome: 1, loading: 1, dashboard: 1 };
  });

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

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Main App Container - Tablet and Mobile Friendly */}
      <div className="relative w-full h-screen max-w-screen-md mx-auto shadow-2xl bg-white overflow-hidden">

        {currentScreen === 'selector' && (
          <DesignSelectorScreen onConfirm={handleConfirm} />
        )}

        {currentScreen === 'welcome' && (
          <div className="relative h-full w-full">
            <WelcomeVariant onOpen={handleOpenInvitation} variantId={activeVariants.welcome} />
            {/* Change design button */}
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

// ─── Root (provides context) ──────────────────────────────────────

const App: React.FC = () => (
  <DesignProvider>
    <InnerApp />
  </DesignProvider>
);

export default App;
