import { ShopThemeId } from '../components/ShopIllustration';

export type ColorwayId = 'platinum' | 'jade' | 'indigo' | 'terracotta';

export interface ThemeSpec {
  id: ColorwayId;
  label: string;
  shopTheme: ShopThemeId;
  outerShell: string;
  auroraLayer: string;
  cardSurface: string;
  stageSpotlight: string;
  handleBar: string;
  iconBtn: string;
  wordmarkPrimary: string;
  wordmarkGradient: string;
  verbActiveText: string;
  verbInactiveText: string;
  verbActiveBar: string;
  taglineMuted: string;
  taglineBold: string;
  smileLightStops: [string, string, string];
  smileDarkStops: [string, string, string];
  smileGlowLight: string;
  smileGlowDark: string;
  smileEchoLight: string;
  smileEchoDark: string;
  horizonHairline: string;
  blinkingAura: string;
  blinkingBeamOuter: string;
  blinkingBeamCore: string;
  footerText: string;
  focusRing: string;
}

const PLATINUM_SPEC: Omit<ThemeSpec, 'id' | 'label'> = {
  shopTheme: 'apparel',
  outerShell: 'bg-[#F7F8FC] text-[#202536]',
  auroraLayer: 'bg-transparent',
  cardSurface: 'bg-[#FFFFFF] lg:border-[#E6E9F0] lg:ring-0 lg:shadow-xs',
  stageSpotlight: 'bg-transparent',
  handleBar: 'bg-[#E6E9F0]',
  iconBtn: 'text-[#667085] hover:text-[#202536] hover:bg-[#E9EEFF]/70',
  wordmarkPrimary: 'text-[#0B132B]',
  wordmarkGradient: 'text-[#2563EB]',
  verbActiveText: 'text-[#2563EB]',
  verbInactiveText: 'text-[#667085] hover:text-[#202536]',
  verbActiveBar: 'bg-[#2563EB]',
  taglineMuted: 'text-[#667085]',
  taglineBold: 'text-[#202536]',
  smileLightStops: ['#0B132B', '#2563EB', '#3B82F6'],
  smileDarkStops: ['#0B132B', '#2563EB', '#3B82F6'],
  smileGlowLight: '#2563EB',
  smileGlowDark: '#2563EB',
  smileEchoLight: '#0B132B',
  smileEchoDark: '#0B132B',
  horizonHairline: 'via-[#E6E9F0]',
  blinkingAura: 'via-transparent',
  blinkingBeamOuter: 'via-[#2563EB]',
  blinkingBeamCore: 'from-[#0B132B] via-[#3B82F6] to-[#2563EB]',
  footerText: 'text-[#202536]',
  focusRing: 'focus-visible:ring-[#2563EB]',
};

export const COLORWAY_ORDER: ColorwayId[] = ['platinum', 'indigo', 'jade', 'terracotta'];

export const THEMES: Record<ColorwayId, ThemeSpec> = {
  platinum: {
    id: 'platinum',
    label: 'Platinum Indigo',
    ...PLATINUM_SPEC,
  },
  jade: {
    id: 'jade',
    label: 'Platinum Indigo',
    ...PLATINUM_SPEC,
  },
  indigo: {
    id: 'indigo',
    label: 'Platinum Indigo',
    ...PLATINUM_SPEC,
  },
  terracotta: {
    id: 'terracotta',
    label: 'Platinum Indigo',
    ...PLATINUM_SPEC,
  },
};
