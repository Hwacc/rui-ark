import type { ComputedRef } from 'vue'
import { createContext } from '@ark-ui/vue/utils'

export type Skin = 'razer' | 'shadcn'
export type Mode = 'light' | 'dark' | (string & {})

export interface ThemeProps {
  theme?: {
    skin?: Skin
    mode?: Mode
    size?: 'base' | 'sm' | 'lg' | undefined
    unstyled?: boolean
    bordered?: boolean
  }
}

export const [privideThemeContext, injectThemeContext]
  = createContext<ComputedRef<ThemeProps>>('theme')
