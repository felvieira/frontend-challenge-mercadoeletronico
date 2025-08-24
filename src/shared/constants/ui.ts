export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export const TRANSITIONS = {
  DEFAULT: 'transition-all duration-200',
  FAST: 'transition-all duration-150',
  SLOW: 'transition-all duration-300',
} as const

export const SHADOWS = {
  CARD: 'shadow',
  CARD_HOVER: 'shadow-lg',
  BUTTON: 'shadow-sm',
  MODAL: 'shadow-xl',
} as const

export const GRID_COLS = {
  DEFAULT: 'grid-cols-1',
  DESKTOP: 'xl:grid-cols-2',
  RESPONSIVE: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
} as const