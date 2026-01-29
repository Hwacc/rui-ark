import type { ComputedRef } from 'vue'
import { createContext } from '@ark-ui/vue/utils'

export type Skin = 'razer' | 'shadcn'
export type Surface = 'light' | 'dark' | (string & {})

export interface ThemeProps {
  skin?: Skin
  surface?: Surface
  size?: 'base' | 'sm' | 'lg' | undefined
  unstyled?: boolean
  bordered?: boolean
}

export interface Theme {
  theme?: ThemeProps
}

export const [privideThemeContext, injectThemeContext]
  = createContext<ComputedRef<ThemeProps>>('theme')
