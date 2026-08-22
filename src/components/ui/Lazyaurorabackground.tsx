import { Suspense, lazy, useEffect, useRef, useState } from "react";

const AuroraBackground = lazy(() => import("./AuroraBackground"));

interface LazyAuroraProps {
  className?: string;
  colorStops?: [string, string, string];
  amplitude?: number;
  blend?: number;
  speed?: number;
  rootMargin?: string;
}

/**
 * Mesmo padrão do LazyHyperspeed: só carrega o AuroraBackground (e a lib
 * ogl junto) quando a seção se aproxima da viewport. Como a ogl é bem
 * mais leve que three.js, isso é mais sobre não bloquear o parse inicial
 * do que sobre economizar peso de download.
 */
export default function LazyAuroraBackground({
  className = "w-full h-full",
  rootMargin = "200px",
  ...auroraProps
}: LazyAuroraProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || shouldLoad) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, shouldLoad]);

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad && (
        <Suspense fallback={null}>
          <AuroraBackground className={className} {...auroraProps} />
        </Suspense>
      )}
    </div>
  );
}