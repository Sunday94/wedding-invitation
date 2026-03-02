import fontOptions from '../data/fontOptions.json';
import { RemoteDesignSettings } from './designSync';

type FontFallback = 'cursive' | 'serif' | 'sans-serif';

interface FontOption {
    id: string;
    family: string;
    fallback: FontFallback;
    googleFamily: string;
}

interface FontGroup {
    defaultId: string;
    options: FontOption[];
}

interface FontCatalog {
    brideGroom: FontGroup;
    loading: FontGroup;
    body: FontGroup;
}

const catalog = fontOptions as FontCatalog;
const fontGroups: FontGroup[] = [catalog.brideGroom, catalog.loading, catalog.body];
const allOptions = fontGroups.flatMap((group) => group.options);
const byId = new Map(allOptions.map((option) => [option.id, option]));

const GOOGLE_FONTS_LINK_ID = 'wedding-dynamic-fonts';

const getFontOption = (id: string | null | undefined, fallbackId: string): FontOption => {
    if (id && byId.has(id)) return byId.get(id)!;
    return byId.get(fallbackId) || allOptions[0];
};

const buildGoogleFontsHref = (googleFamilies: string[]): string => {
    const families = Array.from(new Set(googleFamilies));
    return `https://fonts.googleapis.com/css2?${families.map((family) => `family=${family}`).join('&')}&display=swap`;
};

const setCssFontVars = (bride: FontOption, loading: FontOption, body: FontOption): void => {
    const root = document.documentElement;
    root.style.setProperty('--wedding-font-bride-groom', `'${bride.family}'`);
    root.style.setProperty('--wedding-font-loading', `'${loading.family}'`);
    root.style.setProperty('--wedding-font-body', `'${body.family}'`);
};

const ensureGoogleFontsLoaded = (fonts: FontOption[]): void => {
    const href = buildGoogleFontsHref(fonts.map((font) => font.googleFamily));
    const existing = document.getElementById(GOOGLE_FONTS_LINK_ID) as HTMLLinkElement | null;
    if (existing) {
        if (existing.href !== href) existing.href = href;
        return;
    }

    const link = document.createElement('link');
    link.id = GOOGLE_FONTS_LINK_ID;
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
};

export const applyRemoteFontSettings = (remoteDesign: RemoteDesignSettings | null): void => {
    const bride = getFontOption(remoteDesign?.bride_groom_font, catalog.brideGroom.defaultId);
    const loading = getFontOption(remoteDesign?.loading_font, catalog.loading.defaultId);
    const body = getFontOption(remoteDesign?.body_font, catalog.body.defaultId);

    ensureGoogleFontsLoaded([bride, loading, body]);
    setCssFontVars(bride, loading, body);
};

export const resetFontSettings = (): void => {
    applyRemoteFontSettings(null);
};
