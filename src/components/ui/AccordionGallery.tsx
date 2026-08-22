import {
  useRef,
  useEffect,
  useState,
  useCallback,
  CSSProperties,
  KeyboardEvent,
  MouseEvent
} from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface AccordionGalleryItem {
  image: string;
  label?: string;
  link?: string;
  alt?: string;
}

export interface AccordionGalleryProps {
  items?: AccordionGalleryItem[];
  defaultIndex?: number;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  height?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  orientation?: 'horizontal' | 'vertical';
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  trigger?: 'hover' | 'click';
  showLabels?: boolean;
  grayscale?: boolean;
  className?: string;
  /** Breakpoint (px) below which the mobile snap-carousel is used instead of the accordion. */
  mobileBreakpoint?: number;
  /** Aspect ratio (CSS `aspect-ratio` value) used by the mobile carousel cards. Defaults to landscape 16:9. */
  mobileAspectRatio?: string;
}

const DEFAULT_ITEMS: AccordionGalleryItem[] = [
  { image: 'https://picsum.photos/id/1015/900/1200', label: 'Canyon', link: '#' },
  { image: 'https://picsum.photos/id/1018/900/1200', label: 'Ridgeline', link: '#' },
  { image: 'https://picsum.photos/id/1039/900/1200', label: 'Falls', link: '#' },
  { image: 'https://picsum.photos/id/1043/900/1200', label: 'Harbour', link: '#' },
  { image: 'https://picsum.photos/id/1044/900/1200', label: 'Skyline', link: '#' }
];

