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
import { WishlistItem } from './types';

export type ScreenState = 'selector' | 'welcome' | 'loading' | 'dashboard';

const STORAGE_KEY = 'weddingDesignSelection';
const URL_OVERRIDE_KEYS = ['welcome', 'loading', 'dashboard'] as const;
const VISIBLE_SECTION_IDS = ['overview', 'timeline', 'banquet', 'gift', 'rsvp', 'calendar'] as const;
const VISIBLE_SECTION_ID_SET = new Set<string>(VISIBLE_SECTION_IDS);
const DEFAULT_VISIBLE_SECTIONS: VisibleSectionId[] = ['overview', 'timeline'];

type SavedSelection = SyncedDesignSelection;
type VisibleSectionId = typeof VISIBLE_SECTION_IDS[number];
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
type RemoteTimelineEvent = {
  id?: string | null;
  time?: string | null;
  title?: string | null;
  location?: string | null;
  icon?: string | null;
  description?: string | null;
  category?: string | null;
};
type RemoteTimeline = RemoteTimelineEvent[] | null;
type RemoteGiftRequest = {
  id?: string | null;
  name?: string | null;
  price?: number | string | null;
  status?: string | null;
  category?: string | null;
  imageUrl?: string | null;
  sourceUrl?: string | null;
  currency?: string | null;
};
type RemoteGiftRequests = RemoteGiftRequest[] | null;

const DEFAULT_BRIDE_NAME = data.couple.fullNames.partner1;
const DEFAULT_GROOM_NAME = data.couple.fullNames.partner2;
const DEFAULT_WELCOME_IMAGE = data.wedding.welcomeImage;
const DEFAULT_DASHBOARD_IMAGE = data.wedding.venue.image;
const DEFAULT_COUPLE_IMAGE = data.couple.story.image;
const DEFAULT_STORY_TEXT = data.couple.story.text;
const DEFAULT_MEET_YEAR = data.couple.story.metYear;
const DEFAULT_ENGAGED_YEAR = data.couple.story.engagedYear;
const DEFAULT_WEDDING_DATE = data.wedding.date;
const DEFAULT_WEDDING_DATE_STRING = data.wedding.dateString;
const DEFAULT_TIMELINE = data.timeline.map((event) => ({
  ...event,
  details: event.details?.map((detail) => ({ ...detail }))
}));
const DEFAULT_WISHLIST_IMAGE = 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop';

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

const normalizeRemoteNumber = (value: unknown): number => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value.trim());
    if (!Number.isNaN(parsed) && Number.isFinite(parsed)) return parsed;
  }
  return 0;
};

const normalizeRemoteCurrency = (value: unknown): string => {
  if (typeof value !== 'string') return 'USD';
  const trimmed = value.trim().toUpperCase();
  if (!trimmed || trimmed === 'null' || trimmed === 'undefined') return 'USD';
  return /^[A-Z]{3}$/.test(trimmed) ? trimmed : 'USD';
};

const normalizeRemoteEventDate = (value: unknown): string => {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (!trimmed || trimmed === 'null' || trimmed === 'undefined') return '';
  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) return '';
  return trimmed;
};

const formatEventDateLabel = (value: string): string => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return DEFAULT_WEDDING_DATE_STRING;
  return parsed.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

const toTimelineSortKey = (raw: string): number => {
  const match = raw.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return Number.MAX_SAFE_INTEGER;
  const hourRaw = Number.parseInt(match[1], 10);
  const minute = Number.parseInt(match[2], 10);
  if (Number.isNaN(hourRaw) || Number.isNaN(minute)) return Number.MAX_SAFE_INTEGER;
  const meridiem = match[3].toUpperCase();
  const hour24 = (hourRaw % 12) + (meridiem === 'PM' ? 12 : 0);
  return hour24 * 60 + minute;
};

const withTimelineLastFlag = (events: typeof data.timeline): typeof data.timeline =>
  events.map((event, index) => ({
    ...event,
    isLast: index === events.length - 1
  }));

