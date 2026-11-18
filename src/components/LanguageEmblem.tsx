import { useId } from 'react';
import { LanguageCode } from '../utils/languageConfig';

interface LanguageEmblemProps {
  code: LanguageCode;
}

export function LanguageEmblem({ code }: LanguageEmblemProps) {
  const clipId = useId();

  if (code === 'en') {
    return (
      <svg
        data-testid="language-emblem-en"
        aria-hidden="true"
        viewBox="0 0 24 16"
        className="w-[22px] h-[15px] shrink-0 rounded-[3.5px] shadow-[0_1px_2px_rgba(15,23,42,0.12)]"
      >
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y="0" width="24" height="16" rx="3.5" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <rect width="24" height="16" fill="#012169" />
          <path d="M0 0 L24 16 M24 0 L0 16" stroke="#FFFFFF" strokeWidth="3.2" />
          <path d="M0 0 L24 16 M24 0 L0 16" stroke="#C8102E" strokeWidth="1.4" />
          <path d="M12 0 V16 M0 8 H24" stroke="#FFFFFF" strokeWidth="4.6" />
          <path d="M12 0 V16 M0 8 H24" stroke="#C8102E" strokeWidth="2.6" />
        </g>
        <rect
          x="0.5"
          y="0.5"
          width="23"
          height="15"
          rx="3"
          fill="none"
          stroke="rgba(15, 23, 42, 0.16)"
        />
      </svg>
    );
  }

  if (code === 'hi') {
    return (
      <svg
        data-testid="language-emblem-hi"
        aria-hidden="true"
        viewBox="0 0 24 16"
        className="w-[22px] h-[15px] shrink-0 rounded-[3.5px] shadow-[0_1px_2px_rgba(15,23,42,0.12)]"
      >
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y="0" width="24" height="16" rx="3.5" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <rect x="0" y="0" width="24" height="5.35" fill="#FF9933" />
          <rect x="0" y="5.35" width="24" height="5.3" fill="#FFFFFF" />
          <rect x="0" y="10.65" width="24" height="5.35" fill="#138808" />
          <circle cx="12" cy="8" r="2.05" fill="none" stroke="#0A2A66" strokeWidth="0.65" />
          <circle cx="12" cy="8" r="0.5" fill="#0A2A66" />
          <path
            d="M12 5.95 V10.05 M9.95 8 H14.05 M10.55 6.55 L13.45 9.45 M13.45 6.55 L10.55 9.45"
            stroke="#0A2A66"
            strokeWidth="0.45"
          />
        </g>
        <rect
          x="0.5"
          y="0.5"
          width="23"
          height="15"
          rx="3"
          fill="none"
          stroke="rgba(15, 23, 42, 0.16)"
        />
      </svg>
    );
  }

  // Gujarati: Gujarat Heritage Uttarayan Kite & Saffron-Emerald Emblem
  return (
    <svg
      data-testid="language-emblem-gu"
      aria-hidden="true"
      viewBox="0 0 24 16"
      className="w-[22px] h-[15px] shrink-0 rounded-[3.5px] shadow-[0_1px_2px_rgba(15,23,42,0.12)]"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width="24" height="16" rx="3.5" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width="24" height="16" fill="#FFF7E8" />
        {/* Warm festive sky corner accent */}
        <circle cx="19" cy="4" r="5" fill="#FDE68A" opacity="0.65" />
        {/* Faceted saffron & amber Patang (kite) */}
        <polygon points="12,2.1 17.4,7.4 12,12.2" fill="#EA580C" />
        <polygon points="12,2.1 6.6,7.4 12,12.2" fill="#F59E0B" />
        {/* Emerald tail ribbon */}
        <polygon points="12,12.1 9.9,14.7 14.1,14.7" fill="#047857" />
        {/* Crisp kite spars */}
        <path d="M12 2.4 V12 M7 7.4 Q12 5.6 17 7.4" fill="none" stroke="#FFFBEB" strokeWidth="0.7" />
      </g>
      <rect
        x="0.5"
        y="0.5"
        width="23"
        height="15"
        rx="3"
        fill="none"
        stroke="rgba(180, 83, 9, 0.28)"
      />
    </svg>
  );
}
