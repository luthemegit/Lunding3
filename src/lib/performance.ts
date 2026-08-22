import { useSyncExternalStore } from "react";

/**
 * Lunding - Performance Control System
 *
 * Centraliza a qualidade dos efeitos visuais da landing page.
 *
 * A ideia é NÃO remover os efeitos no desktop. O sistema apenas reduz:
 * - resolução/DPR dos canvases;
 * - quantidade de passos do GradientWaves;
 * - quantidade de dots;
 * - FPS alvo dos efeitos;
 * - intensidade de blur/efeitos decorativos;
 * - rotação/complexidade de alguns componentes.
 *
 * Além da detecção inicial do hardware, o sistema aceita feedback de FPS
 * em runtime. Um componente pesado (ex.: GradientWaves) pode chamar
 * reportFrame() após cada frame renderizado. Se o FPS ficar baixo por tempo
 * suficiente, o tier desce automaticamente.
 */

export type PerformanceTier = "low" | "medium" | "high";

export type PerformanceConfig = {
  gradientSteps: number;
  gradientDpr: number;
  gradientFps: number;
  dotSpacing: number;
  dotDpr: number;
  backdropBlur: "none" | "sm" | "md";
  blobBlur: "none" | "sm" | "md" | "lg";
  animationScale: number;
  stackedRotation: boolean;
  lenis: boolean;
  maxBlobs: number;
  mouseInteraction: boolean;
};

export type PerformanceProfile = {
  tier: PerformanceTier;
  cores: number;
  memory: number | null;
  dpr: number;
  isMobile: boolean;
  isTouch: boolean;
  reducedMotion: boolean;
  saveData: boolean;
};

/**
 * Configuração central. Se quiser deixar o site mais leve no futuro,
 * você altera estes números em um único lugar.
 */
export const performanceConfig: Record<PerformanceTier, PerformanceConfig> = {
  low: {
    gradientSteps: 18,
    gradientDpr: 1,
    gradientFps: 30,
    dotSpacing: 60,
    dotDpr: 1,
    backdropBlur: "none",
    blobBlur: "sm",
    animationScale: 0.7,
    stackedRotation: false,
    lenis: false,
    maxBlobs: 3,
    mouseInteraction: false,
  },

  medium: {
    gradientSteps: 30,
    gradientDpr: 1.25,
    gradientFps: 45,
    dotSpacing: 45,
    dotDpr: 1.25,
    backdropBlur: "sm",
    blobBlur: "md",
    animationScale: 0.85,
    stackedRotation: true,
    lenis: false,
    maxBlobs: 5,
    mouseInteraction: true,
  },

  high: {
    gradientSteps: 45,
    gradientDpr: 1.5,
    gradientFps: 60,
    dotSpacing: 34,
    dotDpr: 1.5,
    backdropBlur: "md",
    blobBlur: "lg",
    animationScale: 1,
    stackedRotation: true,
    lenis: true,
    maxBlobs: 6,
    mouseInteraction: true,
  },
};

const tierOrder: PerformanceTier[] = ["low", "medium", "high"];

const getNavigatorHints = () => {
  if (typeof navigator === "undefined") {
    return {
      cores: 4,
      memory: null as number | null,
      saveData: false,
    };
  }

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: {
      saveData?: boolean;
    };
  };

  return {
    cores: nav.hardwareConcurrency || 4,
    memory: typeof nav.deviceMemory === "number" ? nav.deviceMemory : null,
    saveData: nav.connection?.saveData === true,
  };
};

/** Detecta o perfil inicial sem executar nenhum benchmark pesado. */
export function detectPerformanceProfile(): PerformanceProfile {
  if (typeof window === "undefined") {
    return {
      tier: "medium",
      cores: 4,
      memory: null,
      dpr: 1,
      isMobile: false,
      isTouch: false,
      reducedMotion: false,
      saveData: false,
    };
  }

  const { cores, memory, saveData } = getNavigatorHints();
  const dpr = window.devicePixelRatio || 1;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let tier: PerformanceTier = "high";

  // Data Saver é uma preferência explícita do usuário: seja conservador.
  if (saveData) {
    tier = "low";
  } else if (cores <= 2 || (memory !== null && memory <= 2)) {
    tier = "low";
  } else if (
    cores <= 4 ||
    (memory !== null && memory <= 4) ||
    (isMobile && dpr >= 2 && cores <= 6)
  ) {
    tier = "medium";
  }

  return {
    tier,
    cores,
    memory,
    dpr,
    isMobile,
    isTouch,
    reducedMotion,
    saveData,
  };
}

const initialProfile = detectPerformanceProfile();

let currentTier: PerformanceTier = initialProfile.tier;
let listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function setTier(nextTier: PerformanceTier) {
  if (nextTier === currentTier) return;
  currentTier = nextTier;
  emit();
}

