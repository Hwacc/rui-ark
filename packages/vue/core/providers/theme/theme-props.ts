import type { ComputedRef } from 'vue'
import { createContext } from '@ark-ui/vue/utils'

export interface ThemeProps {
  skin?: 'dark' | 'light'
  size?: 'base' | 'sm' | 'lg'
  unstyled?: boolean
  bordered?: boolean
}

export const [privideThemeContext, injectThemeContext]
  = createContext<ComputedRef<ThemeProps>>('theme')
