import type { MaybeRefOrGetter } from 'vue'
import type { ThemeContext } from '../providers/theme/theme-context'
import { merge, transform } from 'lodash-es'
import { computed, toValue } from 'vue'
import { injectThemeContext } from '../providers/theme/theme-context'
import { useConfig } from './useConfig'

export function useTheme(props?: MaybeRefOrGetter<ThemeContext>) {
  const themeConfig = useConfig('theme')
  const propsTheme = toValue(props ?? {})
  const contextTheme = injectThemeContext(computed(() => ({})))
  return computed<ThemeContext>(() => {
    return merge(
      {
        skin: undefined,
        size: 'base',
        unstyled: false,
        bordered: true,
      },
      themeConfig?.value ?? {},
      contextTheme?.value ?? {},
      transform(
        propsTheme,
        (result: any, value: any, key: string) => {
          if (value === false) {
            result[key] = undefined
          }
          else {
            result[key] = value
          }
          return true
        },
        {},
      ),
    )
  })
}
