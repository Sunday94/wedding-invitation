
export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface Story {
  title: string;
  text: string;
  image: string;
  metYear: number;
  engagedYear: number;
}

export interface Couple {
  names: string;
  initials: string;
  fullNames: {
    partner1: string;
    partner2: string;
  };
  story: Story;
}

export interface Venue {
  name: string;
  address: string;
  location: string;
  image: string;
}

export interface Attire {
  title: string;
  description: string;
}

export interface Wedding {
  date: string;
  dateString: string;
  venue: Venue;
  welcomeImage: string;
  calendarDescription: string;
  attire: Attire;
}

export interface TimelineDetail {
  label: string;
  value: string;
  subValue: string;
  icon: string;
}

export interface TimelineEvent {
  time: string;
  title: string;
  icon: string;
  location: string;
  address: string;
  image?: string;
  details?: TimelineDetail[];
  isLast?: boolean;
}

export interface DietaryOption {
  id: string;
  label: string;
  icon: string;
}

export interface Dish {
  id: number;
  name: string;
  category: string;
  description: string;
  dietary: string[];
  isChefsChoice: boolean;
}

export interface BanquetData {
  categories: string[];
  dietaryOptions: DietaryOption[];
  dishes: Dish[];
}

export interface DummyData {
  couple: Couple;
  wedding: Wedding;
  timeline: TimelineEvent[];
  banquet: BanquetData;
}

// ── Design Selector System ────────────────────────────────────────

export interface DesignVariant {
  id: number;
  label: string;
  accent: string;       // hex colour for preview swatch
  description: string;  // short style summary
}

export interface DesignsData {
  welcome: DesignVariant[];
  loading: DesignVariant[];
  dashboard: DesignVariant[];
}

export interface DesignSelection {
  welcome: number;   // variant id
  showWelcomeImage?: boolean; // Whether to show the background image (for variants 8-12)
  loading: number;   // variant id
  dashboard: number; // variant id
}

export interface DesignContextValue {
  selection: Partial<DesignSelection>;
  setSlot: (slot: keyof DesignSelection, value: number | boolean) => void;
  isComplete: boolean;
  confirm: () => void;
  clearSelection: () => void;
}
