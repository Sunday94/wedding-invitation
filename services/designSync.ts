export interface RemoteDesignSettings {
    front_design_id?: string | null;
    loading_design_id?: string | null;
    dashboard_design_id?: string | null;
}

export interface SyncedDesignSelection {
    welcome: number;
    loading: number;
    dashboard: number;
    showWelcomeImage: boolean;
}

const parsePrefixedVariantId = (value: unknown, prefix: string): number | null => {
    if (typeof value !== 'string') return null;
    const match = value.match(new RegExp(`^${prefix}-(\\d+)$`, 'i'));
    if (!match) return null;
    const parsed = Number.parseInt(match[1], 10);
    return Number.isNaN(parsed) ? null : parsed;
};

export const mapRemoteDesignToSelection = (
    remote: RemoteDesignSettings | null
): SyncedDesignSelection | null => {
    if (!remote) return null;

    const welcome = parsePrefixedVariantId(remote.front_design_id, 'fp');
    const loading = parsePrefixedVariantId(remote.loading_design_id, 'ld');
    const dashboard = parsePrefixedVariantId(remote.dashboard_design_id, 'mp');

    if (!welcome || !loading || !dashboard) return null;

    return {
        welcome,
        loading,
        dashboard,
        showWelcomeImage: true
    };
};
