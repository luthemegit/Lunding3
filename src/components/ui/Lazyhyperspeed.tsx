import { Suspense, lazy, useEffect, useRef, useState } from 'react';

// O import dinâmico faz o Hyperspeed (e, junto com ele, three.js + postprocessing)
// virar um chunk separado, que só é baixado quando esse componente realmente monta.
const Hyperspeed = lazy(() => import('./Hyperspeed'));

type HyperspeedEffectOptions = React.ComponentProps<typeof Hyperspeed>['effectOptions'];

interface LazyHyperspeedProps {
  effectOptions?: HyperspeedEffectOptions;
  /**
   * Distância (em px) antes da seção entrar na tela em que o carregamento
   * já é disparado, pra evitar um "pop" perceptível do efeito.
   * Default: 200px.
   */
  rootMargin?: string;
  /** Classe aplicada no container e no fallback enquanto o efeito não carrega. */
  className?: string;
}

/**
 * Envolve o Hyperspeed com:
 * 1) um IntersectionObserver, que só dispara o import quando a seção
 *    se aproxima da viewport;
 * 2) um Suspense, que mostra um fallback (fundo sólido) enquanto o
 *    chunk (three.js + postprocessing) é baixado e o WebGL inicializa.
 *
 * Uso:
 *   const hyperspeedColors = useMemo(() => ({ ... }), []); // memoize sempre
 *   <LazyHyperspeed
 *     className="absolute inset-0"
 *     effectOptions={{ colors: hyperspeedColors, ... }}
 *   />
 */
export default function LazyHyperspeed({ effectOptions, rootMargin = '0px', className = 'w-full h-full' }: LazyHyperspeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || shouldLoad) return;

    // Fallback pra navegadores/ambientes sem IntersectionObserver: carrega direto.
    if (typeof IntersectionObserver === 'undefined') {
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
        <Suspense fallback={<div className={`${className} bg-black`} />}>
          <Hyperspeed effectOptions={effectOptions} />
        </Suspense>
      )}
    </div>
  );
}