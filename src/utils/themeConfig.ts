import { ShopThemeId } from '../components/ShopIllustration';

export type ColorwayId = 'jade' | 'indigo' | 'terracotta';

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

export const COLORWAY_ORDER: ColorwayId[] = ['jade', 'indigo', 'terracotta'];

export const THEMES: Record<ColorwayId, ThemeSpec> = {
  jade: {
    id: 'jade',
    label: 'Emerald Jade',
    shopTheme: 'grocery',
    outerShell: 'bg-[#F6F3EC] dark:bg-[#060D0A] text-[#0D1A15] dark:text-[#F2F6F4]',
    auroraLayer:
      'bg-[radial-gradient(ellipse_at_top,_rgba(5,150,105,0.14)_0%,_transparent_62%),radial-gradient(circle_at_82%_85%,_rgba(217,119,6,0.10)_0%,_transparent_52%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.22)_0%,_transparent_62%),radial-gradient(circle_at_82%_85%,_rgba(251,191,36,0.09)_0%,_transparent_52%)]',
    cardSurface:
      'bg-[#FFFDF9] dark:bg-[#0B1611] lg:border-stone-200/90 dark:lg:border-emerald-800/45 lg:ring-white/90 dark:lg:ring-emerald-400/15 lg:shadow-[0_36px_90px_-24px_rgba(6,78,59,0.18)] dark:lg:shadow-[0_36px_90px_-24px_rgba(0,0,0,0.82)]',
    stageSpotlight:
      'bg-[radial-gradient(circle_at_50%_58%,_rgba(16,185,129,0.08)_0%,_transparent_56%)] dark:bg-[radial-gradient(circle_at_50%_58%,_rgba(16,185,129,0.16)_0%,_transparent_56%)]',
    handleBar: 'bg-stone-300/80 dark:bg-emerald-900/75',
    iconBtn:
      'text-stone-600 dark:text-emerald-200/85 hover:text-[#0D1A15] dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-emerald-900/45',
    wordmarkPrimary: 'text-[#0D1A15] dark:text-[#F4F7F5]',
    wordmarkGradient:
      'bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-300',
    verbActiveText: 'text-emerald-700 dark:text-emerald-300',
    verbInactiveText: 'text-stone-700 dark:text-stone-300 hover:text-[#0D1A15] dark:hover:text-white',
    verbActiveBar:
      'bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 dark:from-emerald-400 dark:via-teal-300 dark:to-amber-400 shadow-[0_2px_10px_rgba(16,185,129,0.35)]',
    taglineMuted: 'text-stone-500 dark:text-stone-400',
    taglineBold: 'text-[#0D1A15] dark:text-[#F2F6F4]',
    smileLightStops: ['#047857', '#10B981', '#D97706'],
    smileDarkStops: ['#34D399', '#2DD4BF', '#FBBF24'],
    smileGlowLight: '#10B981',
    smileGlowDark: '#34D399',
    smileEchoLight: '#047857',
    smileEchoDark: '#34D399',
    horizonHairline: 'via-stone-300/80 dark:via-emerald-700/40',
    blinkingAura: 'via-emerald-400/55 dark:via-emerald-400/50',
    blinkingBeamOuter: 'via-emerald-600 dark:via-emerald-400',
    blinkingBeamCore: 'from-emerald-500 via-amber-400 to-emerald-500 dark:from-emerald-300 dark:via-amber-300 dark:to-emerald-300',
    footerText: 'text-stone-800 dark:text-stone-100',
    focusRing: 'focus-visible:ring-emerald-600',
  },
  indigo: {
    id: 'indigo',
    label: 'Royal Indigo',
    shopTheme: 'apparel',
    outerShell: 'bg-[#F2F4FA] dark:bg-[#070A14] text-[#0F1326] dark:text-[#F1F4FA]',
    auroraLayer:
      'bg-[radial-gradient(ellipse_at_top,_rgba(67,56,202,0.13)_0%,_transparent_62%),radial-gradient(circle_at_82%_85%,_rgba(217,119,6,0.09)_0%,_transparent_52%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.22)_0%,_transparent_62%),radial-gradient(circle_at_82%_85%,_rgba(251,191,36,0.09)_0%,_transparent_52%)]',
    cardSurface:
      'bg-[#FCFDFE] dark:bg-[#0D1222] lg:border-indigo-200/75 dark:lg:border-indigo-800/45 lg:ring-white/90 dark:lg:ring-indigo-400/15 lg:shadow-[0_36px_90px_-24px_rgba(30,27,75,0.18)] dark:lg:shadow-[0_36px_90px_-24px_rgba(0,0,0,0.82)]',
    stageSpotlight:
      'bg-[radial-gradient(circle_at_50%_58%,_rgba(79,70,229,0.08)_0%,_transparent_56%)] dark:bg-[radial-gradient(circle_at_50%_58%,_rgba(99,102,241,0.16)_0%,_transparent_56%)]',
    handleBar: 'bg-slate-300/80 dark:bg-indigo-900/75',
    iconBtn:
      'text-slate-600 dark:text-indigo-200/85 hover:text-[#0F1326] dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-indigo-900/45',
    wordmarkPrimary: 'text-[#0F1326] dark:text-[#F1F4FA]',
    wordmarkGradient:
      'bg-gradient-to-r from-indigo-700 via-blue-600 to-amber-600 dark:from-indigo-400 dark:via-sky-300 dark:to-amber-300',
    verbActiveText: 'text-indigo-700 dark:text-indigo-300',
    verbInactiveText: 'text-slate-600 dark:text-slate-300 hover:text-[#0F1326] dark:hover:text-white',
    verbActiveBar:
      'bg-gradient-to-r from-indigo-600 via-blue-500 to-amber-500 dark:from-indigo-400 dark:via-sky-300 dark:to-amber-400 shadow-[0_2px_10px_rgba(79,70,229,0.35)]',
    taglineMuted: 'text-slate-500 dark:text-slate-400',
    taglineBold: 'text-[#0F1326] dark:text-[#F1F4FA]',
    smileLightStops: ['#4338CA', '#2563EB', '#D97706'],
    smileDarkStops: ['#818CF8', '#38BDF8', '#FBBF24'],
    smileGlowLight: '#4F46E5',
    smileGlowDark: '#818CF8',
    smileEchoLight: '#4338CA',
    smileEchoDark: '#818CF8',
    horizonHairline: 'via-slate-300/80 dark:via-indigo-700/45',
    blinkingAura: 'via-indigo-400/55 dark:via-indigo-400/50',
    blinkingBeamOuter: 'via-indigo-600 dark:via-indigo-400',
    blinkingBeamCore: 'from-indigo-500 via-amber-400 to-indigo-500 dark:from-indigo-300 dark:via-amber-300 dark:to-indigo-300',
    footerText: 'text-slate-800 dark:text-slate-100',
    focusRing: 'focus-visible:ring-indigo-600',
  },
  terracotta: {
    id: 'terracotta',
    label: 'Heritage Terracotta',
    shopTheme: 'bakery',
    outerShell: 'bg-[#F8F3EE] dark:bg-[#100A07] text-[#1E130E] dark:text-[#F8F3EF]',
    auroraLayer:
      'bg-[radial-gradient(ellipse_at_top,_rgba(194,65,12,0.13)_0%,_transparent_62%),radial-gradient(circle_at_82%_85%,_rgba(13,148,136,0.09)_0%,_transparent_52%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(234,88,12,0.2)_0%,_transparent_62%),radial-gradient(circle_at_82%_85%,_rgba(45,212,191,0.09)_0%,_transparent_52%)]',
    cardSurface:
      'bg-[#FFFDFB] dark:bg-[#19100C] lg:border-orange-200/75 dark:lg:border-orange-900/45 lg:ring-white/90 dark:lg:ring-amber-400/15 lg:shadow-[0_36px_90px_-24px_rgba(124,45,18,0.16)] dark:lg:shadow-[0_36px_90px_-24px_rgba(0,0,0,0.82)]',
    stageSpotlight:
      'bg-[radial-gradient(circle_at_50%_58%,_rgba(217,119,6,0.08)_0%,_transparent_56%)] dark:bg-[radial-gradient(circle_at_50%_58%,_rgba(245,158,11,0.15)_0%,_transparent_56%)]',
    handleBar: 'bg-stone-300/80 dark:bg-orange-900/70',
    iconBtn:
      'text-stone-600 dark:text-amber-200/85 hover:text-[#1E130E] dark:hover:text-white hover:bg-orange-100/70 dark:hover:bg-orange-950/60',
    wordmarkPrimary: 'text-[#1E130E] dark:text-[#F8F3EF]',
    wordmarkGradient:
      'bg-gradient-to-r from-orange-700 via-amber-600 to-teal-700 dark:from-orange-400 dark:via-amber-300 dark:to-teal-300',
    verbActiveText: 'text-orange-700 dark:text-amber-300',
    verbInactiveText: 'text-stone-700 dark:text-stone-300 hover:text-[#1E130E] dark:hover:text-white',
    verbActiveBar:
      'bg-gradient-to-r from-orange-600 via-amber-500 to-teal-600 dark:from-orange-400 dark:via-amber-300 dark:to-teal-400 shadow-[0_2px_10px_rgba(217,119,6,0.35)]',
    taglineMuted: 'text-stone-500 dark:text-stone-400',
    taglineBold: 'text-[#1E130E] dark:text-[#F8F3EF]',
    smileLightStops: ['#C2410C', '#D97706', '#0D9488'],
    smileDarkStops: ['#FB923C', '#FBBF24', '#2DD4BF'],
    smileGlowLight: '#D97706',
    smileGlowDark: '#F59E0B',
    smileEchoLight: '#C2410C',
    smileEchoDark: '#FB923C',
    horizonHairline: 'via-stone-300/80 dark:via-orange-800/45',
    blinkingAura: 'via-amber-400/55 dark:via-amber-400/50',
    blinkingBeamOuter: 'via-orange-600 dark:via-amber-400',
    blinkingBeamCore: 'from-orange-500 via-amber-300 to-teal-500 dark:from-orange-300 dark:via-amber-200 dark:to-teal-300',
    footerText: 'text-stone-800 dark:text-stone-100',
    focusRing: 'focus-visible:ring-orange-600',
  },
};
