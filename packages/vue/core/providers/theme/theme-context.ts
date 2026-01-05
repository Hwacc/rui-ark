import type { ComputedRef } from 'vue'
import { createContext } from '@ark-ui/vue/utils'

export interface ThemeContext {
  skin?: 'dark' | 'light'
  size?: 'base' | 'sm' | 'lg'
  unstyled?: boolean
  bordered?: boolean
}

export const [privideThemeContext, injectThemeContext]
  = createContext<ComputedRef<ThemeContext>>('theme')
