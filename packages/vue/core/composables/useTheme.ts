import type { MaybeRefOrGetter } from 'vue'
import type { ThemeContext } from '../providers/theme/theme-context'
import { merge } from 'lodash-es'
import { computed, toValue } from 'vue'
import { injectThemeContext } from '../providers/theme/theme-context'
import { useConfig } from './useConfig'

export function useTheme(props?: MaybeRefOrGetter<ThemeContext>) {
  const ruiConfig = useConfig()
  const propsTheme = toValue(props ?? {})
  const contextTheme = injectThemeContext(computed(() => ({})))
  return computed<ThemeContext>(() => {
    return merge(
      {
        mode: 'dark',
        size: 'base',
        unstyled: false,
        bordered: true,
      },
      ruiConfig?.value?.theme ?? {},
      contextTheme?.value ?? {},
      propsTheme,
    )
  })
}
