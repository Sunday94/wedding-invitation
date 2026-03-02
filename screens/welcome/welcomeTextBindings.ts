import { data } from '../../data';

interface SourceMap {
    [key: string]: unknown;
}

export interface WelcomeCopy {
    welcomeText: string;
    brideDisplayName: string;
    groomDisplayName: string;
    eventDate: string;
    weddingVenue: string;
    weddingAddress: string;
    invitationLabel: string;
}

const INVITATION_LABEL = 'Wedding Inviation';

const pickString = (value: unknown, fallback: string): string => {
    if (typeof value === 'string' && value.trim().length > 0) {
        return value;
    }
    return fallback;
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

    return {
        welcomeText: pickString(source.welcome_text, 'Together with their families'),
        brideDisplayName: pickString(source.bride_display_name, pickString(fullNames.partner1, '')),
        groomDisplayName: pickString(source.groom_display_name, pickString(fullNames.partner2, '')),
        eventDate: pickString(source.event_date, pickString(wedding.dateString, '')),
        weddingVenue: pickString(source.wedding_venue, pickString(venue.name, '')),
        weddingAddress: pickString(source.wedding_address, pickString(venue.location, '')),
        invitationLabel: INVITATION_LABEL
    };
};