function downgradeTier() {
  const index = tierOrder.indexOf(currentTier);
  if (index > 0) {
    setTier(tierOrder[index - 1]);
  }
}

function upgradeTier() {
  const index = tierOrder.indexOf(currentTier);
  if (index < tierOrder.length - 1) {
    setTier(tierOrder[index + 1]);
  }
}

/** Força manualmente um tier durante testes. */
export function setPerformanceTier(tier: PerformanceTier) {
  setTier(tier);
}

/** Volta para o tier detectado originalmente pelo hardware. */
export function resetPerformanceTier() {
  setTier(initialProfile.tier);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return currentTier;
}

function getServerSnapshot(): PerformanceTier {
  return "medium";
}

/**
 * Hook principal para os componentes.
 *
 * Exemplo:
 * const { tier, config, profile } = usePerformance();
 */
export function usePerformance() {
  const tier = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return {
    tier,
    config: performanceConfig[tier],
    profile: initialProfile,
    isLowEnd: tier === "low",
    isHighEnd: tier === "high",
    shouldAnimate: !initialProfile.reducedMotion,
  };
}

export type FpsMonitorOptions = {
  /** Janela usada para calcular FPS. */
  sampleMs?: number;
  /** FPS abaixo deste valor é considerado ruim. */
  downgradeBelow?: number;
  /** Quantas amostras ruins consecutivas provocam downgrade. */
  downgradeSamples?: number;
  /** FPS acima deste valor permite recuperar qualidade. */
  upgradeAbove?: number;
  /** Quantas amostras boas consecutivas provocam upgrade. */
  upgradeSamples?: number;
  /** Tempo mínimo entre mudanças de tier. */
  cooldownMs?: number;
};

const defaultFpsOptions: Required<FpsMonitorOptions> = {
  sampleMs: 2500,
  downgradeBelow: 24,
  downgradeSamples: 2,
  upgradeAbove: 52,
  upgradeSamples: 4,
  cooldownMs: 10000,
};

/**
 * Cria um monitor que mede APENAS os frames que o componente pesado reportar.
 * Isso é importante: não mede o refresh do monitor, mede o trabalho real do
 * efeito.
 *
 * Uso no GradientWaves:
 *
 * const monitor = createFpsMonitor();
 *
 * // depois de renderer.render(...):
 * monitor.reportFrame();
 *
 * // cleanup:
 * monitor.destroy();
 */
export function createFpsMonitor(options: FpsMonitorOptions = {}) {
  const config = { ...defaultFpsOptions, ...options };

  let frames = 0;
  let windowStart = 0;
  let badSamples = 0;
  let goodSamples = 0;
  let lastTierChange = 0;
  let destroyed = false;

  const reportFrame = (now = performance.now()) => {
    if (destroyed) return;

    if (windowStart === 0) {
      windowStart = now;
      frames = 1;
      return;
    }

    frames += 1;

    const elapsed = now - windowStart;
    if (elapsed < config.sampleMs) return;

    const fps = (frames * 1000) / elapsed;
    const timeSinceTierChange = now - lastTierChange;

    if (fps < config.downgradeBelow) {
      badSamples += 1;
      goodSamples = 0;
    } else if (fps >= config.upgradeAbove) {
      goodSamples += 1;
      badSamples = 0;
    } else {
      badSamples = 0;
      goodSamples = 0;
    }

    if (
      badSamples >= config.downgradeSamples &&
      timeSinceTierChange >= config.cooldownMs
    ) {
      downgradeTier();
      lastTierChange = now;
      badSamples = 0;
      goodSamples = 0;
    } else if (
      goodSamples >= config.upgradeSamples &&
      timeSinceTierChange >= config.cooldownMs
    ) {
      upgradeTier();
      lastTierChange = now;
      badSamples = 0;
      goodSamples = 0;
    }

    frames = 0;
    windowStart = now;
  };

  const destroy = () => {
    destroyed = true;
  };

  return {
    reportFrame,
    destroy,
  };
}

/**
 * Limita um DPR recebido ao teto definido pelo tier atual.
 * Útil para OGL/Canvas/WebGL.
 */
export function getAdaptiveDpr(
  requestedDpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
  tier: PerformanceTier = currentTier
) {
  return Math.min(requestedDpr, performanceConfig[tier].gradientDpr);
}

/** Retorna a configuração de um tier sem precisar usar o hook. */
export function getPerformanceConfig(tier: PerformanceTier = currentTier) {
  return performanceConfig[tier];
}

/**
 * Retorna o tier atual para código fora do React (WebGL/Canvas).
 */
export function getCurrentPerformanceTier(): PerformanceTier {
  return currentTier;
}
