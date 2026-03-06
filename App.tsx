import React, { useEffect, useState } from 'react';
import { DesignProvider, useDesign } from './context/DesignContext';
import { data } from './data';
import DesignSelectorScreen from './screens/DesignSelectorScreen';
import WelcomeVariant from './screens/WelcomeVariant';
import LoadingVariant from './screens/LoadingVariant';
import DashboardVariant from './screens/DashboardVariant';
import { buildApiUrl, FRONTEND_CLIENT_ID } from './services/apiConfig';
import { mapRemoteDesignToSelection, RemoteDesignSettings, SyncedDesignSelection } from './services/designSync';
import { applyRemoteFontSettings, resetFontSettings } from './services/fontSettings';
import { setWelcomeCopySource } from './screens/welcome/welcomeTextBindings';

export type ScreenState = 'selector' | 'welcome' | 'loading' | 'dashboard';

const STORAGE_KEY = 'weddingDesignSelection';
const URL_OVERRIDE_KEYS = ['welcome', 'loading', 'dashboard'] as const;

type SavedSelection = SyncedDesignSelection;
type RemoteWelcomeDetails = {
  bride_name?: string | null;
  groom_name?: string | null;
  bride_display_name?: string | null;
  groom_display_name?: string | null;
  meet_year?: string | number | null;
  engaged_year?: string | number | null;
  description?: string | null;
  event_date?: string | null;
  wedding_venue?: string | null;
  wedding_address?: string | null;
} | null;
type RemoteOverview = {
  event_date?: string | null;
} | null;
const DEFAULT_BRIDE_NAME = data.couple.fullNames.partner1;
const DEFAULT_GROOM_NAME = data.couple.fullNames.partner2;
const DEFAULT_WELCOME_IMAGE = data.wedding.welcomeImage;
const DEFAULT_COUPLE_IMAGE = data.couple.story.image;
const DEFAULT_STORY_TEXT = data.couple.story.text;
const DEFAULT_MEET_YEAR = data.couple.story.metYear;
const DEFAULT_ENGAGED_YEAR = data.couple.story.engagedYear;

const normalizeRemoteImageUrl = (value: unknown): string => {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (!trimmed || trimmed === 'null' || trimmed === 'undefined') return '';
  return trimmed;
};

const normalizeRemoteText = (value: unknown): string => {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (!trimmed || trimmed === 'null' || trimmed === 'undefined') return '';
  return trimmed;
};

const normalizeRemoteYear = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isInteger(value)) return value;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const parsed = Number.parseInt(trimmed, 10);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return null;
};

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

const fetchRemoteDesignSettings = async (): Promise<RemoteDesignSettings | null> => {
  const response = await fetch(buildApiUrl('/api/design', { client_id: FRONTEND_CLIENT_ID }));
  if (!response.ok) {
    throw new Error(`Design sync failed with status ${response.status}`);
  }

  return response.json();
};

const fetchRemoteWelcomeDetails = async (): Promise<RemoteWelcomeDetails> => {
  const response = await fetch(buildApiUrl('/api/details', { client_id: FRONTEND_CLIENT_ID }));
  if (!response.ok) {
    throw new Error(`Wedding details sync failed with status ${response.status}`);
  }
  return response.json();
};

const fetchRemoteOverview = async (): Promise<RemoteOverview> => {
  const response = await fetch(buildApiUrl('/api/overview', { client_id: FRONTEND_CLIENT_ID }));
  if (!response.ok) {
    throw new Error(`Overview sync failed with status ${response.status}`);
  }
  return response.json();
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
      setWelcomeCopySource(null);
      resetFontSettings();

      try {
        const [remoteDesignResult, remoteDetailsResult, remoteOverviewResult] = await Promise.allSettled([
          fetchRemoteDesignSettings(),
          fetchRemoteWelcomeDetails(),
          fetchRemoteOverview()
        ]);
        if (isCancelled) return;

        const remoteDesign = remoteDesignResult.status === 'fulfilled' ? remoteDesignResult.value : null;
        const remoteDetails = remoteDetailsResult.status === 'fulfilled' ? remoteDetailsResult.value : null;
        const remoteOverview = remoteOverviewResult.status === 'fulfilled' ? remoteOverviewResult.value : null;
        const remoteWelcomeImage = normalizeRemoteImageUrl(remoteDesign?.front_image_url);
        const remoteCoupleImage = normalizeRemoteImageUrl(remoteDesign?.couple_image_url);
        const remoteBrideName = normalizeRemoteText(remoteDetails?.bride_name);
        const remoteGroomName = normalizeRemoteText(remoteDetails?.groom_name);
        const remoteStoryText = normalizeRemoteText(remoteDetails?.description);
        const remoteMeetYear = normalizeRemoteYear(remoteDetails?.meet_year);
        const remoteEngagedYear = normalizeRemoteYear(remoteDetails?.engaged_year);
        const brideName = remoteBrideName || DEFAULT_BRIDE_NAME;
        const groomName = remoteGroomName || DEFAULT_GROOM_NAME;

        data.couple.fullNames.partner1 = brideName;
        data.couple.fullNames.partner2 = groomName;
        data.couple.names = `${brideName} & ${groomName}`;
        data.couple.story.image = remoteCoupleImage || DEFAULT_COUPLE_IMAGE;
        data.couple.story.text = remoteStoryText || DEFAULT_STORY_TEXT;
        data.couple.story.metYear = remoteMeetYear ?? DEFAULT_MEET_YEAR;
        data.couple.story.engagedYear = remoteEngagedYear ?? DEFAULT_ENGAGED_YEAR;
        data.wedding.welcomeImage = remoteWelcomeImage || DEFAULT_WELCOME_IMAGE;
        applyRemoteFontSettings(remoteDesign);

        setWelcomeCopySource({
          welcome_text: remoteDesign?.welcome_text ?? null,
          loading_text: remoteDesign?.loading_text ?? null,
          bride_display_name: remoteDetails?.bride_display_name ?? null,
          groom_display_name: remoteDetails?.groom_display_name ?? null,
          event_date: remoteDetails?.event_date || remoteOverview?.event_date || null,
          wedding_venue: remoteDetails?.wedding_venue ?? null,
          wedding_address: remoteDetails?.wedding_address ?? null
        });

        if (!hasUrlOverrides()) {
          const remoteSelection = mapRemoteDesignToSelection(remoteDesign);
          if (remoteSelection) {
            setActiveVariants(remoteSelection);
            saveConfirmedSelection(remoteSelection);
            setCurrentScreen('welcome');
          }
        }
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
              disabled
              aria-hidden="true"
              tabIndex={-1}
              className="hidden absolute top-4 right-4 z-50 bg-black/30 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-black/50 transition-colors pointer-events-none opacity-0"
            >
              <span className="material-icons text-[12px]">palette</span>
              Change Design
            </button>
          </div>
        )}

        {currentScreen === 'loading' && (
          <div className="loading-font-scope h-full w-full">
            <LoadingVariant onFinished={handleLoadingFinished} variantId={activeVariants.loading} />
          </div>
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
