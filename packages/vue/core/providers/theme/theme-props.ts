import type { ComputedRef } from 'vue'
import { createContext } from '@ark-ui/vue/utils'

export type Skin = 'dark' | 'light' | (string & {})
export interface ThemeProps {
  skin?: Skin
  size?: 'base' | 'sm' | 'lg'
  unstyled?: boolean
  bordered?: boolean
}

export const [privideThemeContext, injectThemeContext]
  = createContext<ComputedRef<ThemeProps>>('theme')