const AccordionGallery = ({
  items = DEFAULT_ITEMS,
  defaultIndex = 2,
  accentColor = '#ffffff',
  overlayColor = '#060010',
  textColor = '#ffffff',
  height = 460,
  gap = 10,
  radius = 16,
  expandRatio = 0.52,
  orientation = 'horizontal',
  duration = 0.6,
  ease = 'power3.out',
  parallax = 0.5,
  tilt = 8,
  stagger = 0.06,
  trigger = 'hover',
  showLabels = true,
  grayscale = true,
  className = '',
  mobileBreakpoint = 640,
  mobileAspectRatio = '16 / 9'
}: AccordionGalleryProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLElement | null)[]>([]);
  const barRefs = useRef<(HTMLElement | null)[]>([]);
  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(320);

  // ---- Mobile carousel refs/state ----
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const mobileCardRefs = useRef<(HTMLElement | null)[]>([]);
  const mobileRafRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const vertical = orientation === 'vertical';
  const count = items.length;
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), count - 1));

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const overlayBg = `linear-gradient(180deg, transparent 45%, color-mix(in srgb, ${overlayColor} 78%, transparent) 100%), color-mix(in srgb, ${overlayColor} calc(var(--ag-dim, 0.35) * 100%), transparent)`;

  // Detect mobile viewport
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [mobileBreakpoint]);

  const applyLayout = useCallback(
    (animate: boolean) => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
      const mediaSize = mediaSizeRef.current;

      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === active;
        const media = mediaRefs.current[i];
        const bar = barRefs.current[i];
        const text = textRefs.current[i];

        const rot = isActive ? 0 : i < active ? tilt : -tilt;
        const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot };

        tl.to(panel, { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease }, 0);

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i));
          const shift = drift * parallax * mediaSize * 0.06;
          const gray = grayscale ? (isActive ? 0 : 1) : 0;
          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              '--ag-gray': gray,
              '--ag-dim': isActive ? 0 : 0.35,
              duration: dur,
              ease
            },
            0
          );
        }

        if (showLabels && bar && text) {
          if (isActive) {
            tl.to([bar, text], { opacity: 1, x: 0, duration: dur, ease, stagger: prefersReduced ? 0 : stagger }, 0);
          } else {
            tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease }, 0);
          }
        }
      });

      tlRef.current = tl;
    },
    [
      active,
      count,
      expandRatio,
      duration,
      ease,
      vertical,
      tilt,
      parallax,
      grayscale,
      showLabels,
      stagger,
      prefersReduced
    ]
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el || isMobile) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);
      mediaSizeRef.current = size;
      el.style.setProperty('--ag-media-size', `${size}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [applyLayout, gap, count, expandRatio, vertical, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout, isMobile]);

  useEffect(
    () => () => {
      tlRef.current?.kill();
    },
    []
  );

  const handleEnter = (i: number) => {
    if (trigger === 'hover') setActive(i);
  };

  const handleClick = (i: number, e: MouseEvent) => {
    if (i !== active) {
      e.preventDefault();
      setActive(i);
    }
  };

  const handleKeyDown = (i: number, e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i + 1) % count);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i - 1 + count) % count);
    }
  };

  // ---- Mobile: track which card sits closest to the container center while swiping ----
  const handleMobileScroll = useCallback(() => {
    if (mobileRafRef.current) return;
    mobileRafRef.current = requestAnimationFrame(() => {
      mobileRafRef.current = null;
      const container = mobileScrollRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;

      let closest = 0;
      let minDist = Infinity;
      mobileCardRefs.current.forEach((card, i) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(cardCenter - centerX);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActive(prev => (prev === closest ? prev : closest));
    });
  }, []);

  const scrollToIndex = (i: number) => {
    const clamped = Math.min(Math.max(i, 0), count - 1);
    setActive(clamped);
    mobileCardRefs.current[clamped]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  const goPrev = () => scrollToIndex(active - 1);
  const goNext = () => scrollToIndex(active + 1);

  useEffect(() => {
    if (!isMobile) return;
    // Center the default-active card on first mobile mount, without animating the page.
    const raf = requestAnimationFrame(() => {
      mobileCardRefs.current[active]?.scrollIntoView({ behavior: 'auto', inline: 'center', block: 'nearest' });
    });
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  // =====================================================================
  // MOBILE — premium snap-scroll carousel
  // =====================================================================
  if (isMobile) {
    return (
      <div className={`w-full ${className}`}>
        <div className="relative">
          <div
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden"
            style={{
              gap: `${gap}px`,
              paddingInline: '7%',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            role="list"
            aria-label="Image carousel gallery"
          >
            {items.map((item, i) => {
              const isActive = i === active;
              const Tag = (item.link ? 'a' : 'div') as 'a';
              return (
                <Tag
                  key={i}
                  ref={(el: HTMLElement | null) => {
                    mobileCardRefs.current[i] = el;
                  }}
                  href={item.link || undefined}
                  onClick={e => {
                    if (!isActive) {
                      e.preventDefault();
                      scrollToIndex(i);
                    }
                  }}
                  className="group relative block w-[86%] shrink-0 snap-center overflow-hidden bg-[#0a0713] no-underline outline-none transition-transform duration-500 ease-out"
                  style={{
                    aspectRatio: mobileAspectRatio,
                    borderRadius: `${radius}px`,
                    transform: isActive ? 'scale(1)' : 'scale(0.94)',
                    boxShadow: isActive
                      ? '0 20px 45px -20px rgba(0,0,0,0.75)'
                      : '0 10px 30px -18px rgba(0,0,0,0.6)'
                  }}
                  role="listitem"
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={item.label}
                >
                  <span className="absolute inset-0 overflow-hidden [border-radius:inherit]">
                    <img
                      src={item.image}
                      alt={item.alt || item.label || ''}
                      draggable={false}
                      className="block h-full w-full select-none object-cover transition-all duration-500 ease-out [-webkit-user-drag:none]"
                      style={{
                        filter: grayscale && !isActive ? 'grayscale(1)' : 'grayscale(0)',
                        transform: isActive ? 'scale(1)' : 'scale(1.08)'
                      }}
                    />
                    <span
                      className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                      style={{
                        background: overlayBg,
                        opacity: isActive ? 0.55 : 0.8
                      }}
                      aria-hidden="true"
                    />
                  </span>
                  {showLabels && (
                    <span
                      className="pointer-events-none absolute bottom-4 left-4 right-4 z-[2] flex items-center gap-3 transition-all duration-500"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateY(0)' : 'translateY(6px)'
                      }}
                      aria-hidden="true"
                    >
                      <span
                        className="h-[22px] w-[3px] flex-none rounded-[3px]"
                        style={{
                          background: accentColor,
                          boxShadow: `0 0 12px color-mix(in srgb, ${accentColor} 60%, transparent)`
                        }}
                      />
                      <span
                        className="overflow-hidden text-ellipsis whitespace-nowrap text-[1rem] font-semibold tracking-[0.01em] [text-shadow:0_2px_14px_rgba(0,0,0,0.55)]"
                        style={{ color: textColor }}
                      >
                        {item.label}
                      </span>
                    </span>
                  )}
                </Tag>
              );
            })}
          </div>

          {/* Prev / Next arrows */}
          <button
            type="button"
            onClick={goPrev}
            disabled={active === 0}
            aria-label="Projeto anterior"
            className="absolute left-1 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-sm transition-all duration-300 disabled:pointer-events-none disabled:opacity-0"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={active === count - 1}
            aria-label="Próximo projeto"
            className="absolute right-1 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-sm transition-all duration-300 disabled:pointer-events-none disabled:opacity-0"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Ver ${item.label || `item ${i + 1}`}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === active ? '22px' : '6px',
                height: '6px',
                background:
                  i === active ? accentColor : `color-mix(in srgb, ${accentColor} 30%, transparent)`
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // =====================================================================
  // DESKTOP / TABLET — original hover accordion
  // =====================================================================
  return (
    <div
      ref={rootRef}
      className={`flex ${vertical ? 'flex-col' : 'flex-row'} w-full max-w-full [perspective:1400px] ${className}`}
      style={{ gap: `${gap}px`, height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px` }}
      role="list"
      aria-label="Image accordion gallery"
    >
      {items.map((item, i) => {
        const isActive = i === active;
        const Tag = (item.link ? 'a' : 'div') as 'a';
        return (
          <Tag
            key={i}
            ref={(el: HTMLElement | null) => {
              panelRefs.current[i] = el;
            }}
            className="group relative block min-w-0 min-h-0 flex-[1_1_0] cursor-pointer overflow-hidden bg-[#0a0713] no-underline outline-none [transform-style:preserve-3d] [transform-origin:center] [box-shadow:0_10px_30px_-18px_rgba(0,0,0,0.8)] focus-visible:[box-shadow:0_0_0_2px_var(--ag-accent),0_10px_30px_-18px_rgba(0,0,0,0.8)]"
            style={
              {
                borderRadius: `${radius}px`,
                '--ag-accent': accentColor,
                willChange: 'flex-grow, transform'
              } as CSSProperties
            }
            href={item.link || undefined}
            onClick={e => handleClick(i, e)}
            onMouseEnter={() => handleEnter(i)}
            onFocus={() => setActive(i)}
            onKeyDown={e => handleKeyDown(i, e)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? 'true' : undefined}
            aria-label={item.label}
          >
            <span className="absolute inset-0 overflow-hidden [border-radius:inherit]">
              <span
                ref={(el: HTMLElement | null) => {
                  mediaRefs.current[i] = el;
                }}
                className="absolute top-1/2 left-1/2 [filter:grayscale(var(--ag-gray,1))]"
                style={{
                  width: vertical ? '100%' : 'var(--ag-media-size, 320px)',
                  height: vertical ? 'var(--ag-media-size, 320px)' : '100%',
                  willChange: 'transform, filter'
                }}
              >
                <img
                  src={item.image}
                  alt={item.alt || item.label || ''}
                  draggable={false}
                  className="block h-full w-full select-none object-cover [-webkit-user-drag:none]"
                />
              </span>
              <span
                className="pointer-events-none absolute inset-0"
                style={{ background: overlayBg }}
                aria-hidden="true"
              />
            </span>
            {showLabels && (
              <span
                className="pointer-events-none absolute bottom-5 left-5 right-5 z-[2] flex items-center gap-3"
                aria-hidden="true"
              >
                <span
                  ref={(el: HTMLElement | null) => {
                    barRefs.current[i] = el;
                  }}
                  className="h-[26px] w-[3px] flex-none rounded-[3px] opacity-0"
                  style={{
                    background: accentColor,
                    boxShadow: `0 0 12px color-mix(in srgb, ${accentColor} 60%, transparent)`
                  }}
                />
                <span
                  ref={(el: HTMLElement | null) => {
                    textRefs.current[i] = el;
                  }}
                  className="overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(1rem,1.4vw,1.4rem)] font-semibold tracking-[0.01em] opacity-0 [text-shadow:0_2px_14px_rgba(0,0,0,0.55)]"
                  style={{ color: textColor }}
                >
                  {item.label}
                </span>
              </span>
            )}
          </Tag>
        );
      })}
    </div>
  );
};

export default AccordionGallery;