const normalizeVisibleSections = (value: unknown): VisibleSectionId[] => {
  const normalized = Array.isArray(value)
    ? value
      .map((entry) => (typeof entry === 'string' ? entry.trim().toLowerCase() : ''))
      .filter((entry): entry is VisibleSectionId => VISIBLE_SECTION_ID_SET.has(entry))
    : [];

  return Array.from(new Set<VisibleSectionId>([...DEFAULT_VISIBLE_SECTIONS, ...normalized]));
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

const fetchRemoteTimeline = async (): Promise<RemoteTimeline> => {
  const response = await fetch(buildApiUrl('/api/timeline', { client_id: FRONTEND_CLIENT_ID }));
  if (!response.ok) {
    throw new Error(`Timeline sync failed with status ${response.status}`);
  }
  return response.json();
};

const fetchRemoteGiftRequests = async (): Promise<RemoteGiftRequests> => {
  const response = await fetch(buildApiUrl('/api/gift-requests', { client_id: FRONTEND_CLIENT_ID }));
  if (!response.ok) {
    throw new Error(`Gift requests sync failed with status ${response.status}`);
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
  const [visibleSections, setVisibleSections] = useState<VisibleSectionId[]>(DEFAULT_VISIBLE_SECTIONS);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    let isCancelled = false;

    const syncDesignFromBackend = async () => {
      setWelcomeCopySource(null);
      resetFontSettings();
      if (!FRONTEND_CLIENT_ID) {
        console.warn('Invitation data sync skipped: missing client_id (set VITE_CLIENT_ID or pass ?client_id=...)');
        setVisibleSections(DEFAULT_VISIBLE_SECTIONS);
        setWishlistItems([]);
        data.timeline = withTimelineLastFlag(
          DEFAULT_TIMELINE.map((event) => ({
            ...event,
            details: event.details?.map((detail) => ({ ...detail }))
          }))
        );
        setIsSyncLoading(false);
        return;
      }

      try {
        const [remoteDesignResult, remoteDetailsResult, remoteOverviewResult, remoteTimelineResult, remoteGiftRequestsResult] = await Promise.allSettled([
          fetchRemoteDesignSettings(),
          fetchRemoteWelcomeDetails(),
          fetchRemoteOverview(),
          fetchRemoteTimeline(),
          fetchRemoteGiftRequests()
        ]);
        if (isCancelled) return;

        const remoteDesign = remoteDesignResult.status === 'fulfilled' ? remoteDesignResult.value : null;
        const remoteDetails = remoteDetailsResult.status === 'fulfilled' ? remoteDetailsResult.value : null;
        const remoteOverview = remoteOverviewResult.status === 'fulfilled' ? remoteOverviewResult.value : null;
        const remoteTimeline = remoteTimelineResult.status === 'fulfilled' ? remoteTimelineResult.value : null;
        const remoteGiftRequests = remoteGiftRequestsResult.status === 'fulfilled' ? remoteGiftRequestsResult.value : null;
        setVisibleSections(normalizeVisibleSections(remoteDesign?.visible_sections));
        if (Array.isArray(remoteGiftRequests)) {
          const mappedWishlistItems = remoteGiftRequests.map((gift, index) => {
            const statusValue = normalizeRemoteText(gift.status).toLowerCase();
            return {
              id: normalizeRemoteText(gift.id) || `gift-${index + 1}`,
              title: normalizeRemoteText(gift.name) || `Gift Item ${index + 1}`,
              category: normalizeRemoteText(gift.category) || 'Others',
              price: normalizeRemoteNumber(gift.price),
              image: normalizeRemoteImageUrl(gift.imageUrl) || DEFAULT_WISHLIST_IMAGE,
              purchased: ['purchased', 'claimed', 'fulfilled', 'completed', 'complete'].includes(statusValue),
              sourceUrl: normalizeRemoteText(gift.sourceUrl) || undefined,
              currency: normalizeRemoteCurrency(gift.currency)
            } as WishlistItem;
          });
          setWishlistItems(mappedWishlistItems);
        } else {
          setWishlistItems([]);
        }
        const remoteWelcomeImage = normalizeRemoteImageUrl(remoteDesign?.front_image_url);
        const remoteDashboardImage = normalizeRemoteImageUrl(remoteDesign?.dashboard_image_url);
        const remoteCoupleImage = normalizeRemoteImageUrl(remoteDesign?.couple_image_url);
        const remoteBrideName = normalizeRemoteText(remoteDetails?.bride_name);
        const remoteGroomName = normalizeRemoteText(remoteDetails?.groom_name);
        const remoteBrideDisplayName = normalizeRemoteText(remoteDetails?.bride_display_name);
        const remoteGroomDisplayName = normalizeRemoteText(remoteDetails?.groom_display_name);
        const remoteStoryText = normalizeRemoteText(remoteDetails?.description);
        const remoteMeetYear = normalizeRemoteYear(remoteDetails?.meet_year);
        const remoteEngagedYear = normalizeRemoteYear(remoteDetails?.engaged_year);
        const remoteEventDate = normalizeRemoteEventDate(remoteDetails?.event_date || remoteOverview?.event_date);
        const brideName = remoteBrideName || DEFAULT_BRIDE_NAME;
        const groomName = remoteGroomName || DEFAULT_GROOM_NAME;
        const brideDisplayName = remoteBrideDisplayName || brideName;
        const groomDisplayName = remoteGroomDisplayName || groomName;

        data.couple.fullNames.partner1 = brideName;
        data.couple.fullNames.partner2 = groomName;
        data.couple.names = `${brideDisplayName} & ${groomDisplayName}`;
        data.couple.story.image = remoteCoupleImage || DEFAULT_COUPLE_IMAGE;
        data.couple.story.text = remoteStoryText || DEFAULT_STORY_TEXT;
        data.couple.story.metYear = remoteMeetYear ?? DEFAULT_MEET_YEAR;
        data.couple.story.engagedYear = remoteEngagedYear ?? DEFAULT_ENGAGED_YEAR;
        data.wedding.date = remoteEventDate || DEFAULT_WEDDING_DATE;
        data.wedding.dateString = remoteEventDate
          ? formatEventDateLabel(remoteEventDate)
          : DEFAULT_WEDDING_DATE_STRING;
        data.wedding.welcomeImage = remoteWelcomeImage || DEFAULT_WELCOME_IMAGE;
        data.wedding.venue.image = remoteDashboardImage || DEFAULT_DASHBOARD_IMAGE;
        if (Array.isArray(remoteTimeline)) {
          const mappedTimeline = remoteTimeline
            .map((event) => ({
              time: normalizeRemoteText(event.time) || 'TBD',
              title: normalizeRemoteText(event.title) || 'Timeline Event',
              icon: normalizeRemoteText(event.icon) || 'event',
              location: normalizeRemoteText(event.location) || 'Location TBA',
              address: '',
              description: normalizeRemoteText(event.description)
            }))
            .sort((a, b) => toTimelineSortKey(a.time) - toTimelineSortKey(b.time));

          data.timeline = withTimelineLastFlag(mappedTimeline);
        } else {
          data.timeline = withTimelineLastFlag(
            DEFAULT_TIMELINE.map((event) => ({
              ...event,
              details: event.details?.map((detail) => ({ ...detail }))
            }))
          );
        }
        applyRemoteFontSettings(remoteDesign);

        setWelcomeCopySource({
          welcome_text: remoteDesign?.welcome_text ?? null,
          loading_text: remoteDesign?.loading_text ?? null,
          bride_display_name: remoteDetails?.bride_display_name ?? null,
          groom_display_name: remoteDetails?.groom_display_name ?? null,
          event_date: remoteEventDate || null,
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
          <DashboardVariant
            variantId={activeVariants.dashboard}
            visibleSections={visibleSections}
            wishlistItems={wishlistItems}
          />
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
