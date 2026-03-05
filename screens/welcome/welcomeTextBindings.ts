import { data } from '../../data';

interface SourceMap {
    [key: string]: unknown;
}

interface RuntimeWelcomeSource {
    welcome_text?: string | null;
    loading_text?: string | null;
    bride_display_name?: string | null;
    groom_display_name?: string | null;
    event_date?: string | null;
    wedding_venue?: string | null;
    wedding_address?: string | null;
}

export interface WelcomeCopy {
    welcomeText: string;
    loadingText: string;
    brideDisplayName: string;
    groomDisplayName: string;
    eventDate: string;
    weddingVenue: string;
    weddingAddress: string;
    invitationLabel: string;
}

const INVITATION_LABEL = 'Wedding Inviation';
let runtimeWelcomeSource: RuntimeWelcomeSource = {};

const pickString = (value: unknown, fallback: string): string => {
    if (typeof value === 'string' && value.trim().length > 0) {
        return value;
    }
    return fallback;
};

const formatEventDate = (value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) return trimmed;
    const parsed = new Date(trimmed);
    if (Number.isNaN(parsed.getTime())) return trimmed;
    return parsed.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
};

export const setWelcomeCopySource = (source?: RuntimeWelcomeSource | null): void => {
    runtimeWelcomeSource = source ?? {};
};

export const splitDisplayName = (fullName: string): [string, string] => {
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return ['', ''];
    if (parts.length === 1) return [parts[0], ''];
    return [parts[0], parts.slice(1).join(' ')];
};

export const getWelcomeCopy = (): WelcomeCopy => {
    const source = data as unknown as SourceMap;
    const wedding = (source.wedding ?? {}) as SourceMap;
    const couple = (source.couple ?? {}) as SourceMap;
    const fullNames = (couple.fullNames ?? {}) as SourceMap;
    const venue = (wedding.venue ?? {}) as SourceMap;
    const eventDate = pickString(
        runtimeWelcomeSource.event_date,
        pickString(source.event_date, pickString(wedding.dateString, ''))
    );

    return {
        welcomeText: pickString(
            runtimeWelcomeSource.welcome_text,
            pickString(source.welcome_text, 'Together with their families')
        ),
        loadingText: pickString(
            runtimeWelcomeSource.loading_text,
            pickString(source.loading_text, 'Preparing our special day...')
        ),
        brideDisplayName: pickString(
            runtimeWelcomeSource.bride_display_name,
            pickString(source.bride_display_name, pickString(fullNames.partner1, ''))
        ),
        groomDisplayName: pickString(
            runtimeWelcomeSource.groom_display_name,
            pickString(source.groom_display_name, pickString(fullNames.partner2, ''))
        ),
        eventDate: formatEventDate(eventDate),
        weddingVenue: pickString(
            runtimeWelcomeSource.wedding_venue,
            pickString(source.wedding_venue, pickString(venue.name, ''))
        ),
        weddingAddress: pickString(
            runtimeWelcomeSource.wedding_address,
            pickString(source.wedding_address, pickString(venue.location, ''))
        ),
        invitationLabel: INVITATION_LABEL
    };
};
